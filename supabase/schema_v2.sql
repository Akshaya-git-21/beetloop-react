-- Beetloop schema v2: persistence for every remaining module (SOPs, Tickets,
-- Content Repository pages, Campaigns, Leads, Contacts, Messages, Templates).
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run,
-- AFTER schema.sql. Safe to re-run: uses "if not exists" / "or replace" throughout.
--
-- Design note: every module here is a deeply nested, client-filtered record
-- (the app never filters/sorts these server-side — it always does
-- `select('*')` and works in JS). So instead of hand-mapping dozens of nested
-- fields into columns per table, each row is `id` + a `payload jsonb` holding
-- the entire record exactly as the app already shapes it. This mirrors how
-- `tasks.checklist/evidence/comments/activity` already store nested data as
-- jsonb in schema.sql.
--
-- Every create/edit action in the app writes with upsert() rather than
-- insert()/update(), keyed by the app's own id (SOP-001, TKT-1041, etc.) —
-- including ids that started life as hardcoded demo/seed data and only
-- get a real row the first time someone actually edits them. This is what
-- lets editing a seed record survive a reload: the client always merges its
-- local hardcoded seed array with whatever rows now exist in the table,
-- preferring the persisted row whenever both share an id (see AppRoot.jsx's
-- allSops()/allTickets()/etc. — added.concat(SEED.filter(not in added))).
--
-- RLS below uses `to authenticated` (not the deprecated `auth.role() =
-- 'authenticated'`) and gives every update policy an explicit `with check`
-- alongside `using`, per current Supabase guidance.

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============ sops ============
create table if not exists public.sops (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.sops enable row level security;
drop policy if exists "sops_select_authenticated" on public.sops;
create policy "sops_select_authenticated" on public.sops for select to authenticated using (true);
drop policy if exists "sops_insert_authenticated" on public.sops;
create policy "sops_insert_authenticated" on public.sops for insert to authenticated with check (true);
drop policy if exists "sops_update_authenticated" on public.sops;
create policy "sops_update_authenticated" on public.sops for update to authenticated using (true) with check (true);
drop trigger if exists sops_set_updated_at on public.sops;
create trigger sops_set_updated_at before update on public.sops for each row execute procedure public.set_updated_at();

-- ============ tickets (Support) ============
create table if not exists public.tickets (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.tickets enable row level security;
drop policy if exists "tickets_select_authenticated" on public.tickets;
create policy "tickets_select_authenticated" on public.tickets for select to authenticated using (true);
drop policy if exists "tickets_insert_authenticated" on public.tickets;
create policy "tickets_insert_authenticated" on public.tickets for insert to authenticated with check (true);
drop policy if exists "tickets_update_authenticated" on public.tickets;
create policy "tickets_update_authenticated" on public.tickets for update to authenticated using (true) with check (true);
drop trigger if exists tickets_set_updated_at on public.tickets;
create trigger tickets_set_updated_at before update on public.tickets for each row execute procedure public.set_updated_at();

-- ============ content_pages (Website Content Repository) ============
create table if not exists public.content_pages (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.content_pages enable row level security;
drop policy if exists "content_pages_select_authenticated" on public.content_pages;
create policy "content_pages_select_authenticated" on public.content_pages for select to authenticated using (true);
drop policy if exists "content_pages_insert_authenticated" on public.content_pages;
create policy "content_pages_insert_authenticated" on public.content_pages for insert to authenticated with check (true);
drop policy if exists "content_pages_update_authenticated" on public.content_pages;
create policy "content_pages_update_authenticated" on public.content_pages for update to authenticated using (true) with check (true);
drop trigger if exists content_pages_set_updated_at on public.content_pages;
create trigger content_pages_set_updated_at before update on public.content_pages for each row execute procedure public.set_updated_at();

-- ============ campaigns ============
-- `deleted` is a real column (not folded into payload) because
-- _loadCampaigns() filters on it directly to decide what belongs in
-- cmpAdded vs cmpDeleted on load.
create table if not exists public.campaigns (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  deleted boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.campaigns enable row level security;
drop policy if exists "campaigns_select_authenticated" on public.campaigns;
create policy "campaigns_select_authenticated" on public.campaigns for select to authenticated using (true);
drop policy if exists "campaigns_insert_authenticated" on public.campaigns;
create policy "campaigns_insert_authenticated" on public.campaigns for insert to authenticated with check (true);
drop policy if exists "campaigns_update_authenticated" on public.campaigns;
create policy "campaigns_update_authenticated" on public.campaigns for update to authenticated using (true) with check (true);
drop trigger if exists campaigns_set_updated_at on public.campaigns;
create trigger campaigns_set_updated_at before update on public.campaigns for each row execute procedure public.set_updated_at();

-- ============ leads ============
-- Leads are append-only in the app (no edit/delete UI exists for them), so
-- this table has no update policy and no updated_at — nothing ever needs it.
create table if not exists public.leads (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;
drop policy if exists "leads_select_authenticated" on public.leads;
create policy "leads_select_authenticated" on public.leads for select to authenticated using (true);
drop policy if exists "leads_insert_authenticated" on public.leads;
create policy "leads_insert_authenticated" on public.leads for insert to authenticated with check (true);

-- ============ contacts ============
create table if not exists public.contacts (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.contacts enable row level security;
drop policy if exists "contacts_select_authenticated" on public.contacts;
create policy "contacts_select_authenticated" on public.contacts for select to authenticated using (true);
drop policy if exists "contacts_insert_authenticated" on public.contacts;
create policy "contacts_insert_authenticated" on public.contacts for insert to authenticated with check (true);
drop policy if exists "contacts_update_authenticated" on public.contacts;
create policy "contacts_update_authenticated" on public.contacts for update to authenticated using (true) with check (true);
drop trigger if exists contacts_set_updated_at on public.contacts;
create trigger contacts_set_updated_at before update on public.contacts for each row execute procedure public.set_updated_at();

-- ============ threads (Messages module — channels/DMs, not individual messages) ============
create table if not exists public.threads (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
alter table public.threads enable row level security;
drop policy if exists "threads_select_authenticated" on public.threads;
create policy "threads_select_authenticated" on public.threads for select to authenticated using (true);
drop policy if exists "threads_insert_authenticated" on public.threads;
create policy "threads_insert_authenticated" on public.threads for insert to authenticated with check (true);

-- ============ messages (individual chat messages) ============
-- `id` is the app-supplied composite key `<thread_id>:<message_id>`, not a
-- DB-generated uuid. This is deliberate: it's what lets both a brand-new
-- message AND a retroactive edit to an existing message (e.g. linking a
-- message to a task after the fact, including messages that were part of
-- the original hardcoded seed threads) upsert() to the exact same row
-- instead of needing separate insert/update code paths.
create table if not exists public.messages (
  id text primary key,
  thread_id text not null,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
create index if not exists messages_thread_id_idx on public.messages(thread_id);
alter table public.messages enable row level security;
drop policy if exists "messages_select_authenticated" on public.messages;
create policy "messages_select_authenticated" on public.messages for select to authenticated using (true);
drop policy if exists "messages_insert_authenticated" on public.messages;
create policy "messages_insert_authenticated" on public.messages for insert to authenticated with check (true);
drop policy if exists "messages_update_authenticated" on public.messages;
create policy "messages_update_authenticated" on public.messages for update to authenticated using (true) with check (true);

-- ============ templates (Task / OKR / KPI templates, one table via `kind`) ============
create table if not exists public.templates (
  id text primary key,
  kind text not null check (kind in ('task','okr','kpi')),
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.templates enable row level security;
drop policy if exists "templates_select_authenticated" on public.templates;
create policy "templates_select_authenticated" on public.templates for select to authenticated using (true);
drop policy if exists "templates_insert_authenticated" on public.templates;
create policy "templates_insert_authenticated" on public.templates for insert to authenticated with check (true);
drop policy if exists "templates_update_authenticated" on public.templates;
create policy "templates_update_authenticated" on public.templates for update to authenticated using (true) with check (true);
drop trigger if exists templates_set_updated_at on public.templates;
create trigger templates_set_updated_at before update on public.templates for each row execute procedure public.set_updated_at();

-- ============ realtime ============
do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='sops') then
    alter publication supabase_realtime add table public.sops;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='tickets') then
    alter publication supabase_realtime add table public.tickets;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='content_pages') then
    alter publication supabase_realtime add table public.content_pages;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='campaigns') then
    alter publication supabase_realtime add table public.campaigns;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='leads') then
    alter publication supabase_realtime add table public.leads;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='contacts') then
    alter publication supabase_realtime add table public.contacts;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='threads') then
    alter publication supabase_realtime add table public.threads;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='messages') then
    alter publication supabase_realtime add table public.messages;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='templates') then
    alter publication supabase_realtime add table public.templates;
  end if;
end $$;

-- ============ migration note ============
-- If you already ran an earlier version of this file where `messages.id`
-- was a uuid, drop and recreate that one table before re-running the block
-- above (it's empty either way, since this is the first version anyone
-- could have actually used it from):
--   drop table if exists public.messages;
-- then re-run this whole file.
