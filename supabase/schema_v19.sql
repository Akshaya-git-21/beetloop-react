-- schema_v19.sql — Leads: soft-delete support
-- Daily Leads previously had no delete/edit UI at all (schema_v2.sql's own
-- comment called the table "append-only... no update policy"). A real
-- Delete action has now been added in the app, matching the pattern already
-- used for contacts/tasks/okrs/etc. (schema_v13.sql) — needs the same
-- `deleted` column plus an update policy, neither of which `leads` ever got.
alter table public.leads add column if not exists deleted boolean not null default false;
drop policy if exists "leads_update_authenticated" on public.leads;
create policy "leads_update_authenticated" on public.leads
  for update to authenticated using (true) with check (true);
