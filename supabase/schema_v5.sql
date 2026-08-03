-- Beetloop schema v5: profile picture support.
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run,
-- AFTER schema.sql, schema_v2.sql, schema_v3.sql and schema_v4.sql. Safe to re-run.
--
-- Stored as a data: URL (client resizes to a small JPEG before saving) rather
-- than Supabase Storage, matching this project's existing pattern of keeping
-- everything in Postgres columns/jsonb instead of provisioning a bucket.

alter table public.profiles add column if not exists avatar_url text;
