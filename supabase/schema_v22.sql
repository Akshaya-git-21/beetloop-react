-- Adds a time-of-day component alongside each task's existing start/end
-- date columns. Kept as separate nullable columns (rather than merging into
-- a single timestamp) so every existing date-only reader of start_date/
-- end_date keeps working unchanged — only the new date+time edit UI in the
-- Task Detail Drawer reads/writes these.
alter table public.tasks add column if not exists start_time text;
alter table public.tasks add column if not exists end_time text;
