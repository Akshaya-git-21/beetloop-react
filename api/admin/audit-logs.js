// GET public.audit_logs — read-only, paginated, filterable by actor name
// (substring), module, and a created_at date range. No RLS policy exists
// for this table (schema_v20.sql) — it's service-role only via this
// route, and there is deliberately no write handler here: every write
// happens as a side effect of the other /api/admin/* routes via
// writeAuditLog(), never directly from the client.
import { requireAdmin } from '../_lib/requireAdmin.js';

export default async function handler(req, res) {
  const ctx = await requireAdmin(req, res);
  if (!ctx) return;
  if (req.method !== 'GET') { res.status(405).json({ error: 'Method not allowed' }); return; }
  const { supabaseAdmin } = ctx;

  const { actor, module: moduleFilter, from, to, page, pageSize } = req.query || {};
  const size = Math.min(100, Math.max(1, parseInt(pageSize, 10) || 25));
  const pageNum = Math.max(0, parseInt(page, 10) || 0);

  let query = supabaseAdmin.from('audit_logs').select('*', { count: 'exact' }).order('created_at', { ascending: false });
  if (actor) query = query.ilike('actor_name', `%${actor}%`);
  if (moduleFilter) query = query.eq('module', moduleFilter);
  if (from) query = query.gte('created_at', from);
  if (to) query = query.lte('created_at', to);
  query = query.range(pageNum * size, pageNum * size + size - 1);

  const { data, error, count } = await query;
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(200).json({ rows: data || [], total: count || 0, page: pageNum, pageSize: size });
}
