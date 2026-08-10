// GET/PUT public.security_settings (key='default'). No RLS policy exists
// for this table at all (see schema_v20.sql) — it's only ever reachable
// through this route, which is why it can hold real policy (password
// rules, IP allow/deny, 2FA requirement) without that policy itself being
// readable by every signed-in user via the anon key.
import { requireAdmin, clientIp } from '../_lib/requireAdmin.js';
import { writeAuditLog } from '../_lib/auditLog.js';

export default async function handler(req, res) {
  const ctx = await requireAdmin(req, res);
  if (!ctx) return;
  const { user, profile, supabaseAdmin } = ctx;

  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin.from('security_settings').select('*').eq('key', 'default').maybeSingle();
    if (error) { res.status(500).json({ error: error.message }); return; }
    res.status(200).json({ value: (data && data.value) || {} });
    return;
  }

  if (req.method === 'PUT') {
    const { value } = req.body || {};
    if (!value || typeof value !== 'object') {
      res.status(400).json({ error: 'value (object) is required.' });
      return;
    }

    const { data: existing } = await supabaseAdmin.from('security_settings').select('value').eq('key', 'default').maybeSingle();

    const { error } = await supabaseAdmin.from('security_settings').upsert({
      key: 'default', value, updated_by: user.id, updated_at: new Date().toISOString(),
    });
    if (error) { res.status(500).json({ error: error.message }); return; }

    await writeAuditLog(supabaseAdmin, {
      actorId: user.id, actorName: profile.full_name || user.email, module: 'security_settings', settingKey: 'default',
      previousValue: (existing && existing.value) || null, newValue: value,
      ipAddress: clientIp(req), userAgent: req.headers['user-agent'],
    });

    res.status(200).json({ ok: true, value });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
