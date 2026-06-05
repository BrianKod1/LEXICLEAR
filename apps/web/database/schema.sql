CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  title text NOT NULL,
  original_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clauses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  original_phrase text NOT NULL,
  plain_english text NOT NULL,
  gotcha text,
  risk_level text NOT NULL CHECK (risk_level IN ('Green', 'Yellow', 'Red')),
  jargon jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS embed_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  name text NOT NULL,
  api_key text NOT NULL UNIQUE DEFAULT ('lx_' || encode(gen_random_bytes(24), 'hex')),
  allowed_origin text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS documents_user_created_idx
  ON documents(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS clauses_document_created_idx
  ON clauses(document_id, created_at ASC);

CREATE INDEX IF NOT EXISTS embed_keys_user_created_idx
  ON embed_keys(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS embed_keys_api_key_idx
  ON embed_keys(api_key);
