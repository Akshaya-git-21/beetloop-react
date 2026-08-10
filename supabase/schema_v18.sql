-- schema_v18.sql — Secretary role
-- Adds the new 'secretary' role (Company Secretary — QC access + delegated
-- Managing Director-level authority) to the profiles.role_key CHECK
-- constraint, following the exact same pattern as schema_v7.sql when 'dm'
-- and 'sales' were added. Without this, assigning the Secretary role via
-- User Management or a new-user invite is silently rejected by Postgres.
alter table public.profiles drop constraint if exists profiles_role_key_check;
alter table public.profiles add constraint profiles_role_key_check
  check (role_key in ('admin','ceo','coo','manager','team_lead','senior','junior','qc','dm','sales','secretary'));
