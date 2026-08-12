import React from 'react';
import Icon from '../../components/Icon.jsx';

const label = { display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5 };
const input = { width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13, outline: 'none' };
const select = { ...input, background: 'var(--paper)' };

export default function RaiseTicketModal({ vm }) {
  const {
    tktFormOpen, tf, tktClose, tktStop,
    tktIsEdit, tktFormTitle, tktSaveLabel,
    tktCatOptions, tktSetCat, tktCatHint, tktRouteNote,
    tktSetSubject, tktSetDesc,
    tktPriorityOptions, tktSetPriority, tktTaskOptions, tktSetTask,
    tktToggleTraining, tktTraining,
    tktHasFiles, tktFiles, tktAttach,
    tktSave,
  } = vm;
  const f = tf || {};
  return (
    <React.Fragment>
      {Boolean(tktFormOpen) && (
        <div onClick={tktClose} style={{ position: 'fixed', inset: 0, zIndex: 178, background: 'rgba(31,8,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div onClick={tktStop} className="blscroll" style={{ width: '100%', maxWidth: 640, maxHeight: '100%', background: 'var(--paper)', borderRadius: 20, boxShadow: 'var(--shadow-xl)', overflowY: 'auto', animation: 'blrise .28s var(--ease-out)' }}>
            <div style={{ position: 'sticky', top: 0, background: 'var(--paper)', padding: '18px 22px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, zIndex: 2 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>Help &amp; support</div>
                <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 19, color: 'var(--ink-900)', margin: '4px 0 0' }}>{tktFormTitle || 'Raise a ticket'}</h3>
              </div>
              <button onClick={tktClose} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="x" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} />
              </button>
            </div>

            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 13 }}>
              <div>
                <label style={label}>Category</label>
                <select value={f.cat || ''} onChange={tktSetCat} style={select}>
                  {(tktCatOptions || []).map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
                </select>
                <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 4 }}>{tktCatHint}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--info-100)', border: '1px solid #CBE3EC', color: 'var(--info-600)', padding: '10px 13px', borderRadius: 12, fontSize: 11.5, fontWeight: 700 }}>
                <Icon name="route" style={{ width: 14, height: 14, flexShrink: 0 }} />{tktRouteNote}
              </div>

              <div>
                <label style={label}>Subject <span style={{ color: 'var(--danger-600)' }}>*</span></label>
                <input value={f.subject || ''} onInput={tktSetSubject} placeholder="One line — what is wrong or what you need" style={input} />
              </div>

              <div>
                <label style={label}>Details <span style={{ color: 'var(--danger-600)' }}>*</span></label>
                <textarea value={f.desc || ''} onInput={tktSetDesc} rows={4} placeholder="What you did, what happened, what you expected. Include the record ID if relevant." style={{ ...input, resize: 'vertical' }} />
              </div>

              {!tktIsEdit && (
                <React.Fragment>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 12 }}>
                    <div>
                      <label style={label}>Priority</label>
                      <select value={f.priority || ''} onChange={tktSetPriority} style={select}>
                        {(tktPriorityOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={label}>Related task</label>
                      <select value={f.task || ''} onChange={tktSetTask} style={select}>
                        {(tktTaskOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <button onClick={tktToggleTraining} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 13px', borderRadius: 12, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, textAlign: 'left', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)' }}>
                    <Icon name="graduation-cap" style={{ width: 14, height: 14, color: 'var(--orchid-600)' }} />
                    I also need training on this
                    <span style={{ flex: 1 }} />
                    <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--orchid-700)' }}>{tktTraining}</span>
                  </button>
                </React.Fragment>
              )}

              <div>
                {Boolean(tktHasFiles) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 7 }}>
                    {(tktFiles || []).map((f2, i) => (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 9, background: 'var(--orchid-100)', color: 'var(--orchid-700)', fontFamily: "'Space Mono'", fontSize: 10.5, fontWeight: 700 }}>
                        {f2.name}
                        <button onClick={f2.remove} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: 'var(--orchid-700)' }}>
                          <Icon name="x" style={{ width: 10, height: 10 }} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <button onClick={tktAttach} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 13px', border: '1px dashed var(--line-300)', background: 'var(--paper)', color: 'var(--orchid-600)', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  <Icon name="paperclip" style={{ width: 13, height: 13 }} />Attach screenshot / file
                </button>
              </div>
            </div>

            <div style={{ position: 'sticky', bottom: 0, background: 'var(--paper)', padding: '14px 22px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={tktClose} style={{ padding: '10px 17px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={tktSave} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                <Icon name={tktIsEdit ? 'check' : 'send'} style={{ width: 14, height: 14 }} />{tktSaveLabel || 'Submit ticket'}
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
