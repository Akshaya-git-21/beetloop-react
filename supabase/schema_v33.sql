-- role_permissions controls the app's own Permissions matrix (User
-- Management → Permissions), which every hasPerm()/getPerm() check in the
-- client trusts completely. It was on the same "authenticated, app-gated"
-- convention as the rest of this schema (see schema_v4.sql) — but unlike
-- campaigns/tasks/profiles/etc., a write here doesn't just touch one row of
-- business data, it can grant its author (or anyone) elevated access
-- everywhere else in the app. That's a real escalation path a client-side
-- gate alone can't close, since any authenticated user can call the REST
-- API directly regardless of what the UI shows them — so this is scoped to
-- admin-only writes, while every other table keeps the existing convention.
drop policy if exists "role_permissions_insert_authenticated" on public.role_permissions;
create policy "role_permissions_insert_admin" on public.role_permissions
  for insert to authenticated
  with check ((select role_key from public.profiles where id = auth.uid()) = 'admin');

drop policy if exists "role_permissions_update_authenticated" on public.role_permissions;
create policy "role_permissions_update_admin" on public.role_permissions
  for update to authenticated
  using ((select role_key from public.profiles where id = auth.uid()) = 'admin')
  with check ((select role_key from public.profiles where id = auth.uid()) = 'admin');

drop policy if exists "role_permissions_delete_authenticated" on public.role_permissions;
create policy "role_permissions_delete_admin" on public.role_permissions
  for delete to authenticated
  using ((select role_key from public.profiles where id = auth.uid()) = 'admin');

-- select stays open to every authenticated user — each client needs to read
-- the full matrix to compute its own effective permissions (getPerm()).
