-- Beetloop schema v6: fixes misleading realtime notifications.
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run,
-- after schema_v5.sql. Safe to re-run.

-- By default Postgres only logs the primary key in the "old row" of an
-- UPDATE/DELETE WAL event (REPLICA IDENTITY DEFAULT), so Supabase realtime's
-- `payload.old` only ever contained `{id: ...}` — never enough to tell what
-- actually changed. That's why every task edit (timer start/stop, checklist
-- tick, comment, evidence, an actual status change...) showed the same
-- generic "status: X" notification regardless of what was really edited.
-- REPLICA IDENTITY FULL makes Postgres log the entire previous row, so
-- payload.old carries real before/after values to diff against.
alter table public.tasks replica identity full;
alter table public.okrs replica identity full;
alter table public.profiles replica identity full;
alter table public.records replica identity full;
alter table public.campaigns replica identity full;
alter table public.tickets replica identity full;
