// Records one row in public.login_sessions right after a successful sign-in
// — called by ANY authenticated user (not admin-gated, unlike everything
// under api/admin/*), since every user's own login needs to show up for
// Admin's "Active Session Management" view, not just Admin's own. Only
// requires a valid bearer token; writes only ever a row tied to that same
// caller's own user id, never an arbitrary one from the request body.
import { getSupabaseAdmin, clientIp } from './_lib/requireAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) { res.status(500).json({ error: 'Server is missing SUPABASE_URL / SUPABASE_SECRET_KEY env vars.' }); return; }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) { res.status(401).json({ error: 'Missing bearer token.' }); return; }

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
  if (userErr || !userData || !userData.user) { res.status(401).json({ error: 'Invalid or expired session.' }); return; }

  const { error } = await supabaseAdmin.from('login_sessions').insert({
    user_id: userData.user.id, ip_address: clientIp(req), user_agent: req.headers['user-agent'] || '',
  });
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(200).json({ ok: true });
}
