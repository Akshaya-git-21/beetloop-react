// Shared auth/authorization gate for every /api/admin/* route. Not a route
// itself — the leading underscore keeps Vercel from deploying this folder
// as a function.
//
// Verifies the caller is a real, currently-signed-in Supabase user (via
// the bearer token they send) AND that their profiles.role_key is 'admin'
// — this is the actual "Super Admin only" enforcement point. RLS alone
// can't do this for these tables since they carry no policies for the
// authenticated role at all; every /api/admin/* handler must call this
// first and stop if it returns null.
import { createClient } from '@supabase/supabase-js';

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) return null;
  return createClient(url, secretKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.socket && req.socket.remoteAddress || '';
}

// IP allow/deny is enforced here, at the admin API surface — not
// app-wide. A client-side SPA has no way to reliably block its own
// requests before they leave the browser, so true whole-app IP gating
// would need an edge/reverse-proxy layer in front of everything (e.g.
// Vercel Edge Middleware), which is a separate, larger change. This is
// the honest, achievable version: every /api/admin/* call checks the
// caller's IP against security_settings before doing anything else.
async function checkIpAllowed(req, supabaseAdmin) {
  const { data } = await supabaseAdmin.from('security_settings').select('value').eq('key', 'default').maybeSingle();
  const rules = (data && data.value && data.value.ipRules) || {};
  const list = Array.isArray(rules.list) ? rules.list.filter(Boolean) : [];
  if (!rules.mode || rules.mode === 'off' || !list.length) return true;
  const ip = clientIp(req);
  const listed = list.some((entry) => ip === entry || (entry.includes('/') ? false : ip.startsWith(entry)));
  if (rules.mode === 'whitelist') return listed;
  if (rules.mode === 'blacklist') return !listed;
  return true;
}

// Returns { user, profile, supabaseAdmin } on success, or null after
// already writing the error response.
export async function requireAdmin(req, res) {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    res.status(500).json({ error: 'Server is missing SUPABASE_URL / SUPABASE_SECRET_KEY env vars.' });
    return null;
  }

  const ipOk = await checkIpAllowed(req, supabaseAdmin);
  if (!ipOk) {
    res.status(403).json({ error: 'Access blocked by IP policy.' });
    return null;
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) {
    res.status(401).json({ error: 'Missing bearer token.' });
    return null;
  }

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
  if (userErr || !userData || !userData.user) {
    res.status(401).json({ error: 'Invalid or expired session.' });
    return null;
  }

  const { data: profile, error: profileErr } = await supabaseAdmin
    .from('profiles').select('*').eq('id', userData.user.id).single();
  if (profileErr || !profile) {
    res.status(403).json({ error: 'No profile on file for this account.' });
    return null;
  }
  if (profile.role_key !== 'admin') {
    res.status(403).json({ error: 'Admin Settings is restricted to Super Admin (Admin role) accounts.' });
    return null;
  }

  return { user: userData.user, profile, supabaseAdmin };
}
