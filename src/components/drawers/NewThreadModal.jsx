import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function NewThreadModal({ vm }) {
  const {
    thFormOpen, thf, thFormTitle, thClose, thStop, thKindBtns, thIsChannel,
    thSetName, thMemberNote, thPeople, thSetFirst, thSave,
  } = vm;
  const f = thf || {};
  return (
    <React.Fragment>
      {Boolean(thFormOpen) && (
        <React.Fragment>
          <div onClick={thClose} style={{ position: 'fixed', inset: 0, zIndex: 170, background: 'rgba(31,8,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
            <div onClick={thStop} className="blscroll" style={{ width: '100%', maxWidth: 560, maxHeight: '100%', background: 'var(--paper)', borderRadius: 20, boxShadow: 'var(--shadow-xl)', overflowY: 'auto', animation: 'blrise .28s var(--ease-out)' }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>Messages</div>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 19, color: 'var(--ink-900)', margin: '4px 0 0' }}>{thFormTitle}</h3>
                </div>
                <button onClick={thClose} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="x" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} />
                </button>
              </div>

              <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(thKindBtns || []).map((k, i) => (
                    <button key={i} onClick={k.set} style={{ flex: 1, padding: '9px 14px', borderRadius: 10, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', border: '1px solid ' + (k.active ? 'var(--beet-700)' : 'var(--line-300)'), background: k.active ? 'var(--beet-700)' : 'var(--paper)', color: k.active ? '#fff' : 'var(--ink-700)' }}>{k.label}</button>
                  ))}
                </div>

                {Boolean(thIsChannel) && (
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5 }}>Group name <span style={{ color: 'var(--danger-600)' }}>*</span></label>
                    <input value={f.name || ''} onChange={thSetName} placeholder="e.g. npd-launch" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13, outline: 'none' }} />
                    <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 4 }}>Becomes a channel handle, e.g. #npd-launch</div>
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-700)' }}>Members</span>
                    <span style={{ fontSize: 10.5, color: 'var(--ink-500)' }}>{thMemberNote}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {(thPeople || []).map(p => (
                      <button key={p.name} onClick={p.toggle} style={cssTextToObject(p.style)}>
                        <span style={{ width: 20, height: 20, borderRadius: 99, background: 'var(--beet-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800 }}>{p.initials}</span>
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5 }}>First message (optional)</label>
                  <textarea value={f.first || ''} onChange={thSetFirst} rows="2" placeholder="Kick the conversation off…" style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13, outline: 'none', resize: 'vertical' }} />
                </div>
              </div>

              <div style={{ padding: '14px 22px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button onClick={thClose} style={{ padding: '10px 17px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Cancel</button>
                <button onClick={thSave} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}><Icon name="check" style={{ width: 14, height: 14 }} />Create</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
