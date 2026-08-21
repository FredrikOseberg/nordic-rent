import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  FORMSPREE_ENDPOINT: z.string().url().default('https://formspree.io/f/xreenzky'),
  PORT: z.coerce.number().int().positive().default(3000),
  ALLOWED_ORIGINS: z.string().default('http://localhost:5173'),
})

export interface Config {
  databaseUrl: string
  formspreeEndpoint: string
  port: number
  allowedOrigins: string[]
}

export function loadConfig(env: NodeJS.ProcessEnv): Config {
  const parsed = envSchema.parse(env)
  return {
    databaseUrl: parsed.DATABASE_URL,
    formspreeEndpoint: parsed.FORMSPREE_ENDPOINT,
    port: parsed.PORT,
    allowedOrigins: parseOrigins(parsed.ALLOWED_ORIGINS),
  }
}

function parseOrigins(commaSeparated: string): string[] {
  return commaSeparated
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0)
}
