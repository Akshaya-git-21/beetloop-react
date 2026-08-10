-- schema_v20.sql — Admin Settings module (Platform Settings, Security,
-- Integrations, Audit Logs, API Keys, Login Sessions).
--
-- Unlike every other table in this schema, most of these tables carry no
-- select/insert/update RLS policy at all for the `authenticated` role.
-- That's deliberate: they're only ever read/written through the new
-- /api/admin/* serverless functions using the service-role key, which is
-- what actually keeps integration secrets and security policy out of
-- browser reach (an RLS `select` policy restricts which *rows* a client
-- can see, not whether a signed-in user with devtools open can read the
-- table at all with the anon key). platform_settings is the one exception,
-- since it holds no secrets and the whole app needs to read branding/theme
-- on boot.

create table if not exists public.platform_settings (
  key text primary key default 'default',
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);
alter table public.platform_settings enable row level security;
drop policy if exists "platform_settings_select_authenticated" on public.platform_settings;
create policy "platform_settings_select_authenticated" on public.platform_settings
  for select to authenticated using (true);
-- No insert/update policy for authenticated — writes go through
-- /api/admin/settings using the service-role key so every change is
-- audit-logged server-side.

create table if not exists public.security_settings (
  key text primary key default 'default',
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);
alter table public.security_settings enable row level security;
-- No policies at all — service-role only, via /api/admin/security.

create table if not exists public.integration_configs (
  provider text primary key,
  enabled boolean not null default false,
  config jsonb not null default '{}'::jsonb,
  status text not null default 'not_configured',
  status_message text,
  last_tested_at timestamptz,
  last_connected_at timestamptz,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);
alter table public.integration_configs enable row level security;
-- No policies — service-role only, via /api/admin/integrations[/test].

create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  key_hash text not null,
  key_preview text not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  expires_at timestamptz,
  revoked_at timestamptz,
  last_used_at timestamptz
);
alter table public.api_keys enable row level security;
-- No policies — service-role only, via /api/admin/api-keys.

create table if not exists public.login_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  revoked_at timestamptz
);
alter table public.login_sessions enable row level security;
-- No policies — service-role only, via /api/admin/sessions.

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id),
  actor_name text,
  module text not null,
  setting_key text,
  previous_value jsonb,
  new_value jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);
alter table public.audit_logs enable row level security;
-- No policies — service-role only, via /api/admin/audit-logs. Immutable by
-- design: no update/delete policy will ever be added.
create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);
create index if not exists audit_logs_module_idx on public.audit_logs(module);
