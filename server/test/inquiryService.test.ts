import { describe, expect, it } from 'vitest'
import { createInquiryService } from '../src/services/inquiryService.js'
import type { InquiryInput, SubmissionMeta } from '../src/domain/inquiry.js'
import { FakeFormspreeClient, InMemoryInquiryStore } from './doubles.js'

const input: InquiryInput = {
  firstName: 'Kari',
  lastName: 'Nordmann',
  email: 'kari@acme.com',
  company: 'Acme Inc.',
  location: 'oslo',
  apartments: '2-5',
  message: 'Relocating 3 engineers to Oslo in March.',
}

const meta: SubmissionMeta = {
  source: 'web',
  userAgent: 'test-agent',
  ip: '203.0.113.7',
  honeypotTripped: false,
}

describe('inquiryService.submit', () => {
  it('stores the inquiry, forwards to Formspree, and returns a reference id', async () => {
    const store = new InMemoryInquiryStore()
    const formspree = new FakeFormspreeClient()
    const service = createInquiryService({ store, formspree })

    const result = await service.submit(input, meta)

    expect(store.inquiries).toHaveLength(1)
    expect(store.inquiries[0].formspreeStatus).toBe('sent')
    expect(store.inquiries[0].source).toBe('web')
    expect(formspree.sent).toEqual([input])
    expect(result.referenceId).toMatch(/^NR-[0-9A-F]{8}$/)
  })

  it('stores tripped honeypots as spam without calling Formspree, returning normal success', async () => {
    const store = new InMemoryInquiryStore()
    const formspree = new FakeFormspreeClient()
    const service = createInquiryService({ store, formspree })

    const result = await service.submit(input, { ...meta, honeypotTripped: true })

    expect(store.inquiries).toHaveLength(1)
    expect(store.inquiries[0].isSpam).toBe(true)
    expect(store.inquiries[0].formspreeStatus).toBe('skipped')
    expect(formspree.sent).toHaveLength(0)
    expect(result.referenceId).toMatch(/^NR-/)
  })

  it('keeps the inquiry and flags it when Formspree fails', async () => {
    const store = new InMemoryInquiryStore()
    const formspree = new FakeFormspreeClient(new Error('formspree down'))
    const service = createInquiryService({ store, formspree })

    const result = await service.submit(input, meta)

    expect(store.inquiries[0].formspreeStatus).toBe('failed')
    expect(result.referenceId).toMatch(/^NR-/)
  })

  it('stops forwarding to Formspree once the daily cap is reached', async () => {
    const store = new InMemoryInquiryStore()
    const formspree = new FakeFormspreeClient()
    const service = createInquiryService({ store, formspree, dailyForwardCap: 2 })

    await service.submit(input, meta)
    await service.submit(input, meta)
    await service.submit(input, meta)

    expect(formspree.sent).toHaveLength(2)
    expect(store.inquiries.map((inquiry) => inquiry.formspreeStatus)).toEqual([
      'sent',
      'sent',
      'skipped',
    ])
  })
})
