// Vercel serverless function. Runs server-side only — the Supabase secret
// key never reaches the browser. Set SUPABASE_URL and SUPABASE_SECRET_KEY
// as environment variables in the Vercel project settings (not VITE_-prefixed,
// so they are never bundled into client code).
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

  const { email, fullName, roleKey, department, designation } = req.body || {};
  if (!email || !fullName) {
    res.status(400).json({ error: 'email and fullName are required.' });
    return;
  }
  const role = ROLE_KEYS.includes(roleKey) ? roleKey : 'junior';

  const supabaseAdmin = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName, role_key: role, department: department || null, designation: designation || null },
  });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ ok: true, userId: data.user ? data.user.id : null });
}
