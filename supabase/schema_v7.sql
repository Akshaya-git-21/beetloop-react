-- Beetloop schema v7: fixes Admin role changes silently failing to persist.
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run,
-- after schema_v6.sql. Safe to re-run.

-- profiles.role_key has always had a CHECK constraint listing every valid
-- role key. When 'dm' (Digital Marketing Executive) and 'sales' (Sales
-- Executive) were added to the app's ROLES map, this constraint was never
-- updated to match — so any attempt to set role_key to 'dm' or 'sales'
-- (via User Management edit, or a new-user invite) was rejected outright by
-- Postgres. The UI showed the change optimistically, but the very next
-- realtime profile reload reverted it back to the last value that actually
-- made it into the database, which looked like "the role change isn't
-- saving" with no visible error (the failure only ever logged to console).
alter table public.profiles drop constraint if exists profiles_role_key_check;
alter table public.profiles add constraint profiles_role_key_check
  check (role_key in ('admin','ceo','coo','manager','team_lead','senior','junior','qc','dm','sales'));
