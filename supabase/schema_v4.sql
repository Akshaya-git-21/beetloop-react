-- Beetloop schema v4: addendum for the six-item diff pass against the
-- reference build (Dashboard scope pill, Lead Pipeline contact-field
-- removal, Sales brand assignment, QC rework column, attachment preview
-- modal, SOP permission mapping).
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run,
-- AFTER schema.sql, schema_v2.sql and schema_v3.sql. Safe to re-run.

-- Note: SOP soft-delete (Admin-only "Delete" action) needs no schema change —
-- `deleted` flows through the existing `sops.payload` jsonb column, the same
-- way every other SOP field already round-trips.

-- ============ profiles: per-user Sales brand assignment ============
-- Lets a Sales Executive's leads/pipeline/reports/dashboard widgets be
-- restricted to their assigned brand(s), set by Admin in User Management
-- (or at invite time in the Add User form).
alter table public.profiles add column if not exists brands jsonb not null default '[]'::jsonb;

-- Carry brands through from the invite metadata, same as role/department/designation.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role_key, department, designation, status, brands)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role_key', 'junior'),
    new.raw_user_meta_data->>'department',
    new.raw_user_meta_data->>'designation',
    'Pending Invitation',
    coalesce(new.raw_user_meta_data->'brands', '[]'::jsonb)
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- The original "profiles_update_own" policy (auth.uid() = id) only lets a
-- user edit their own row, so Admin's User Management "Save" (role,
-- department, status, brands for SOMEONE ELSE) was silently blocked by RLS.
-- Matches the same "authenticated, app-gated" convention already used for
-- every other admin-managed table in this schema (master_records,
-- role_permissions, campaigns, etc. all use `to authenticated using (true)`
-- rather than an ownership check).
drop policy if exists "profiles_update_authenticated" on public.profiles;
create policy "profiles_update_authenticated" on public.profiles
  for update to authenticated using (true) with check (true);
