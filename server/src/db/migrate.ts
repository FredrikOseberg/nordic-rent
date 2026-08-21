import { readFile } from 'node:fs/promises'
import type pg from 'pg'

const SCHEMA_FILE = new URL('./schema.sql', import.meta.url)

export async function runMigrations(pool: pg.Pool): Promise<void> {
  const schema = await readFile(SCHEMA_FILE, 'utf8')
  await pool.query(schema)
}
