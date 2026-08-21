import { loadConfig } from './config.js'
import { createPool } from './db/pool.js'
import { runMigrations } from './db/migrate.js'
import { PgInquiryStore } from './stores/inquiryStore.js'
import { HttpFormspreeClient } from './services/formspreeClient.js'
import { createInquiryService } from './services/inquiryService.js'
import { createApp } from './app.js'

async function main(): Promise<void> {
  const config = loadConfig(process.env)
  const pool = createPool(config.databaseUrl)
  await runMigrations(pool)

  const inquiryStore = new PgInquiryStore(pool)
  const formspree = new HttpFormspreeClient(config.formspreeEndpoint)
  const inquiryService = createInquiryService({ store: inquiryStore, formspree })

  const app = createApp({
    config,
    services: { inquiries: inquiryService },
    healthCheck: () => pool.query('SELECT 1').then(() => true).catch(() => false),
  })

  app.listen(config.port, () => {
    console.log(`nordic-rent-server listening on :${config.port}`)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
