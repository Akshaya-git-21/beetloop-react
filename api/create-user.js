// Vercel serverless function. Runs server-side only.
//
// Replaces the old invite-link flow (api/invite-user.js, now removed):
// Admin now sets the account's password directly in the Add User form, so
// there's nothing left for the invited person to "activate" — this creates
// the account already confirmed and ready to sign in with that password.
// Nothing is emailed; Admin is expected to share the password with the
// person directly, out of band.
//
// Required Vercel env vars (server-side only, never VITE_-prefixed):
//   SUPABASE_URL, SUPABASE_SECRET_KEY
import { createClient } from '@supabase/supabase-js';

const ROLE_KEYS = ['admin', 'ceo', 'coo', 'manager', 'team_lead', 'senior', 'junior', 'qc'];

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

  const { email, password, fullName, roleKey, department, designation, brands, reportingManager, teamLead } = req.body || {};
  if (!email || !fullName) {
    res.status(400).json({ error: 'email and fullName are required.' });
    return;
  }
  if (!password || password.length < 12) {
    res.status(400).json({ error: 'password must be at least 12 characters.' });
    return;
  }
  const role = ROLE_KEYS.includes(roleKey) ? roleKey : 'junior';

  const supabaseAdmin = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName, role_key: role, department: department || null, designation: designation || null,
      brands: Array.isArray(brands) ? brands : [],
      reporting_manager: reportingManager || null, team_lead: teamLead || null,
    },
  });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  const userId = data.user ? data.user.id : null;

  // handle_new_user() (the auth.users insert trigger) always inserts the
  // profile as 'Pending Invitation' — correct for every other creation path
  // that trigger also serves, but wrong here since this account is already
  // fully provisioned (password set, email confirmed). Flip it to Active
  // right away, same as doActivate() does at the end of the old
  // click-a-link flow.
  if (userId) {
    const { error: statusErr } = await supabaseAdmin.from('profiles').update({ status: 'Active' }).eq('id', userId);
    if (statusErr) console.warn('[supabase] profile activation status update failed:', statusErr.message);
  }

  res.status(200).json({ ok: true, userId });
}
