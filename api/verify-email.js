// Vercel serverless function. Runs server-side only.
//
// Confirms a pending email change started by api/change-email.js. The link
// emailed to the NEW address points at the /verify-email page, which posts
// { userId, token } here. Only once the token matches (and hasn't expired)
// do we actually flip the login email — via the Admin API, which changes it
// immediately and skips Supabase's own built-in email-change confirmation
// (we've already done our own verification, so a second round-trip through
// Supabase's flow would be redundant) — and mirror it onto profiles.email.
import { createClient } from '@supabase/supabase-js';

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h, matches the invite/recovery link lifetime

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    res.status(500).json({ error: 'Server is missing SUPABASE_URL / SUPABASE_SECRET_KEY env vars.' });
    return;
  }

  const { userId, token } = req.body || {};
  if (!userId || !token) {
    res.status(400).json({ error: 'userId and token are required.' });
    return;
  }

  const supabaseAdmin = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: profile, error: profileErr } = await supabaseAdmin
    .from('profiles').select('id, pending_email, pending_email_token, pending_email_requested_at').eq('id', userId).single();
  if (profileErr || !profile) {
    res.status(404).json({ error: 'Account not found.' });
    return;
  }
  if (!profile.pending_email || !profile.pending_email_token) {
    res.status(400).json({ error: 'No pending email change for this account.' });
    return;
  }
  if (profile.pending_email_token !== token) {
    res.status(400).json({ error: 'This link is invalid. It may have already been used.' });
    return;
  }
  const requestedAt = profile.pending_email_requested_at ? new Date(profile.pending_email_requested_at).getTime() : 0;
  if (!requestedAt || Date.now() - requestedAt > TOKEN_TTL_MS) {
    res.status(400).json({ error: 'This link has expired. Ask an admin to change your email again.' });
    return;
  }

  const newEmail = profile.pending_email;

  const { error: authErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    email: newEmail, email_confirm: true,
  });
  if (authErr) {
    res.status(400).json({ error: authErr.message });
    return;
  }

  const { error: updateErr } = await supabaseAdmin.from('profiles').update({
    email: newEmail, pending_email: null, pending_email_token: null, pending_email_requested_at: null,
  }).eq('id', userId);
  if (updateErr) {
    res.status(400).json({ error: updateErr.message });
    return;
  }

  res.status(200).json({ ok: true, email: newEmail });
}
