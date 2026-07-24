-- Beetloop schema: run this once in Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Safe to re-run: uses "if not exists" / "or replace" throughout.

-- ============ profiles (extends auth.users with app-specific fields) ============
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role_key text not null default 'junior'
    check (role_key in ('admin','ceo','coo','manager','team_lead','senior','junior','qc')),
  department text,
  designation text,
  status text not null default 'Active',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated" on public.profiles
  for select using (auth.role() = 'authenticated');

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- auto-create a profile row whenever a new auth user is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role_key, department, designation)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role_key', 'junior'),
    new.raw_user_meta_data->>'department',
    new.raw_user_meta_data->>'designation'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============ tasks ============
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  description text,
  priority text not null default 'Medium',
  status text not null default 'Assigned',
  division text,
  project text,
  campaign text,
  assignee_name text,
  reviewer_name text,
  start_date date,
  end_date date,
  effort_estimate numeric,
  effort_actual numeric default 0,
  recurrence text default 'None',
  checklist jsonb not null default '[]'::jsonb,
  linked_kpi text,
  kpi_id text,
  units numeric default 0,
  unit text,
  dependency text,
  effort_plan text,
  effort_row text,
  dep_mode text default 'Parallel',
  evidence jsonb not null default '[]'::jsonb,
  comments jsonb not null default '[]'::jsonb,
  activity jsonb not null default '[]'::jsonb,
  qc_feedback text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

drop policy if exists "tasks_select_authenticated" on public.tasks;
create policy "tasks_select_authenticated" on public.tasks
  for select using (auth.role() = 'authenticated');

drop policy if exists "tasks_insert_authenticated" on public.tasks;
create policy "tasks_insert_authenticated" on public.tasks
  for insert with check (auth.role() = 'authenticated');

drop policy if exists "tasks_update_authenticated" on public.tasks;
create policy "tasks_update_authenticated" on public.tasks
  for update using (auth.role() = 'authenticated');

-- ============ okrs ============
create table if not exists public.okrs (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text not null,
  description text,
  category text,
  scope text not null default 'Department',
  division text,
  status text not null default 'Active',
  owner_id uuid references public.profiles(id),
  key_results jsonb not null default '[]'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.okrs enable row level security;

drop policy if exists "okrs_select_authenticated" on public.okrs;
create policy "okrs_select_authenticated" on public.okrs
  for select using (auth.role() = 'authenticated');

drop policy if exists "okrs_insert_authenticated" on public.okrs;
create policy "okrs_insert_authenticated" on public.okrs
  for insert with check (auth.role() = 'authenticated');

drop policy if exists "okrs_update_authenticated" on public.okrs;
create policy "okrs_update_authenticated" on public.okrs
  for update using (auth.role() = 'authenticated');

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at before update on public.tasks
  for each row execute procedure public.set_updated_at();

drop trigger if exists okrs_set_updated_at on public.okrs;
create trigger okrs_set_updated_at before update on public.okrs
  for each row execute procedure public.set_updated_at();

-- ============ realtime (powers the live notification bell) ============
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'tasks'
  ) then
    alter publication supabase_realtime add table public.tasks;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'okrs'
  ) then
    alter publication supabase_realtime add table public.okrs;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table public.profiles;
  end if;
end $$;
