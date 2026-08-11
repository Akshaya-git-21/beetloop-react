import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function TicketDetailDrawer({ vm }) {
  const {
    tktDrawerOpen, tktD, tktDClose, tktDStop,
    tktOpenTask, tktFilesD,
    tktCanTriage, tktAssignOptions, tktAssignVal, tktSetAssign,
    tktStatusOptions, tktSetStatus, tktPriorityVal, tktSetPriorityD, tktPriorityOptionsD,
    tktToggleTrainingD, tktTrainingLabel, tktToTask, tktResolve,
    tktThread, tktReply, tktSetReply, tktSend,
    tktReplyFiles, tktHasReplyFiles, tktAddReplyFile,
    tktCanClose, tktConfirm, tktReopen,
    tktCanDelete, tktDelete,
  } = vm;
  if (!tktD) return null;
  return (
    <React.Fragment>
      {Boolean(tktDrawerOpen) && (
        <div onClick={tktDClose} style={{ position: 'fixed', inset: 0, zIndex: 165, background: 'rgba(31,8,20,.5)', display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={tktDStop} className="blscroll" style={{ width: '100%', maxWidth: 660, height: '100%', background: 'var(--paper)', boxShadow: 'var(--shadow-xl)', overflowY: 'auto', animation: 'blrise .3s var(--ease-out)' }}>
            <div style={{ position: 'sticky', top: 0, background: 'var(--paper)', borderBottom: '1px solid var(--line-200)', padding: '18px 24px', zIndex: 3 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: 'var(--ink-400)' }}>{tktD.id}</span>
                    <span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:999px;background:${tktD.statusBg};color:${tktD.statusColor}`)}>{tktD.status}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 19, color: 'var(--ink-900)', margin: '5px 0 0' }}>{tktD.subject}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11.5, color: 'var(--ink-500)' }}>{tktD.cat} · {tktD.queue}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: tktD.slaColor }}>{tktD.sla}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-400)' }}>{tktD.ageLabel}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  {Boolean(tktCanDelete) && (
                    <button onClick={tktDelete} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--paper)', border: '1px solid var(--danger-300, #e5a3a3)', color: 'var(--danger-600)', borderRadius: 10, padding: '9px 13px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                      <Icon name="trash-2" style={{ width: 15, height: 15 }} />Delete
                    </button>
                  )}
                  <button onClick={tktDClose} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="x" style={{ width: 17, height: 17, color: 'var(--ink-700)' }} />
                  </button>
                </div>
              </div>
            </div>

            <div style={{ padding: '18px 24px 34px', display: 'flex', flexDirection: 'column', gap: 15 }}>
              <div style={{ border: '1px solid var(--line-200)', borderRadius: 13, padding: '13px 15px', background: 'var(--surface-50)' }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 6 }}>Raised by {tktD.by} · {tktD.byRole} · {tktD.created}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.55 }}>{tktD.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 9, flexWrap: 'wrap' }}>
                  {Boolean(tktD.hasTask) && (
                    <button onClick={tktOpenTask} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 9, fontFamily: "'Space Mono'", fontSize: 10.5, fontWeight: 700, color: 'var(--info-600)', cursor: 'pointer' }}>
                      <Icon name="list-checks" style={{ width: 11, height: 11 }} />{tktD.task}
                    </button>
                  )}
                  {Boolean(tktD.training) && <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 9px', borderRadius: 6, background: 'var(--orchid-100)', color: 'var(--orchid-700)' }}>TRAINING NEEDED</span>}
                  {(tktFilesD || []).map((f, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', border: '1px solid var(--line-300)', borderRadius: 8, background: 'var(--paper)', fontFamily: "'Space Mono'", fontSize: 10, fontWeight: 700, color: 'var(--ink-700)' }}>
                      <Icon name="paperclip" style={{ width: 10, height: 10, color: 'var(--orchid-600)' }} />{f.name}
                    </span>
                  ))}
                </div>
              </div>

              {Boolean(tktCanTriage) && (
                <div style={{ border: '1px solid var(--line-300)', borderRadius: 14, padding: '14px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 11 }}>Triage &amp; assign</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5 }}>Assign to</label>
                      <select value={tktAssignVal} onChange={tktSetAssign} style={{ width: '100%', padding: '9px 11px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, background: 'var(--paper)' }}>
                        {(tktAssignOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5 }}>Status</label>
                      <select value={tktD.status} onChange={tktSetStatus} style={{ width: '100%', padding: '9px 11px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, background: 'var(--paper)' }}>
                        {(tktStatusOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5 }}>Priority</label>
                      <select value={tktPriorityVal} onChange={tktSetPriorityD} style={{ width: '100%', padding: '9px 11px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, background: 'var(--paper)' }}>
                        {(tktPriorityOptionsD || []).map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <button onClick={tktToggleTrainingD} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                        <Icon name="graduation-cap" style={{ width: 13, height: 13 }} />{tktTrainingLabel}
                      </button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 9, marginTop: 12, flexWrap: 'wrap' }}>
                    <button onClick={tktToTask} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 15px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 10, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                      <Icon name="list-plus" style={{ width: 13, height: 13 }} />Convert to task
                    </button>
                    <button onClick={tktResolve} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 15px', border: '1px solid #BFE3D0', background: 'var(--paper)', color: 'var(--verify-600)', borderRadius: 10, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                      <Icon name="check-circle-2" style={{ width: 13, height: 13 }} />Mark resolved
                    </button>
                  </div>
                </div>
              )}

              <div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 9 }}>Conversation</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {(tktThread || []).map((m, i) => (
                    <div key={i} style={{ background: m.bg, border: '1px solid var(--line-200)', borderRadius: 12, padding: '11px 13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-900)' }}>{m.who}</span>
                        <span style={{ fontSize: 10.5, color: 'var(--ink-400)' }}>{m.when}</span>
                      </div>
                      <div style={{ fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.5 }}>{m.text}</div>
                      {Boolean(m.hasFiles) && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                          {(m.files || []).map((f, fi) => (
                            <button key={fi} onClick={f.open} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, padding: '4px 9px', borderRadius: 999, background: 'var(--paper)', border: '1px solid var(--line-300)', color: 'var(--ink-700)', cursor: 'pointer' }}>
                              <Icon name="paperclip" style={{ width: 10, height: 10 }} />{f.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {Boolean(tktHasReplyFiles) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                    {(tktReplyFiles || []).map((f, fi) => (
                      <span key={fi} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, padding: '4px 9px', borderRadius: 999, background: 'var(--orchid-100)', border: '1px solid var(--orchid-200)', color: 'var(--orchid-700)' }}>
                        <Icon name="paperclip" style={{ width: 10, height: 10 }} />{f.name}
                        <button onClick={f.remove} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: 'var(--orchid-700)' }}>
                          <Icon name="x" style={{ width: 10, height: 10 }} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 9, marginTop: 11 }}>
                  <button onClick={tktAddReplyFile} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, flexShrink: 0, border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--orchid-600)', borderRadius: 11, cursor: 'pointer' }} title="Attach a file">
                    <Icon name="paperclip" style={{ width: 15, height: 15 }} />
                  </button>
                  <input value={tktReply} onInput={tktSetReply} placeholder="Add a reply…" style={{ flex: 1, minWidth: 0, padding: '10px 13px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, outline: 'none' }} />
                  <button onClick={tktSend} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 15px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
                    <Icon name="send" style={{ width: 13, height: 13 }} />Send
                  </button>
                </div>
              </div>

              {Boolean(tktCanClose) && (
                <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', borderTop: '1px solid var(--line-200)', paddingTop: 13 }}>
                  <button onClick={tktConfirm} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: 'none', background: 'var(--verify-500)', color: '#fff', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="check" style={{ width: 13, height: 13 }} />Confirm fixed &amp; close
                  </button>
                  <button onClick={tktReopen} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="rotate-ccw" style={{ width: 13, height: 13 }} />Not fixed — reopen
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
