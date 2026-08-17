-- Tasks can now be assigned directly to an internal/external page linked to
-- their Campaign's KPIs (Create Campaign -> section D -> "landing pages this
-- KPI drives traffic to"). page_url is the source of truth; page_title is a
-- best-effort display label snapshotted at assignment time so it survives
-- even if the underlying Content Repository page is later renamed or
-- removed. Written via a separate, best-effort update alongside the main
-- task upsert (same pattern as content_type/campaign_type) so a database
-- that hasn't run this migration yet just doesn't persist the linked page
-- across a reload, rather than failing the whole task insert/update.
alter table public.tasks add column if not exists page_url text;
alter table public.tasks add column if not exists page_title text;
