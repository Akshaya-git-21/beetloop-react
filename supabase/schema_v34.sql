-- schema_v34.sql — profiles.invited_at: tracks whether/when a real
-- activation-invite email has actually been sent. Adding a user no longer
-- auto-sends one (see api/invite-user.js's new sendEmail flag) — this is
-- what lets User Management show "Send invitation" for a user who's never
-- gotten one yet, vs "Resend invitation" once one has actually gone out.
alter table public.profiles add column if not exists invited_at timestamptz;
