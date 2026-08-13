-- schema_v28.sql — okrs.reviewer / okrs.approver: same gap as brand
-- (schema_v27.sql) — neither column existed, so both were silently
-- dropped on every write and _loadOkrs() hardcoded them back to '' on
-- load. Reviewer is a field the OKR creator actually picks; Approver
-- defaults to whoever created the OKR. Both only ever survived in the
-- current session's optimistic local state, which is why OKR View
-- showed them blank after a reload.
alter table public.okrs add column if not exists reviewer text;
alter table public.okrs add column if not exists approver text;
