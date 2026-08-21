import { Router, type Request } from 'express'
import { inquiryRequestSchema, type InquirySource } from '../domain/inquiry.js'
import type { InquiryService } from '../services/inquiryService.js'

export function createInquiryRoutes(inquiries: InquiryService, allowedOrigins: string[]): Router {
  const router = Router()

  router.post('/', async (req, res, next) => {
    try {
      const parsed = inquiryRequestSchema.safeParse(req.body)
      if (!parsed.success) {
        res.status(400).json({
          error: 'validation_failed',
          details: parsed.error.flatten().fieldErrors,
        })
        return
      }

      const { _gotcha, ...input } = parsed.data
      const result = await inquiries.submit(input, {
        source: resolveSource(req, allowedOrigins),
        userAgent: req.get('user-agent'),
        ip: req.ip,
        honeypotTripped: Boolean(_gotcha?.trim()),
      })

      res.status(201).json({ ok: true, referenceId: result.referenceId })
    } catch (err) {
      next(err)
    }
  })

  return router
}

// Origin matching an allowed browser origin means the website form; anything
// else (curl, agents, scripts) is 'api'. Spoofable, but this is analytics, not security.
function resolveSource(req: Request, allowedOrigins: string[]): InquirySource {
  const origin = req.get('origin')
  return origin && allowedOrigins.includes(origin) ? 'web' : 'api'
}
