-- schema_v26.sql — document_repo was missing an UPDATE policy (schema_v3
-- only ever added select/insert, schema_v17 added delete). Any write that
-- resolves to an UPDATE on an existing row (a plain .update(), or an
-- .upsert() that hits a row that already exists) was silently rejected by
-- RLS with "new row violates row-level security policy" — this broke
-- editing a custom repository a second time and hiding/relabelling a
-- built-in repository once its overlay row already existed.
drop policy if exists "document_repo_update_authenticated" on public.document_repo;
create policy "document_repo_update_authenticated" on public.document_repo
  for update to authenticated using (true) with check (true);
