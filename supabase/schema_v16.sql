-- schema_v16.sql — Repositories: custom repositories now have a real,
-- working records CRUD (previously the "New repository" flow created a
-- permanent dead end with no way to add/edit/delete anything inside it).
-- That reuses the `records` table originally built only for the (never
-- actually reachable) Projects/Campaigns screens, whose `kind` column was
-- restricted to exactly those two literal values. A custom repository's
-- key (e.g. 'r1699999999') is free-form, so that constraint must go.
alter table public.records drop constraint if exists records_kind_check;
