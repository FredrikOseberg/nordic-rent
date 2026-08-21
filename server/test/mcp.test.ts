import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Server } from 'node:http'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import { createApp } from '../src/app.js'
import { createInquiryService } from '../src/services/inquiryService.js'
import type { Config } from '../src/config.js'
import { FakeFormspreeClient, InMemoryInquiryStore } from './doubles.js'

const config: Config = {
  databaseUrl: 'postgres://unused',
  formspreeEndpoint: 'https://formspree.example/unused',
  port: 0,
  allowedOrigins: ['https://nordicrent.no'],
}

describe('MCP endpoint', () => {
  const store = new InMemoryInquiryStore()
  const formspree = new FakeFormspreeClient()
  let httpServer: Server
  let mcpUrl: URL

  beforeAll(async () => {
    const app = createApp({
      config,
      services: { inquiries: createInquiryService({ store, formspree }) },
      healthCheck: async () => true,
    })
    httpServer = await new Promise<Server>((resolve) => {
      const server = app.listen(0, () => resolve(server))
    })
    const address = httpServer.address()
    if (address === null || typeof address === 'string') throw new Error('no port')
    mcpUrl = new URL(`http://127.0.0.1:${address.port}/mcp`)
  })

  afterAll(async () => {
    await new Promise((resolve) => httpServer.close(resolve))
  })

  async function connectClient(): Promise<Client> {
    const client = new Client({ name: 'test-client', version: '1.0.0' })
    await client.connect(new StreamableHTTPClientTransport(mcpUrl))
    return client
  }

  it('lists both tools', async () => {
    const client = await connectClient()
    const { tools } = await client.listTools()
    const names = tools.map((tool) => tool.name).sort()
    expect(names).toEqual(['get_services_info', 'submit_inquiry'])
    await client.close()
  })

  it('submits an inquiry through the submit_inquiry tool', async () => {
    const client = await connectClient()
    const result = await client.callTool({
      name: 'submit_inquiry',
      arguments: {
        firstName: 'Agent',
        lastName: 'Smith',
        email: 'agent@corp.com',
        company: 'Corp AS',
        location: 'bergen',
        message: 'Need 2 furnished apartments in Bergen from May.',
      },
    })

    const text = (result.content as Array<{ type: string; text: string }>)[0].text
    expect(text).toContain('Inquiry received')
    expect(text).toContain('NR-')

    const stored = store.inquiries.at(-1)
    expect(stored?.source).toBe('mcp')
    expect(stored?.company).toBe('Corp AS')
    expect(formspree.sent.at(-1)?.email).toBe('agent@corp.com')
    await client.close()
  })

  it('serves business information through get_services_info', async () => {
    const client = await connectClient()
    const result = await client.callTool({ name: 'get_services_info', arguments: {} })
    const text = (result.content as Array<{ type: string; text: string }>)[0].text
    expect(text).toContain('Nordic Rent')
    expect(text).toContain('Oslo')
    await client.close()
  })

  it('rejects an invalid submit_inquiry call', async () => {
    const client = await connectClient()
    const result = await client.callTool({
      name: 'submit_inquiry',
      arguments: { firstName: 'No', lastName: 'Email', company: 'X', message: 'hi' },
    })
    expect(result.isError).toBe(true)
    await client.close()
  })
})
