-- Beetloop schema v3: persistence for every module discovered on the second
-- pass — Master Data (all non-user master types), the Admin Permissions
-- matrix, Content Ideas, Effort Planner (+ custom divisions), Document
-- Repository custom entries, Check-ins, KPI actuals, and Junior task
-- completion. Also required for the OKR *edit* path (schema.sql's `okrs`
-- table already existed, but only OKR creation ever wrote to it — editing,
-- archiving, cloning and check-in-driven KR updates only lived in local
-- state before this file's app-side fixes).
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run,
-- AFTER schema.sql and schema_v2.sql. Safe to re-run.

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============ master_records (every Master Data type except User Master, which is `profiles`) ============
-- id is "<master_key>:<record_id>" (record_id = the master's own first
-- field, e.g. Service_ID) so a record that started life as hardcoded seed
-- data can still be upserted the first time someone edits or deletes it.
create table if not exists public.master_records (
  id text primary key,
  master_key text not null,
  payload jsonb not null default '{}'::jsonb,
  deleted boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists master_records_key_idx on public.master_records(master_key);
alter table public.master_records enable row level security;
drop policy if exists "master_records_select_authenticated" on public.master_records;
create policy "master_records_select_authenticated" on public.master_records for select to authenticated using (true);
drop policy if exists "master_records_insert_authenticated" on public.master_records;
create policy "master_records_insert_authenticated" on public.master_records for insert to authenticated with check (true);
drop policy if exists "master_records_update_authenticated" on public.master_records;
create policy "master_records_update_authenticated" on public.master_records for update to authenticated using (true) with check (true);
drop trigger if exists master_records_set_updated_at on public.master_records;
create trigger master_records_set_updated_at before update on public.master_records for each row execute procedure public.set_updated_at();

-- ============ role_permissions (Admin's granular Create/Edit/Delete/View/Approve/Export matrix) ============
create table if not exists public.role_permissions (
  module_key text not null,
  role_key text not null,
  perms jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (module_key, role_key)
);
alter table public.role_permissions enable row level security;
drop policy if exists "role_permissions_select_authenticated" on public.role_permissions;
create policy "role_permissions_select_authenticated" on public.role_permissions for select to authenticated using (true);
drop policy if exists "role_permissions_insert_authenticated" on public.role_permissions;
create policy "role_permissions_insert_authenticated" on public.role_permissions for insert to authenticated with check (true);
drop policy if exists "role_permissions_update_authenticated" on public.role_permissions;
create policy "role_permissions_update_authenticated" on public.role_permissions for update to authenticated using (true) with check (true);
drop policy if exists "role_permissions_delete_authenticated" on public.role_permissions;
create policy "role_permissions_delete_authenticated" on public.role_permissions for delete to authenticated using (true);

-- ============ ideas (Content Ideas Repository) ============
create table if not exists public.ideas (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.ideas enable row level security;
drop policy if exists "ideas_select_authenticated" on public.ideas;
create policy "ideas_select_authenticated" on public.ideas for select to authenticated using (true);
drop policy if exists "ideas_insert_authenticated" on public.ideas;
create policy "ideas_insert_authenticated" on public.ideas for insert to authenticated with check (true);
drop policy if exists "ideas_update_authenticated" on public.ideas;
create policy "ideas_update_authenticated" on public.ideas for update to authenticated using (true) with check (true);
drop trigger if exists ideas_set_updated_at on public.ideas;
create trigger ideas_set_updated_at before update on public.ideas for each row execute procedure public.set_updated_at();

-- ============ effort_plans ============
create table if not exists public.effort_plans (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.effort_plans enable row level security;
drop policy if exists "effort_plans_select_authenticated" on public.effort_plans;
create policy "effort_plans_select_authenticated" on public.effort_plans for select to authenticated using (true);
drop policy if exists "effort_plans_insert_authenticated" on public.effort_plans;
create policy "effort_plans_insert_authenticated" on public.effort_plans for insert to authenticated with check (true);
drop policy if exists "effort_plans_update_authenticated" on public.effort_plans;
create policy "effort_plans_update_authenticated" on public.effort_plans for update to authenticated using (true) with check (true);
drop trigger if exists effort_plans_set_updated_at on public.effort_plans;
create trigger effort_plans_set_updated_at before update on public.effort_plans for each row execute procedure public.set_updated_at();

-- ============ custom_divisions (Effort Planner's admin-defined role/division list) ============
create table if not exists public.custom_divisions (
  name text primary key,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
alter table public.custom_divisions enable row level security;
drop policy if exists "custom_divisions_select_authenticated" on public.custom_divisions;
create policy "custom_divisions_select_authenticated" on public.custom_divisions for select to authenticated using (true);
drop policy if exists "custom_divisions_insert_authenticated" on public.custom_divisions;
create policy "custom_divisions_insert_authenticated" on public.custom_divisions for insert to authenticated with check (true);

-- ============ document_repo (Document Repository custom entries — create-only, no edit UI exists) ============
create table if not exists public.document_repo (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
alter table public.document_repo enable row level security;
drop policy if exists "document_repo_select_authenticated" on public.document_repo;
create policy "document_repo_select_authenticated" on public.document_repo for select to authenticated using (true);
drop policy if exists "document_repo_insert_authenticated" on public.document_repo;
create policy "document_repo_insert_authenticated" on public.document_repo for insert to authenticated with check (true);

-- ============ check_ins (My KPIs check-in log entries — insert-only, never edited after submission) ============
create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  ref_id text not null,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
create index if not exists check_ins_ref_id_idx on public.check_ins(ref_id);
alter table public.check_ins enable row level security;
drop policy if exists "check_ins_select_authenticated" on public.check_ins;
create policy "check_ins_select_authenticated" on public.check_ins for select to authenticated using (true);
drop policy if exists "check_ins_insert_authenticated" on public.check_ins;
create policy "check_ins_insert_authenticated" on public.check_ins for insert to authenticated with check (true);

-- ============ kpi_actuals (latest reported actual value per KPI, from check-ins) ============
create table if not exists public.kpi_actuals (
  kpi_id text primary key,
  val text,
  date text,
  created_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);
alter table public.kpi_actuals enable row level security;
drop policy if exists "kpi_actuals_select_authenticated" on public.kpi_actuals;
create policy "kpi_actuals_select_authenticated" on public.kpi_actuals for select to authenticated using (true);
drop policy if exists "kpi_actuals_insert_authenticated" on public.kpi_actuals;
create policy "kpi_actuals_insert_authenticated" on public.kpi_actuals for insert to authenticated with check (true);
drop policy if exists "kpi_actuals_update_authenticated" on public.kpi_actuals;
create policy "kpi_actuals_update_authenticated" on public.kpi_actuals for update to authenticated using (true) with check (true);
drop trigger if exists kpi_actuals_set_updated_at on public.kpi_actuals;
create trigger kpi_actuals_set_updated_at before update on public.kpi_actuals for each row execute procedure public.set_updated_at();

-- ============ task_done (Junior onboarding-checklist task completion) ============
create table if not exists public.task_done (
  task_id text primary key,
  done boolean not null default false,
  created_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);
alter table public.task_done enable row level security;
drop policy if exists "task_done_select_authenticated" on public.task_done;
create policy "task_done_select_authenticated" on public.task_done for select to authenticated using (true);
drop policy if exists "task_done_insert_authenticated" on public.task_done;
create policy "task_done_insert_authenticated" on public.task_done for insert to authenticated with check (true);
drop policy if exists "task_done_update_authenticated" on public.task_done;
create policy "task_done_update_authenticated" on public.task_done for update to authenticated using (true) with check (true);
drop trigger if exists task_done_set_updated_at on public.task_done;
create trigger task_done_set_updated_at before update on public.task_done for each row execute procedure public.set_updated_at();

-- ============ realtime ============
do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='master_records') then
    alter publication supabase_realtime add table public.master_records;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='role_permissions') then
    alter publication supabase_realtime add table public.role_permissions;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='ideas') then
    alter publication supabase_realtime add table public.ideas;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='effort_plans') then
    alter publication supabase_realtime add table public.effort_plans;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='custom_divisions') then
    alter publication supabase_realtime add table public.custom_divisions;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='document_repo') then
    alter publication supabase_realtime add table public.document_repo;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='check_ins') then
    alter publication supabase_realtime add table public.check_ins;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='kpi_actuals') then
    alter publication supabase_realtime add table public.kpi_actuals;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='task_done') then
    alter publication supabase_realtime add table public.task_done;
  end if;
end $$;
