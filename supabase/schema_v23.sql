-- Contributors were a dead <input> on the Create OKR form (no state, no
-- persistence) — the "team" badge shown in the OKR list was a hardcoded
-- '+1'/'+2' string on the seed rows, not a real count. Adding a real column
-- so contributors are actually saved and the badge reflects real data.
alter table public.okrs add column if not exists contributors jsonb not null default '[]'::jsonb;

-- The Owner chosen on the Create OKR form was never persisted either — on
-- reload it was reconstructed by guessing from the first Key Result's
-- owner, which silently shows the wrong person whenever they differ.
-- owner_id (uuid FK) already exists but nothing resolves a display name to
-- a profile id yet; a plain text column matches how every other
-- person-field on this table (reviewer, approver) is already stored.
alter table public.okrs add column if not exists owner text;
