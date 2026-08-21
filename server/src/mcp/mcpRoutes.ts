import { Router, type Request, type Response } from 'express'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { createMcpServer } from './mcpServer.js'
import type { Services } from '../services/services.js'

/**
 * Stateless Streamable HTTP transport: a fresh server + transport per POST,
 * no sessions. GET/DELETE (SSE notification stream, session teardown) are
 * not supported in stateless mode.
 */
export function createMcpRoutes(services: Services): Router {
  const router = Router()

  router.post('/', async (req, res, next) => {
    try {
      const server = createMcpServer(services)
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined })
      res.on('close', () => {
        void transport.close()
        void server.close()
      })
      await server.connect(transport)
      await transport.handleRequest(req, res, req.body)
    } catch (err) {
      next(err)
    }
  })

  router.get('/', methodNotAllowed)
  router.delete('/', methodNotAllowed)

  return router
}

function methodNotAllowed(_req: Request, res: Response): void {
  res.status(405).json({
    jsonrpc: '2.0',
    error: { code: -32000, message: 'Method not allowed' },
    id: null,
  })
}
