-- schema_v12.sql — three modules were never wired to Supabase at all
-- (found during a full-app persistence audit): Backlink/Domain Repository
-- (every create/edit/delete mutated an in-memory array directly, never
-- touched Supabase), the Task compliance checklist (self-scores, evidence,
-- QC verdicts, submit/reopen — all local-only), and Brand Playbook
-- "mark as read" chapter progress.

-- ============ backlink_domains ============
-- Same payload-jsonb + soft-delete shape as campaigns/master_records —
-- one row per domain, keyed by either a seed-derived id (bl-seed-N, so a
-- first edit to a hardcoded seed domain upserts onto a stable key instead
-- of colliding) or a freshly generated id (bl-<timestamp>) for new domains.
create table if not exists public.backlink_domains (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  deleted boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.backlink_domains enable row level security;
drop policy if exists "backlink_domains_select_authenticated" on public.backlink_domains;
create policy "backlink_domains_select_authenticated" on public.backlink_domains for select to authenticated using (true);
drop policy if exists "backlink_domains_insert_authenticated" on public.backlink_domains;
create policy "backlink_domains_insert_authenticated" on public.backlink_domains for insert to authenticated with check (true);
drop policy if exists "backlink_domains_update_authenticated" on public.backlink_domains;
create policy "backlink_domains_update_authenticated" on public.backlink_domains for update to authenticated using (true) with check (true);
drop trigger if exists backlink_domains_set_updated_at on public.backlink_domains;
create trigger backlink_domains_set_updated_at before update on public.backlink_domains for each row execute procedure public.set_updated_at();

-- ============ compliance_checklists ============
-- One row per task, keyed by task_id (the task's code, e.g. TSK-2061) —
-- mirrors the clFill/clQc/clSubmitted state shape already used in the app.
create table if not exists public.compliance_checklists (
  task_id text primary key,
  fill jsonb not null default '{}'::jsonb,
  qc jsonb not null default '{}'::jsonb,
  submitted boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.compliance_checklists enable row level security;
drop policy if exists "compliance_checklists_select_authenticated" on public.compliance_checklists;
create policy "compliance_checklists_select_authenticated" on public.compliance_checklists for select to authenticated using (true);
drop policy if exists "compliance_checklists_insert_authenticated" on public.compliance_checklists;
create policy "compliance_checklists_insert_authenticated" on public.compliance_checklists for insert to authenticated with check (true);
drop policy if exists "compliance_checklists_update_authenticated" on public.compliance_checklists;
create policy "compliance_checklists_update_authenticated" on public.compliance_checklists for update to authenticated using (true) with check (true);
drop trigger if exists compliance_checklists_set_updated_at on public.compliance_checklists;
create trigger compliance_checklists_set_updated_at before update on public.compliance_checklists for each row execute procedure public.set_updated_at();

-- ============ playbook_reads ============
-- One row per (user, brand, chapter) marked read — id is a composite key
-- (user_id:brand_key:chapter_key) so re-marking the same chapter upserts
-- onto the same row instead of duplicating.
create table if not exists public.playbook_reads (
  id text primary key,
  brand_key text not null,
  chapter_key text not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
alter table public.playbook_reads enable row level security;
drop policy if exists "playbook_reads_select_authenticated" on public.playbook_reads;
create policy "playbook_reads_select_authenticated" on public.playbook_reads for select to authenticated using (true);
drop policy if exists "playbook_reads_insert_authenticated" on public.playbook_reads;
create policy "playbook_reads_insert_authenticated" on public.playbook_reads for insert to authenticated with check (true);
drop policy if exists "playbook_reads_update_authenticated" on public.playbook_reads;
create policy "playbook_reads_update_authenticated" on public.playbook_reads for update to authenticated using (true) with check (true);
