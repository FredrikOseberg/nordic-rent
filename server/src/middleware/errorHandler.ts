import type { NextFunction, Request, Response } from 'express'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = statusFromError(err)
  if (status >= 500) {
    console.error(err)
  }
  res.status(status).json({ error: status >= 500 ? 'internal_error' : 'bad_request' })
}

// Body-parser errors (payload too large, malformed JSON) carry an HTTP status.
function statusFromError(err: unknown): number {
  if (typeof err === 'object' && err !== null && 'status' in err) {
    const status = (err as { status: unknown }).status
    if (typeof status === 'number' && status >= 400 && status < 600) {
      return status
    }
  }
  return 500
}
