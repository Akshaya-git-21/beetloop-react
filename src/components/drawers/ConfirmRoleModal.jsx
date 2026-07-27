import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function ConfirmRoleModal({ vm }) {
  const { showRoleConfirm, roleConfirmLabel, roleConfirmSummary, roleConfirmCancel, roleConfirmOk, stop } = vm;
  return (
    <React.Fragment>
      {Boolean(showRoleConfirm) && (
        <React.Fragment>
          <div onClick={roleConfirmCancel} style={{ position: 'fixed', inset: 0, background: 'rgba(31,8,20,.5)', backdropFilter: 'blur(3px)', zIndex: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
            <div onClick={stop} className="blscroll" style={{ width: '100%', maxWidth: 480, maxHeight: '85vh', overflowY: 'auto', background: '#fff', borderRadius: 22, boxShadow: 'var(--shadow-xl)', animation: 'blrise .3s var(--ease-out)' }}>
              <div style={{ padding: '22px 26px 4px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--warn-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="shield-alert" style={{ width: 19, height: 19, color: 'var(--warn-600)' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 18, color: 'var(--beet-700)', margin: 0 }}>Confirm {roleConfirmLabel} access</h3>
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-500)' }}>This role grants broad access across the platform. Review what it unlocks before continuing.</p>
                </div>
              </div>

              <div style={{ padding: '16px 26px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(roleConfirmSummary || []).map(s => (
                  <div key={s.module} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-700)' }}>{s.module}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: 'var(--verify-100)', color: 'var(--verify-600)' }}>{s.level}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: '16px 26px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10, position: 'sticky', bottom: 0, background: '#fff', borderRadius: '0 0 22px 22px' }}>
                <button onClick={roleConfirmCancel} style={{ padding: '10px 18px', border: '1px solid var(--line-300)', background: '#fff', borderRadius: 11, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', color: 'var(--ink-700)' }}>Cancel</button>
                <button onClick={roleConfirmOk} style={{ padding: '10px 20px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>Confirm & apply</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
