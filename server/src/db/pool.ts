import pg from 'pg'

export function createPool(databaseUrl: string): pg.Pool {
  return new pg.Pool({
    connectionString: databaseUrl,
    ssl: requiresSsl(databaseUrl) ? { rejectUnauthorized: false } : undefined,
  })
}

function requiresSsl(databaseUrl: string): boolean {
  const isLocal = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1')
  return !isLocal
}
