-- Tasks gained a real, directly-selectable "Campaign Type" field (backed
-- by the campaignType master, schema_v27/v28-era Campaign Type Master —
-- distinct from content_type/schema_v24.sql's Content Type field). It can
-- be picked directly or auto-fetched from the task's linked Campaign, and
-- drives which QC Checklist(s) get auto-inherited into the task. Written
-- via a separate, best-effort update alongside the main task upsert (same
-- pattern as content_type) so a database that hasn't run this migration
-- yet just doesn't persist Campaign Type across a reload, rather than
-- failing the whole task insert/update.
alter table public.tasks add column if not exists campaign_type text;
