// Vercel serverless function. Runs server-side only.
//
// Replaces the old email-a-reset-link flow (api/reset-password.js, now
// removed): Admin types a new password directly for an existing user in
// User Management — nothing is emailed, nobody but Admin ever sees this
// screen, and Admin is expected to share the new password with the person
// directly, out of band. Also doubles as the activation step for any
// still-legacy 'Pending Invitation' account: setting a password for one
// flips it to Active, since there's no other activation step left.
//
// Required Vercel env vars (server-side only, never VITE_-prefixed):
//   SUPABASE_URL, SUPABASE_SECRET_KEY
import { createClient } from '@supabase/supabase-js';

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

  const { userId, password } = req.body || {};
  if (!userId || !password) {
    res.status(400).json({ error: 'userId and password are required.' });
    return;
  }
  if (password.length < 12) {
    res.status(400).json({ error: 'password must be at least 12 characters.' });
    return;
  }

  const supabaseAdmin = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error: authErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password, email_confirm: true,
  });
  if (authErr) {
    res.status(400).json({ error: authErr.message });
    return;
  }

  const { data: profile } = await supabaseAdmin.from('profiles').select('status').eq('id', userId).maybeSingle();
  let activated = false;
  if (profile && profile.status === 'Pending Invitation') {
    const { error: statusErr } = await supabaseAdmin.from('profiles').update({ status: 'Active' }).eq('id', userId);
    if (statusErr) console.warn('[supabase] profile activation status update failed:', statusErr.message);
    else activated = true;
  }

  res.status(200).json({ ok: true, activated });
}
