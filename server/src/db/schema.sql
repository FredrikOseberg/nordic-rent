CREATE TABLE IF NOT EXISTS inquiries (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name       text NOT NULL,
  last_name        text NOT NULL,
  email            text NOT NULL,
  company          text NOT NULL,
  location         text,
  apartments       text,
  message          text NOT NULL,
  source           text NOT NULL CHECK (source IN ('web', 'mcp', 'api')),
  user_agent       text,
  ip               text,
  is_spam          boolean NOT NULL DEFAULT false,
  formspree_status text NOT NULL DEFAULT 'pending'
                   CHECK (formspree_status IN ('pending', 'sent', 'failed', 'skipped')),
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at);
