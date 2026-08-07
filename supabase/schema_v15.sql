-- schema_v15.sql — carry Reporting manager / Team lead through from the
-- invite-time metadata, same as brands/department/designation already do
-- (schema_v4.sql). Previously the Add User form collected these two fields
-- but they were silently dropped — the new profile row never got them, so
-- Admin had to set them manually afterwards in User Management.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role_key, department, designation, status, brands, reporting_manager, team_lead)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role_key', 'junior'),
    new.raw_user_meta_data->>'department',
    new.raw_user_meta_data->>'designation',
    'Pending Invitation',
    coalesce(new.raw_user_meta_data->'brands', '[]'::jsonb),
    new.raw_user_meta_data->>'reporting_manager',
    new.raw_user_meta_data->>'team_lead'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;
