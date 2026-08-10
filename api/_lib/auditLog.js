// Shared audit-log writer for every /api/admin/* route that changes
// something. Fire-and-forget is NOT used here on purpose — callers await
// this so a failed audit write can still be surfaced, since "the change
// saved but nobody can prove who made it" defeats the point of an audit
// trail.
export async function writeAuditLog(supabaseAdmin, { actorId, actorName, module, settingKey, previousValue, newValue, ipAddress, userAgent }) {
  const { error } = await supabaseAdmin.from('audit_logs').insert({
    actor_id: actorId, actor_name: actorName, module, setting_key: settingKey || null,
    previous_value: previousValue ?? null, new_value: newValue ?? null,
    ip_address: ipAddress || null, user_agent: userAgent || null,
  });
  if (error) console.warn('[audit_logs] insert failed:', error.message);
}
