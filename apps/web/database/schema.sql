CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS auth_users (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name text,
  email text UNIQUE NOT NULL,
  "emailVerified" timestamptz,
  image text,
  stripe_id text,
  subscription_status text,
  last_check_subscription_status_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS auth_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" text NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  provider text NOT NULL,
  type text NOT NULL,
  "providerAccountId" text NOT NULL,
  access_token text,
  expires_at integer,
  refresh_token text,
  id_token text,
  scope text,
  session_state text,
  token_type text,
  password text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(provider, "providerAccountId")
);

CREATE TABLE IF NOT EXISTS auth_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" text NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  expires timestamptz NOT NULL,
  "sessionToken" text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS auth_verification_token (
  identifier text NOT NULL,
  expires timestamptz NOT NULL,
  token text NOT NULL,
  PRIMARY KEY(identifier, token)
);

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

CREATE INDEX IF NOT EXISTS auth_accounts_user_idx
  ON auth_accounts("userId");

CREATE INDEX IF NOT EXISTS auth_users_stripe_idx
  ON auth_users(stripe_id);

CREATE INDEX IF NOT EXISTS clauses_document_created_idx
  ON clauses(document_id, created_at ASC);

CREATE INDEX IF NOT EXISTS embed_keys_user_created_idx
  ON embed_keys(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS embed_keys_api_key_idx
  ON embed_keys(api_key);
