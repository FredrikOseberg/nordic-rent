import { Router } from 'express'

export type HealthCheck = () => Promise<boolean>

export function createHealthRoutes(isHealthy: HealthCheck): Router {
  const router = Router()
  router.get('/', async (_req, res) => {
    const healthy = await isHealthy()
    res.status(healthy ? 200 : 503).json({ ok: healthy })
  })
  return router
}
