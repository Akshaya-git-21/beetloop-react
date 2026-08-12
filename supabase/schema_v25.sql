-- OKRs never persisted their own Start Date / Due Date — _saveOkr() computed
-- a display string locally but the insert/upsert calls never sent it to
-- Supabase, and _loadOkrs() hardcoded every loaded OKR's due date to
-- 'Mar 31, 2026' and start date to today. That's why editing an OKR (which
-- reopens from this reloaded, wrong data) appeared to silently overwrite
-- whatever date the user had actually picked. Client code now reads/writes
-- these as real columns; until this migration is applied, dates simply
-- don't persist across a reload (today's exact behavior), not a broken
-- insert/update.
alter table public.okrs add column if not exists start_date date;
alter table public.okrs add column if not exists due_date date;
