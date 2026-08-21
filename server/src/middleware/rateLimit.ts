import { rateLimit, type RateLimitRequestHandler } from 'express-rate-limit'

export interface RateLimitOptions {
  windowMs: number
  limit: number
}

export const defaultRateLimits = {
  submit: { windowMs: 15 * 60 * 1000, limit: 10 },
  mcp: { windowMs: 15 * 60 * 1000, limit: 60 },
} as const

export function createSubmitLimiter(options: RateLimitOptions): RateLimitRequestHandler {
  return rateLimit({
    ...options,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'rate_limited' },
  })
}

export function createMcpLimiter(options: RateLimitOptions): RateLimitRequestHandler {
  return rateLimit({
    ...options,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      jsonrpc: '2.0',
      error: { code: -32000, message: 'Rate limit exceeded. Try again later.' },
      id: null,
    },
  })
}
