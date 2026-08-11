// Records one row per successful sign-in so /api/admin/sessions has real
// data to list — nothing else in the app writes to login_sessions.
// Unlike /api/admin/*, this is reachable by any signed-in user (not just
// Admin), since every role's login needs to be recorded, not just Admin's.
// It still requires a valid Supabase session token — nobody can write an
// arbitrary row for another user, only their own, and only for themselves
// as resolved from that token server-side.
import { getSupabaseAdmin, clientIp } from '../_lib/requireAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    res.status(500).json({ error: 'Server is missing SUPABASE_URL / SUPABASE_SECRET_KEY env vars.' });
    return;
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) { res.status(401).json({ error: 'Missing bearer token.' }); return; }

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
  if (userErr || !userData || !userData.user) { res.status(401).json({ error: 'Invalid or expired session.' }); return; }

  const { error } = await supabaseAdmin.from('login_sessions').insert({
    user_id: userData.user.id,
    ip_address: clientIp(req),
    user_agent: req.headers['user-agent'] || '',
  });
  if (error) { res.status(500).json({ error: error.message }); return; }

  res.status(200).json({ ok: true });
}
