-- schema_v27.sql — okrs.brand: Brand/Company picked when creating or
-- editing an OKR was never persisted (no column existed, so every write
-- silently dropped it and _loadOkrs() hardcoded it back to '' on load) —
-- it only ever survived in the current session's optimistic local state.
-- That's why OKR View showed no Brand after a reload.
alter table public.okrs add column if not exists brand text;
