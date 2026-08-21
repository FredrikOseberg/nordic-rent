import express from 'express'
import cors from 'cors'
import type { Config } from './config.js'
import type { Services } from './services/services.js'
import { createHealthRoutes, type HealthCheck } from './routes/health.js'
import { createInquiryRoutes } from './routes/inquiries.js'
import { createMcpRoutes } from './mcp/mcpRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import {
  createMcpLimiter,
  createSubmitLimiter,
  defaultRateLimits,
  type RateLimitOptions,
} from './middleware/rateLimit.js'

export interface AppDeps {
  config: Config
  services: Services
  healthCheck: HealthCheck
  rateLimits?: { submit: RateLimitOptions; mcp: RateLimitOptions }
}

export function createApp({
  config,
  services,
  healthCheck,
  rateLimits = defaultRateLimits,
}: AppDeps): express.Express {
  const app = express()
  app.set('trust proxy', 1) // Railway sits behind a proxy; needed for real client IPs
  app.use(express.json({ limit: '32kb' }))

  app.use('/health', createHealthRoutes(healthCheck))

  app.use(
    '/api/inquiries',
    cors({ origin: config.allowedOrigins }),
    createSubmitLimiter(rateLimits.submit),
    createInquiryRoutes(services.inquiries, config.allowedOrigins)
  )

  app.use(
    '/mcp',
    cors({ origin: '*', exposedHeaders: ['Mcp-Session-Id'] }),
    createMcpLimiter(rateLimits.mcp),
    createMcpRoutes(services)
  )

  app.use(errorHandler)
  return app
}
