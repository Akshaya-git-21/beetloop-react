import React from 'react';
import Icon from '../../components/Icon.jsx';

const ROLE_OPTIONS = [
  ['admin', 'Admin'], ['ceo', 'CEO'], ['coo', 'COO'], ['manager', 'Manager'],
  ['team_lead', 'Team Lead'], ['senior', 'Senior Executive'], ['junior', 'Junior Executive'], ['qc', 'QC Reviewer'],
];
const DEPT_OPTIONS = ['SEO', 'Content', 'SMM', 'Web Development', 'Design', 'Analytics', 'Leadership', 'Operations', 'Marketing', 'Quality', 'Platform'];
const STATUS_OPTIONS = ['Active', 'Pending Invitation', 'Suspended'];

export default function ManageUserModal({ vm }) {
  const { showManageUserModal, manageUserForm, closeManageUserModal, saveManageUser,
    manageUserSetName, manageUserSetDept, manageUserSetDesignation, manageUserSetRole, manageUserSetStatus, stop } = vm;
  const f = manageUserForm || {};
  return (
    <React.Fragment>
      {Boolean(showManageUserModal) && (
        <React.Fragment>
          <div onClick={closeManageUserModal} style={{ position: 'fixed', inset: 0, background: 'rgba(31,8,20,.5)', backdropFilter: 'blur(3px)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
            <div onClick={stop} className="blscroll" style={{ width: '100%', maxWidth: 560, maxHeight: '88vh', overflowY: 'auto', background: '#fff', borderRadius: 22, boxShadow: 'var(--shadow-xl)', animation: 'blrise .3s var(--ease-out)' }}>
              <div style={{ padding: '22px 26px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', borderRadius: '22px 22px 0 0' }}>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>User Master</div>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 20, color: 'var(--beet-700)', margin: '4px 0 0' }}>Manage user</h3>
                </div>
                <button onClick={closeManageUserModal} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="x" style={{ width: 17, height: 17, color: 'var(--ink-700)' }} />
                </button>
              </div>

              <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {f.email && (
                  <div style={{ fontSize: 12.5, color: 'var(--ink-500)' }}>{f.email}</div>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Full name</label>
                  <input value={f.name || ''} onChange={manageUserSetName} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Department</label>
                    <select value={f.dept || 'SEO'} onChange={manageUserSetDept} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: '#fff' }}>
                      {DEPT_OPTIONS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Designation</label>
                    <input value={f.designation || ''} onChange={manageUserSetDesignation} placeholder="e.g. Senior SEO Executive" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' }} />
                  </div>
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-400)', margin: '4px 0 -2px' }}>Security & role</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Role</label>
                    <select value={f.roleKey || 'junior'} onChange={manageUserSetRole} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: '#fff' }}>
                      {ROLE_OPTIONS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Account status</label>
                    <select value={f.status || 'Active'} onChange={manageUserSetStatus} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: '#fff' }}>
                      {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                {!f.id && (
                  <div style={{ fontSize: 12, color: 'var(--warn-600)', background: 'var(--warn-100)', padding: '9px 12px', borderRadius: 10 }}>
                    This is a demo record (not a real account) — changes apply locally only, nothing is saved to the database.
                  </div>
                )}
              </div>

              <div style={{ padding: '16px 26px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10, position: 'sticky', bottom: 0, background: '#fff', borderRadius: '0 0 22px 22px' }}>
                <button onClick={closeManageUserModal} style={{ padding: '10px 18px', border: '1px solid var(--line-300)', background: '#fff', borderRadius: 11, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', color: 'var(--ink-700)' }}>Cancel</button>
                <button onClick={saveManageUser} style={{ padding: '10px 18px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>Save changes</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
