// GET public.login_sessions (joined with profiles for display) and POST
// to revoke a user's sessions. Supabase's admin API has no concept of
// killing one specific concurrent device while leaving others alive —
// signOut(userId,'global') invalidates ALL of that user's refresh tokens.
// So "revoke" here really means "revoke every session for this user," and
// the UI copy calling this must say exactly that, not imply per-device
// control that doesn't exist.
import { requireAdmin, clientIp } from '../_lib/requireAdmin.js';
import { writeAuditLog } from '../_lib/auditLog.js';

export default async function handler(req, res) {
  const ctx = await requireAdmin(req, res);
  if (!ctx) return;
  const { user, profile, supabaseAdmin } = ctx;

  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('login_sessions')
      .select('*, profiles:user_id(id, full_name, email, role_key)')
      .is('revoked_at', null)
      .order('last_seen_at', { ascending: false })
      .limit(200);
    if (error) { res.status(500).json({ error: error.message }); return; }
    res.status(200).json({ rows: data || [] });
    return;
  }

  if (req.method === 'POST') {
    const { userId } = req.body || {};
    if (!userId) { res.status(400).json({ error: 'userId is required.' }); return; }

    const { error: signOutErr } = await supabaseAdmin.auth.admin.signOut(userId, 'global');
    if (signOutErr) { res.status(500).json({ error: signOutErr.message }); return; }

    await supabaseAdmin.from('login_sessions').update({ revoked_at: new Date().toISOString() }).eq('user_id', userId).is('revoked_at', null);

    await writeAuditLog(supabaseAdmin, {
      actorId: user.id, actorName: profile.full_name || user.email, module: 'login_sessions', settingKey: userId,
      previousValue: null, newValue: { action: 'revoke_all_sessions', userId },
      ipAddress: clientIp(req), userAgent: req.headers['user-agent'],
    });

    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
