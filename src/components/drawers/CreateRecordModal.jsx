import React from 'react';
import Icon from '../../components/Icon.jsx';

const STATUS_OPTIONS = ['On track', 'In progress', 'At risk', 'Planned', 'Live', 'Draft', 'Scheduled'];

export default function CreateRecordModal({ vm }) {
  const { showRecordModal, recordKind, recordForm, recordSetName, recordSetType, recordSetOwner, recordSetStatus,
    recordIsCustom, recordSetDesc, recordSetBrand, recordBrandOptions, recordSetLink, recordSetQc, recordQcOptions,
    recordAttachments, recordAttachOpen,
    closeRecordModal, saveRecord, deleteRecord, recordEditKey, recordOwnerOptions, recordLabel, stop } = vm;
  const title = recordLabel || (recordKind === 'campaigns' ? 'Campaign' : 'Project');
  const ownerLabel = recordIsCustom ? 'Owner / Assignee' : (recordKind === 'campaigns' ? 'Phase / owner' : 'Owner');
  const isProjectOwner = recordKind !== 'campaigns';
  const isEdit = recordEditKey != null;
  return (
    <React.Fragment>
      {Boolean(showRecordModal) && (
        <React.Fragment>
          <div onClick={closeRecordModal} style={{ position: 'fixed', inset: 0, background: 'rgba(31,8,20,.5)', backdropFilter: 'blur(3px)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
            <div onClick={stop} className="blscroll" style={{ width: '100%', maxWidth: 520, maxHeight: '88vh', overflowY: 'auto', background: 'var(--paper)', borderRadius: 22, boxShadow: 'var(--shadow-xl)', animation: 'blrise .3s var(--ease-out)' }}>
              <div style={{ padding: '22px 26px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'var(--paper)', borderRadius: '22px 22px 0 0' }}>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>{title}s</div>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 20, color: 'var(--ink-900)', margin: '4px 0 0' }}>{isEdit ? `Edit ${title.toLowerCase()}` : `New ${title.toLowerCase()}`}</h3>
                </div>
                <button onClick={closeRecordModal} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="x" style={{ width: 17, height: 17, color: 'var(--ink-700)' }} />
                </button>
              </div>

              <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>{title} name *</label>
                  <input value={recordForm.name} onChange={recordSetName} placeholder={`e.g. ${title === 'Campaign' ? 'Q4 SEO push' : 'Client website rebuild'}`} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' }} />
                </div>
                {recordIsCustom ? (
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>{title} Description *</label>
                    <textarea value={recordForm.desc || ''} onChange={recordSetDesc} rows={3} placeholder="What is this and why does it matter?" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                ) : (
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Type</label>
                    <input value={recordForm.type} onChange={recordSetType} placeholder={title === 'Campaign' ? 'e.g. SEO Campaign' : 'e.g. SEO · Retainer'} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' }} />
                  </div>
                )}
                {recordIsCustom && (
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Brand</label>
                    <select value={recordForm.brand || ''} onChange={recordSetBrand} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: 'var(--paper)' }}>
                      <option value="">— None —</option>
                      {(recordBrandOptions || []).map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                )}
                {recordIsCustom && (
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Link <span style={{ fontWeight: 400, color: 'var(--ink-400)' }}>(if any)</span></label>
                    <input value={recordForm.link || ''} onChange={recordSetLink} placeholder="https://…" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' }} />
                  </div>
                )}
                {recordIsCustom && (
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Attachment</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {(recordAttachments || []).map((a, ai) => (
                        <div key={ai} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 9, padding: '6px 10px' }}>
                          <Icon name="paperclip" style={{ width: 13, height: 13, color: 'var(--ink-400)', flexShrink: 0 }} />
                          <span style={{ fontSize: 12.5, color: 'var(--ink-700)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</span>
                          <button onClick={a.remove} style={{ background: 'none', border: 'none', color: 'var(--danger-500)', cursor: 'pointer', padding: 2 }}><Icon name="x" style={{ width: 13, height: 13 }} /></button>
                        </div>
                      ))}
                      <button onClick={recordAttachOpen} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', border: '1px dashed var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 9, fontSize: 12.5, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>
                        <Icon name="paperclip" style={{ width: 13, height: 13 }} />
                        Attach file
                      </button>
                    </div>
                  </div>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>{ownerLabel}</label>
                  {isProjectOwner ? (
                    <select value={recordForm.owner} onChange={recordSetOwner} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: 'var(--paper)' }}>
                      <option value="">Unassigned</option>
                      {(recordOwnerOptions || []).map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input value={recordForm.owner} onChange={recordSetOwner} placeholder="e.g. Live" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' }} />
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>Status</label>
                  <select value={recordForm.status} onChange={recordSetStatus} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: 'var(--paper)' }}>
                    {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                {recordIsCustom && (
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>QC Review</label>
                    <select value={recordForm.qc || 'Pending'} onChange={recordSetQc} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: 'var(--paper)' }}>
                      {(recordQcOptions || []).map(q => <option key={q}>{q}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div style={{ padding: '16px 26px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, position: 'sticky', bottom: 0, background: 'var(--paper)', borderRadius: '0 0 22px 22px' }}>
                {isEdit ? (
                  <button onClick={deleteRecord} style={{ padding: '10px 16px', border: '1px solid var(--danger-300, #e5a3a3)', background: 'var(--paper)', color: 'var(--danger-600)', borderRadius: 11, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                ) : <span />}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={closeRecordModal} style={{ padding: '10px 18px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', color: 'var(--ink-700)' }}>Cancel</button>
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
