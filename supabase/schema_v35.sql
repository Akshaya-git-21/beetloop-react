-- schema_v35.sql — pending email change (verify-before-apply). User
-- Management can now edit a person's email, but the address on file only
-- changes once the NEW address confirms it via a link (see
-- api/change-email.js + api/verify-email.js), never immediately on save.
alter table public.profiles add column if not exists pending_email text;
alter table public.profiles add column if not exists pending_email_token text;
alter table public.profiles add column if not exists pending_email_requested_at timestamptz;
