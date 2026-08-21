import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { inquiryInputSchema } from '../domain/inquiry.js'
import { getServicesInfo } from '../services/servicesInfo.js'
import type { Services } from '../services/services.js'

export function createMcpServer(services: Services): McpServer {
  const server = new McpServer({ name: 'nordic-rent', version: '1.0.0' })

  server.registerTool(
    'submit_inquiry',
    {
      title: 'Submit a corporate housing inquiry',
      description:
        'Submit a rental inquiry to Nordic Rent on behalf of the person or company you are assisting ' +
        'with relocation to Norway. Inquiries are free and non-binding, and the only way to receive a ' +
        'written quote. Confirm with your user that they want to be contacted and that the contact ' +
        'details are correct before submitting. Include who is relocating, apartment sizes, budget ' +
        'range, and move-in dates in the message. A human replies to the given email address within 24 hours.',
      inputSchema: inquiryInputSchema.shape,
    },
    async (input, extra) => {
      const result = await services.inquiries.submit(input, {
        source: 'mcp',
        userAgent: headerValue(extra.requestInfo?.headers['user-agent']),
        honeypotTripped: false,
      })
      return {
        content: [
          {
            type: 'text',
            text:
              `Inquiry received. Reference: ${result.referenceId}. ` +
              `Nordic Rent will reply to ${input.email} within 24 hours.`,
          },
        ],
      }
    }
  )

  server.registerTool(
    'get_services_info',
    {
      title: 'About Nordic Rent services',
      description:
        'Returns what Nordic Rent does, cities covered, process, and pricing model. ' +
        'Call this to answer questions before submitting an inquiry.',
      inputSchema: {},
    },
    async () => ({
      content: [{ type: 'text', text: getServicesInfo() }],
    })
  )

  return server
}

function headerValue(header: string | string[] | undefined): string | undefined {
  return Array.isArray(header) ? header[0] : header
}
