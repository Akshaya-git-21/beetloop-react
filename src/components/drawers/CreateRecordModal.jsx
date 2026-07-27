import React from 'react';
import Icon from '../../components/Icon.jsx';

const STATUS_OPTIONS = ['On track', 'In progress', 'At risk', 'Planned', 'Live', 'Draft', 'Scheduled'];

export default function CreateRecordModal({ vm }) {
  const { showRecordModal, recordKind, recordForm, recordSetName, recordSetType, recordSetOwner, recordSetStatus,
    closeRecordModal, saveRecord, deleteRecord, recordEditKey, recordOwnerOptions, stop } = vm;
  const title = recordKind === 'campaigns' ? 'Campaign' : 'Project';
  const ownerLabel = recordKind === 'campaigns' ? 'Phase / owner' : 'Owner';
  const isProjectOwner = recordKind !== 'campaigns';
  const isEdit = recordEditKey != null;
  return (
    <React.Fragment>
      {Boolean(showRecordModal) && (
        <React.Fragment>
          <div onClick={closeRecordModal} style={{ position: 'fixed', inset: 0, background: 'rgba(31,8,20,.5)', backdropFilter: 'blur(3px)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
            <div onClick={stop} className="blscroll" style={{ width: '100%', maxWidth: 520, maxHeight: '88vh', overflowY: 'auto', background: '#fff', borderRadius: 22, boxShadow: 'var(--shadow-xl)', animation: 'blrise .3s var(--ease-out)' }}>
              <div style={{ padding: '22px 26px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', borderRadius: '22px 22px 0 0' }}>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>{title === 'Campaign' ? 'Campaigns' : 'Projects'}</div>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 20, color: 'var(--beet-700)', margin: '4px 0 0' }}>{isEdit ? `Edit ${title.toLowerCase()}` : `New ${title.toLowerCase()}`}</h3>
                </div>
                <button onClick={closeRecordModal} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="x" style={{ width: 17, height: 17, color: 'var(--ink-700)' }} />
                </button>
              </div>

              <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>{title} name *</label>
                  <input value={recordForm.name} onChange={recordSetName} placeholder={`e.g. ${title === 'Campaign' ? 'Q4 SEO push' : 'Client website rebuild'}`} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Type</label>
                  <input value={recordForm.type} onChange={recordSetType} placeholder={title === 'Campaign' ? 'e.g. SEO Campaign' : 'e.g. SEO · Retainer'} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>{ownerLabel}</label>
                  {isProjectOwner ? (
                    <select value={recordForm.owner} onChange={recordSetOwner} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: '#fff' }}>
                      <option value="">Unassigned</option>
                      {(recordOwnerOptions || []).map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input value={recordForm.owner} onChange={recordSetOwner} placeholder="e.g. Live" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' }} />
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Status</label>
                  <select value={recordForm.status} onChange={recordSetStatus} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: '#fff' }}>
                    {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ padding: '16px 26px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, position: 'sticky', bottom: 0, background: '#fff', borderRadius: '0 0 22px 22px' }}>
                {isEdit ? (
                  <button onClick={deleteRecord} style={{ padding: '10px 16px', border: '1px solid var(--danger-300, #e5a3a3)', background: '#fff', color: 'var(--danger-600)', borderRadius: 11, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                ) : <span />}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={closeRecordModal} style={{ padding: '10px 18px', border: '1px solid var(--line-300)', background: '#fff', borderRadius: 11, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', color: 'var(--ink-700)' }}>Cancel</button>
                  <button onClick={saveRecord} style={{ padding: '10px 18px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>{isEdit ? 'Save changes' : `Create ${title.toLowerCase()}`}</button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
