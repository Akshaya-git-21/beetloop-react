-- schema_v17.sql — Repositories: custom repositories can now be deleted
-- (previously there was no delete UI at all for them, matching the
-- schema_v3.sql comment "create-only, no edit UI exists" — that's no longer
-- true now that Repositories has a real Delete action). RLS only ever had
-- select/insert policies for document_repo, so the delete silently did
-- nothing until this policy is added.
drop policy if exists "document_repo_delete_authenticated" on public.document_repo;
create policy "document_repo_delete_authenticated" on public.document_repo
  for delete to authenticated using (true);
