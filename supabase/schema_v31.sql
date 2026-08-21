-- Custom repository records (e.g. "Operations ideas" under Repositories)
-- gained a richer field set: Description, Brand, Link, Attachments and a
-- QC Review status, alongside the existing Name/Type/Owner/Status. Client
-- code writes these defensively via a separate, best-effort update
-- alongside the main insert/update — so until this migration is applied,
-- these extra fields simply don't persist across a reload (today's exact
-- behavior), rather than the whole record insert/update failing.
alter table public.records add column if not exists description text;
alter table public.records add column if not exists brand text;
alter table public.records add column if not exists link text;
alter table public.records add column if not exists qc_review text;
alter table public.records add column if not exists attachments jsonb not null default '[]'::jsonb;

-- The `records` table (schema.sql) was created with select/insert/update
-- RLS policies but no delete policy at all — with RLS enabled and no
-- explicit policy for an operation, Postgres denies it by default, so
-- every delete of a Project/Campaign/custom-repository record has always
-- silently affected zero rows (no error returned, the row just never
-- disappears). Confirmed live while testing the Operations Ideas delete
-- flow. This adds the missing policy so delete actually works.
drop policy if exists "records_delete_authenticated" on public.records;
create policy "records_delete_authenticated" on public.records
  for delete using (auth.role() = 'authenticated');
