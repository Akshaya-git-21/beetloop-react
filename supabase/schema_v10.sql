-- schema_v10.sql — threads table is missing an UPDATE policy.
-- messages already has messages_update_authenticated (schema_v2.sql:178),
-- but threads only ever had select+insert (schema_v2.sql:152-155). That was
-- fine while the only write path was thSave()'s plain insert of a
-- brand-new thread, but pin/archive (_patchThread in AppRoot.jsx) upserts
-- an *existing* thread row, which Postgres executes as INSERT ... ON
-- CONFLICT DO UPDATE — the UPDATE half has no matching policy, so RLS
-- silently rejects it ("new row violates row-level security policy").
drop policy if exists "threads_update_authenticated" on public.threads;
create policy "threads_update_authenticated" on public.threads for update to authenticated using (true) with check (true);
