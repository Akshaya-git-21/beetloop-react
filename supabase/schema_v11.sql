-- schema_v11.sql — OKR Management needs Business Unit and Website Domain
-- as real, persisted fields (previously dead, unwired <select>s in
-- OkrCreatePanel.jsx that were never saved anywhere).
alter table public.okrs add column if not exists business_unit text;
alter table public.okrs add column if not exists website_domain text;
