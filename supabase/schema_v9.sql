-- Beetloop schema v9: real, persistent storage for device-picked file
-- attachments (task evidence, QC references, message/ticket/comment/
-- check-in attachments, idea references).
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run,
-- after schema_v8.sql. Safe to re-run.

-- Previously, picking a real file from your device only ever kept its
-- bytes in that browser tab's in-memory React state (fileBlobs) — never
-- written anywhere durable. The preview modal worked right after picking a
-- file, then showed "no file content is stored" for that exact same file
-- after any reload, and never worked for anyone other than the person who
-- originally picked it in that one browser session. Storing it here (same
-- data-URL-in-a-column pattern already used for profiles.avatar_url) makes
-- every attachment genuinely persistent and visible to every user.
create table if not exists public.file_blobs (
  name text primary key,
  data_url text not null,
  mime text,
  size integer,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
alter table public.file_blobs enable row level security;
drop policy if exists "file_blobs_select_authenticated" on public.file_blobs;
create policy "file_blobs_select_authenticated" on public.file_blobs for select to authenticated using (true);
drop policy if exists "file_blobs_insert_authenticated" on public.file_blobs;
create policy "file_blobs_insert_authenticated" on public.file_blobs for insert to authenticated with check (true);
drop policy if exists "file_blobs_update_authenticated" on public.file_blobs;
create policy "file_blobs_update_authenticated" on public.file_blobs for update to authenticated using (true) with check (true);
