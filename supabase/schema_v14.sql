-- schema_v14.sql — per-user column visibility for the new standalone Leads
-- module (Daily Leads log + Lead Pipeline tables), mirroring the existing
-- per-user Dashboard widget visibility (`dashboard_widgets`).
alter table public.profiles add column if not exists hidden_lead_columns jsonb not null default '[]'::jsonb;
