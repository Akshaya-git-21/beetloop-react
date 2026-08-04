-- Beetloop schema v8: per-user Dashboard widget visibility.
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run,
-- after schema_v7.sql. Safe to re-run.

-- Stores the list of widget keys HIDDEN for this specific user (not the
-- shown ones) so every existing account defaults to "everything visible"
-- with zero migration needed — Admin only has to touch this for the users
-- they actually want to restrict, from User Management -> edit user.
-- Valid keys: 'kpis','needsAttention','leadPipeline','activity','scope','accessSummary'.
alter table public.profiles add column if not exists dashboard_widgets jsonb not null default '[]'::jsonb;
