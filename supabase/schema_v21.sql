-- schema_v21.sql — allow anonymous (pre-login) reads of platform_settings.
-- The login screen now shows the configured Login Logo / Login Background
-- / Platform Name, which means it has to read this table BEFORE a session
-- exists. platform_settings holds no secrets (that's the whole reason its
-- schema in schema_v20.sql didn't lock it down like security_settings/
-- integration_configs do), so extending its existing select policy to the
-- anon role is safe — it only ever exposes branding, never anything from
-- the tables that stayed service-role-only.
drop policy if exists "platform_settings_select_authenticated" on public.platform_settings;
create policy "platform_settings_select_public" on public.platform_settings
  for select to authenticated, anon using (true);
