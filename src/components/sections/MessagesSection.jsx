import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function MessagesSection({ vm }) {
  const {
    showMessages, msgThreads, msgNewDm, msgNewGroup, msgCurName, msgCurIcon, msgCurMembers, msgRows,
    msgCanAct, msgHasFiles, msgDraftFiles, msgAttach, msgAttachImage, msgDraft, msgOnDraft, msgSend,
  } = vm;
  return (
    <React.Fragment>
      {Boolean(showMessages) && (
        <React.Fragment>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, alignItems: 'start' }}>
            <div style={{ background: '#fff', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px 10px' }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', flex: 1 }}>Conversations</span>
                <button onClick={msgNewDm} title="New message" style={{ width: 28, height: 28, borderRadius: 9, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="pen-square" style={{ width: 13, height: 13, color: 'var(--ink-700)' }} />
                </button>
                <button onClick={msgNewGroup} title="New group" style={{ width: 28, height: 28, borderRadius: 9, border: 'none', background: '#7A1C46', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="users" style={{ width: 13, height: 13, color: '#fff' }} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {(msgThreads || []).map(t => (
                  <div key={t.id} onClick={t.open} style={cssTextToObject(t.style)}>
                    <span style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--surface-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={t.icon} style={{ width: 14, height: 14, color: 'var(--beet-700)' }} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</span>
                        <span style={{ fontSize: 10, color: 'var(--ink-400)', flexShrink: 0 }}>{t.when}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.preview}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '15px 20px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--orchid-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={msgCurIcon} style={{ width: 16, height: 16, color: 'var(--orchid-600)' }} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 16, color: 'var(--beet-700)' }}>{msgCurName}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginTop: 1 }}>{msgCurMembers}</div>
                </div>
              </div>

              <div className="blscroll" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 520, overflowY: 'auto' }}>
                {(msgRows || []).map(m => (
                  <div key={m.id} style={{ display: 'flex', gap: 11 }}>
                    <span style={cssTextToObject(`width:34px;height:34px;border-radius:99px;background:${m.avatarBg};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0`)}>{m.initials}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{m.who}</span>
                        <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-500)' }}>{m.role}</span>
                        <span style={{ fontSize: 10.5, color: 'var(--ink-400)' }}>{m.when}</span>
                      </div>
                      <div style={cssTextToObject(`background:${m.bubbleBg};border:1px solid var(--line-200);border-radius:13px;padding:11px 14px;font-size:13px;color:var(--ink-900);line-height:1.55`)}>{m.text}</div>

                      {Boolean(m.hasReceipt) && (
                        <div style={cssTextToObject(`display:flex;align-items:center;gap:4px;margin-top:4px;font-size:10.5px;font-weight:600;color:${m.receiptColor}`)}>
                          <Icon name={m.receiptIcon} style={{ width: 12, height: 12 }} />
                          {m.receiptLabel}
                        </div>
                      )}

                      {Boolean(m.hasFiles) && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 7 }}>
                          {(m.fileRows || []).map((fl, i) => (
                            <button key={i} onClick={fl.openRepo} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', border: '1px solid var(--line-300)', background: '#fff', borderRadius: 9, fontFamily: "'Space Mono'", fontSize: 10.5, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>
                              <Icon name={fl.icon} style={{ width: 11, height: 11, color: 'var(--orchid-600)' }} />{fl.name}
                            </button>
                          ))}
                        </div>
                      )}

                      {Boolean(m.hasTask) && (
                        <div onClick={m.openTask} style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginTop: 7, padding: '8px 12px', border: '1px solid var(--line-300)', borderRadius: 11, cursor: 'pointer', background: '#fff' }}>
                          <Icon name="list-checks" style={{ width: 13, height: 13, color: 'var(--orchid-600)', flexShrink: 0 }} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-900)', flex: 1, minWidth: 0 }}>{m.taskLabel}</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 700, color: 'var(--orchid-700)', flexShrink: 0 }}><Icon name="target" style={{ width: 10, height: 10 }} />{m.taskKpi}</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', flexShrink: 0 }}><Icon name="gauge" style={{ width: 10, height: 10 }} />{m.taskEffort}</span>
                          <span style={cssTextToObject(`font-size:10px;font-weight:700;padding:2px 9px;border-radius:999px;background:${m.taskBg};color:${m.taskColor};flex-shrink:0`)}>{m.taskStatus}</span>
                        </div>
                      )}

                      {Boolean(msgCanAct) && !m.linkPicker && (
                        <div style={{ display: 'flex', gap: 7, marginTop: 7 }}>
                          <button onClick={m.convert} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}><Icon name="plus" style={{ width: 11, height: 11 }} />Create task</button>
                          <button onClick={m.linkOpen} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}><Icon name="link" style={{ width: 11, height: 11 }} />Link to task</button>
                        </div>
                      )}

                      {Boolean(m.linkPicker) && (
                        <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginTop: 7 }}>
                          <select onChange={m.linkPick} style={{ flex: 1, minWidth: 0, padding: '8px 11px', border: '1px solid var(--orchid-300)', borderRadius: 10, fontSize: 12, background: '#fff' }}>
                            {(m.linkOptions || []).map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
                          </select>
                          <button onClick={m.linkCancel} style={{ padding: '8px 12px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 10, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: '14px 20px', borderTop: '1px solid var(--line-200)' }}>
                {Boolean(msgHasFiles) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 9 }}>
                    {(msgDraftFiles || []).map((fd, i) => (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 9, background: 'var(--orchid-100)', color: 'var(--orchid-700)', fontFamily: "'Space Mono'", fontSize: 10.5, fontWeight: 700 }}>
                        <Icon name={fd.icon} style={{ width: 11, height: 11 }} />{fd.name}
                        <button onClick={fd.remove} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: 'var(--orchid-700)' }}><Icon name="x" style={{ width: 11, height: 11 }} /></button>
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button onClick={msgAttach} title="Attach file" style={{ width: 38, height: 38, borderRadius: 11, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="paperclip" style={{ width: 15, height: 15, color: 'var(--ink-700)' }} /></button>
                  <button onClick={msgAttachImage} title="Attach image" style={{ width: 38, height: 38, borderRadius: 11, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="image-plus" style={{ width: 15, height: 15, color: 'var(--ink-700)' }} /></button>
                  <input value={msgDraft} onInput={msgOnDraft} placeholder="Write a message…" style={{ flex: 1, minWidth: 0, padding: '11px 14px', border: '1px solid var(--line-300)', borderRadius: 12, fontSize: 13, outline: 'none' }} />
                  <button onClick={msgSend} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 18px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}><Icon name="send" style={{ width: 14, height: 14 }} />Send</button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
