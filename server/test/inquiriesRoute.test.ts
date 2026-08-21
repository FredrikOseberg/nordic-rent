import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app.js'
import { createInquiryService } from '../src/services/inquiryService.js'
import type { Config } from '../src/config.js'
import { FakeFormspreeClient, InMemoryInquiryStore } from './doubles.js'

const WEB_ORIGIN = 'https://nordicrent.no'

const config: Config = {
  databaseUrl: 'postgres://unused',
  formspreeEndpoint: 'https://formspree.example/unused',
  port: 0,
  allowedOrigins: [WEB_ORIGIN],
}

function buildTestApp(overrides?: { submitLimit?: number }) {
  const store = new InMemoryInquiryStore()
  const formspree = new FakeFormspreeClient()
  const app = createApp({
    config,
    services: { inquiries: createInquiryService({ store, formspree }) },
    healthCheck: async () => true,
    rateLimits: {
      submit: { windowMs: 60_000, limit: overrides?.submitLimit ?? 100 },
      mcp: { windowMs: 60_000, limit: 100 },
    },
  })
  return { app, store, formspree }
}

const validBody = {
  firstName: 'Kari',
  lastName: 'Nordmann',
  email: 'kari@acme.com',
  company: 'Acme Inc.',
  location: '',
  apartments: '2-5',
  message: 'Relocating 3 engineers to Oslo in March.',
}

describe('POST /api/inquiries', () => {
  it('accepts a valid inquiry and returns a reference id', async () => {
    const { app, store, formspree } = buildTestApp()

    const response = await request(app).post('/api/inquiries').send(validBody)

    expect(response.status).toBe(201)
    expect(response.body.ok).toBe(true)
    expect(response.body.referenceId).toMatch(/^NR-/)
    expect(store.inquiries).toHaveLength(1)
    expect(store.inquiries[0].location).toBeUndefined()
    expect(formspree.sent).toHaveLength(1)
  })

  it('rejects an invalid inquiry with field-level details', async () => {
    const { app, store } = buildTestApp()

    const response = await request(app)
      .post('/api/inquiries')
      .send({ ...validBody, email: 'nope', firstName: '' })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('validation_failed')
    expect(response.body.details.email).toBeDefined()
    expect(response.body.details.firstName).toBeDefined()
    expect(store.inquiries).toHaveLength(0)
  })

  it('rejects oversized payloads', async () => {
    const { app } = buildTestApp()

    const response = await request(app)
      .post('/api/inquiries')
      .send({ ...validBody, message: 'x'.repeat(64 * 1024) })

    expect(response.status).toBe(413)
  })

  it("tags requests from an allowed browser origin as 'web' and others as 'api'", async () => {
    const { app, store } = buildTestApp()

    await request(app).post('/api/inquiries').set('Origin', WEB_ORIGIN).send(validBody)
    await request(app).post('/api/inquiries').send(validBody)

    expect(store.inquiries.map((inquiry) => inquiry.source)).toEqual(['web', 'api'])
  })

  it('silently accepts honeypot-tripped submissions without forwarding', async () => {
    const { app, store, formspree } = buildTestApp()

    const response = await request(app)
      .post('/api/inquiries')
      .send({ ...validBody, _gotcha: 'filled by a bot' })

    expect(response.status).toBe(201)
    expect(store.inquiries[0].isSpam).toBe(true)
    expect(formspree.sent).toHaveLength(0)
  })

  it('rate-limits after the configured number of requests', async () => {
    const { app } = buildTestApp({ submitLimit: 2 })

    await request(app).post('/api/inquiries').send(validBody)
    await request(app).post('/api/inquiries').send(validBody)
    const response = await request(app).post('/api/inquiries').send(validBody)

    expect(response.status).toBe(429)
  })
})
