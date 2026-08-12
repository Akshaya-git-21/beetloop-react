-- Tasks gained a "Campaign Type" field (shares the same Content Type
-- Master vocabulary Content Repository already uses) so a deliverable's
-- type follows it from Task creation through Content Repository and QC.
-- Client code writes/reads this defensively via a separate, best-effort
-- update alongside the main task upsert — so until this migration is
-- applied, Campaign Type simply doesn't persist across a reload (today's
-- exact behavior), rather than the whole task insert/update failing.
alter table public.tasks add column if not exists content_type text;
