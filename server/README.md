# nordic-rent-server

Express + TypeScript backend for Nordic Rent. Receives inquiries from the website
form, from AI agents via MCP, and from plain HTTP clients; stores every inquiry in
Postgres tagged by source; forwards non-spam inquiries to Formspree for email delivery.

## Endpoints

- `POST /api/inquiries` — JSON inquiry submission (website form + HTTP fallback for agents)
- `POST /mcp` — MCP server, Streamable HTTP transport, stateless, no auth.
  Tools: `submit_inquiry`, `get_services_info`
- `GET /health` — liveness + DB check

## Architecture

Composition root in `src/index.ts`: `loadConfig → createPool → runMigrations →
PgInquiryStore → HttpFormspreeClient → createInquiryService → createApp`. Everything
is injected; tests run `createApp` with `InMemoryInquiryStore` and `FakeFormspreeClient`
(see `test/doubles.ts`) — no mocking libraries.

Validation happens once, at the boundary (`src/domain/inquiry.ts`, zod). Inside the
app everything is trusted, typed domain data.

Inquiry pipeline (`src/services/inquiryService.ts`):

1. Honeypot tripped → stored with `is_spam=true`, Formspree skipped, normal success returned.
2. Otherwise stored with status `pending`, then forwarded to Formspree.
3. Formspree failure → status `failed` (lead is kept; re-send manually). Request still succeeds.
4. Global daily forward cap (100/day) → overflow stored with status `skipped`, so
   distributed abuse can't spam the inbox unboundedly.

## Env vars

See `.env.example`. `DATABASE_URL` (required), `FORMSPREE_ENDPOINT`, `PORT`,
`ALLOWED_ORIGINS` (comma-separated browser origins; also used to tag `source=web`).

## Develop

```
npm install
npm run dev        # tsx watch, needs DATABASE_URL
npm test           # vitest, no database needed
npm run typecheck
```

## Deploy (Railway)

- Service from this repo with **Root Directory = `server`**; nixpacks runs
  `npm ci && npm run build` and `npm start`.
- Add the Railway Postgres plugin and reference its `DATABASE_URL`.
- Set `ALLOWED_ORIGINS=https://nordicrent.no,https://www.nordicrent.no`.
- The schema migrates itself on boot (`src/db/schema.sql`, idempotent).
- Attach the custom domain `api.nordicrent.no` (the frontend, `llms.txt`, and
  `index.html` reference it), or update those references to the generated Railway URL.

## Useful queries

How much of the traffic is agents:

```sql
SELECT source, is_spam, count(*) FROM inquiries GROUP BY 1, 2 ORDER BY 1, 2;
```

Leads whose email delivery failed (re-send manually):

```sql
SELECT * FROM inquiries WHERE formspree_status = 'failed';
```

## Deferred (v2)

- GA4 conversion tracking for server-side (MCP/API) leads via the GA4 Measurement
  Protocol — web-form leads still fire `generate_lead` client-side on `/thank-you`.
