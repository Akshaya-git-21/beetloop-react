-- Security lint fixes (Supabase Security Advisor, observed 2026-09-02).
--
-- Deliberately NOT touched here: the ~20 "RLS Policy Always True" warnings
-- on campaigns/tasks-adjacent/profiles/role_permissions/etc. Those policies
-- are intentional — see schema_v4.sql's own comment on
-- profiles_update_authenticated: this app puts real authorization in the
-- client's hasPerm() checks and uses RLS only as an authenticated-or-not
-- gate, the same convention used everywhere else in this schema. Tightening
-- them to per-owner checks would fight that design and break Admin/Manager/
-- QC override behavior (Admin editing anyone's profile, Manager reassigning
-- tasks, QC approving others' work, etc.) that's been verified working
-- throughout this project.

-- 1) function_search_path_mutable: set_updated_at had no fixed search_path,
-- so a session with a hijacked search_path could redirect it to a
-- same-named function in another schema. Locking it down is a no-op for
-- normal operation.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public, pg_temp;

-- 2) handle_new_user() only ever needs to run as the `on auth.users insert`
-- trigger — trigger firing doesn't check EXECUTE grants on the calling
-- role, so revoking it from anon/authenticated/public closes the
-- /rest/v1/rpc/handle_new_user endpoint with zero effect on real signups.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- 3) current_person_name() is referenced inside RLS policies (threads/
-- messages), which requires `authenticated` to keep EXECUTE for those
-- policies to evaluate. A plain `revoke ... from anon` isn't enough — new
-- functions default to EXECUTE granted to the PUBLIC pseudo-role, which
-- anon inherits from regardless of a direct per-role revoke — so this
-- revokes the PUBLIC grant outright and re-grants only to authenticated.
revoke execute on function public.current_person_name() from public;
grant execute on function public.current_person_name() to authenticated;
