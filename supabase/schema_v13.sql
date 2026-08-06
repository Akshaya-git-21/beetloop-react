-- schema_v13.sql — a full-app audit found that Delete is either invisible
-- or completely unimplemented for most modules (Tasks, OKRs, Content Pages,
-- Content Ideas, Tickets, Templates, Effort Plans, Contacts, Compliance
-- Checklists). This adds the missing `deleted` soft-delete column to every
-- affected table (mirroring the existing campaigns/master_records/
-- backlink_domains pattern), plus a real delete policy for custom_divisions
-- (a plain name-keyed list with no payload row to soft-delete).

alter table public.tasks add column if not exists deleted boolean not null default false;
alter table public.okrs add column if not exists deleted boolean not null default false;
alter table public.content_pages add column if not exists deleted boolean not null default false;
alter table public.ideas add column if not exists deleted boolean not null default false;
alter table public.tickets add column if not exists deleted boolean not null default false;
alter table public.templates add column if not exists deleted boolean not null default false;
alter table public.effort_plans add column if not exists deleted boolean not null default false;
alter table public.contacts add column if not exists deleted boolean not null default false;
alter table public.compliance_checklists add column if not exists deleted boolean not null default false;

drop policy if exists "custom_divisions_delete_authenticated" on public.custom_divisions;
create policy "custom_divisions_delete_authenticated" on public.custom_divisions for delete to authenticated using (true);

-- ============ notifications ============
-- The notification bell was purely in-memory (this.state.notifications),
-- so every reload wiped it back to near-blank except a narrow catch-up
-- query — this persists it per-user so history survives a refresh.
create table if not exists public.notifications (
  id text primary key,
  user_id uuid not null references public.profiles(id),
  text text not null,
  who text,
  nav jsonb,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.notifications enable row level security;
drop policy if exists "notifications_select_own" on public.notifications;
create policy "notifications_select_own" on public.notifications for select to authenticated using (user_id = auth.uid());
drop policy if exists "notifications_insert_own" on public.notifications;
create policy "notifications_insert_own" on public.notifications for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "notifications_update_own" on public.notifications;
create policy "notifications_update_own" on public.notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create index if not exists notifications_user_id_idx on public.notifications(user_id);
