import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function SopDetailDrawer({ vm }) {
  const {
    sopDrawerOpen, sopD, sopDClose, sopDStop, sopTabs,
    sopTabOverview, sopTabExec, sopTabRel, sopTabGov, sopTabHist, sopTabCmt,
    sopOv, sopScope, sopHasScope, sopInputs, sopHasInputs, sopOutputs, sopHasOutputs,
    sopResources, sopHasResources, sopSuccess, sopHasSuccess, sopRisks, sopHasRisks,
    sopDStandards, sopHasStandards, sopTagsD, sopHasTags,
    sopStepTotal, sopDSteps, sopHasDocs, sopDocs,
    sopHasKpisD, sopKpiRowsD, sopHasRelD, sopRelRowsD, sopHasUsedBy, sopUsedBy,
    sopHasTemplates, sopDTemplates, sopHasRoles, sopDRoles,
    sopGov, sopHasVersions, sopVersions,
    sopHist, sopAudit,
    sopHasComments, sopComments, sopCmt, sopSetCmt, sopCmtStep, sopSetCmtStep, sopStepOptions, sopAddComment,
    sopNeedsAck, sopAck, sopAckList,
    sopPermLine, sopCanDownload, sopDownload, sopCanDeleteD, sopDelete,
    sopCanAuthorD, sopPublish, sopPublishLabel, sopBump, sopMarkReviewed, sopDuplicate, sopSaveAsTemplate, sopRetire, sopRetireLabel,
  } = vm;
  if (!sopD) return null;
  return (
    <React.Fragment>
      {Boolean(sopDrawerOpen) && (
        <div onClick={sopDClose} style={{ position: 'fixed', inset: 0, zIndex: 168, background: 'rgba(31,8,20,.5)', display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={sopDStop} className="blscroll" style={{ width: '100%', maxWidth: 760, height: '100%', background: 'var(--paper)', boxShadow: 'var(--shadow-xl)', overflowY: 'auto', animation: 'blrise .3s var(--ease-out)' }}>
            <div style={{ position: 'sticky', top: 0, background: 'var(--paper)', borderBottom: '1px solid var(--line-200)', padding: '18px 24px', zIndex: 3 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: 'var(--ink-400)' }}>{sopD.id}</span>
                    <span style={{ fontFamily: "'Space Mono'", fontSize: 11, fontWeight: 700, color: 'var(--orchid-700)' }}>{sopD.version}</span>
                    <span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:999px;background:${sopD.statusBg};color:${sopD.statusColor}`)}>{sopD.status}</span>
                    <span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:999px;background:${sopD.priBg};color:${sopD.priColor}`)}>{sopD.priority}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 20, color: 'var(--ink-900)', margin: '5px 0 0' }}>{sopD.title}</h3>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginTop: 3 }}>{sopD.category} · {sopD.division} · owner {sopD.owner} · updated {sopD.updated} by {sopD.updatedBy}</div>
                </div>
                <button onClick={sopDClose} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="x" style={{ width: 17, height: 17, color: 'var(--ink-700)' }} />
                </button>
              </div>
              <div style={{ display: 'inline-flex', background: 'var(--surface-50)', border: '1px solid var(--line-300)', borderRadius: 11, padding: 3, marginTop: 13, flexWrap: 'wrap' }}>
                {(sopTabs || []).map((t, i) => (
                  <button key={i} onClick={t.go} style={cssTextToObject(t.style)}>
                    <Icon name={t.icon} style={{ width: 13, height: 13 }} />{t.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '18px 24px 34px', display: 'flex', flexDirection: 'column', gap: 15 }}>
              {Boolean(sopNeedsAck) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: 'var(--warn-100)', border: '1px solid #EEDCB4', borderRadius: 13, padding: '12px 15px', flexWrap: 'wrap' }}>
                  <Icon name="alert-circle" style={{ width: 15, height: 15, color: 'var(--warn-600)', flexShrink: 0 }} />
                  <span style={{ flex: 1, minWidth: 170, fontSize: 12, fontWeight: 700, color: 'var(--warn-600)' }}>You have not acknowledged this version.</span>
                  <button onClick={sopAck} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 15px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="check" style={{ width: 13, height: 13 }} />I have read and understood
                  </button>
                </div>
              )}

              {Boolean(sopTabOverview) && (
                <React.Fragment>
                  {Boolean(sopD.hasPurpose) && (
                    <div style={{ background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 13, padding: '13px 15px' }}>
                      <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 5 }}>Purpose</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.55 }}>{sopD.purpose}</div>
                    </div>
                  )}
                  {Boolean(sopHasScope) && (
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 5 }}>Scope</div>
                      <div style={{ fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.55 }}>{sopScope}</div>
                    </div>
                  )}
                  <div style={{ border: '1px solid var(--line-200)', borderRadius: 13, overflow: 'hidden' }}>
                    {(sopOv || []).map((m, i) => (
                      <div key={i} style={{ padding: '9px 15px', borderBottom: '1px solid var(--line-200)', display: 'flex', gap: 12 }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)', width: 140, flexShrink: 0 }}>{m.k}</span>
                        <span style={{ fontSize: 12.5, color: 'var(--ink-900)', fontWeight: 600, lineHeight: 1.45 }}>{m.v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 13 }}>
                    {Boolean(sopHasInputs) && (
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--info-600)', marginBottom: 5 }}>Inputs</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {(sopInputs || []).map((x, i) => <div key={i} style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.45 }}>· {x.text}</div>)}
                        </div>
                      </div>
                    )}
                    {Boolean(sopHasOutputs) && (
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--verify-600)', marginBottom: 5 }}>Outputs</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {(sopOutputs || []).map((x, i) => <div key={i} style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.45 }}>· {x.text}</div>)}
                        </div>
                      </div>
                    )}
                    {Boolean(sopHasResources) && (
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--orchid-700)', marginBottom: 5 }}>Required resources</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {(sopResources || []).map((x, i) => <div key={i} style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.45 }}>· {x.text}</div>)}
                        </div>
                      </div>
                    )}
                  </div>
                  {Boolean(sopHasSuccess) && (
                    <div style={{ display: 'flex', gap: 9, background: 'var(--verify-100)', border: '1px solid #BFE3D0', borderRadius: 12, padding: '11px 14px' }}>
                      <Icon name="target" style={{ width: 14, height: 14, color: 'var(--verify-600)', flexShrink: 0, marginTop: 1 }} />
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--verify-600)' }}>Success criteria</span>
                        <span style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--verify-600)', lineHeight: 1.5, marginTop: 2 }}>{sopSuccess}</span>
                      </span>
                    </div>
                  )}
                  {Boolean(sopHasRisks) && (
                    <div style={{ display: 'flex', gap: 9, background: 'var(--danger-100)', border: '1px solid #F1C9CF', borderRadius: 12, padding: '11px 14px' }}>
                      <Icon name="alert-triangle" style={{ width: 14, height: 14, color: 'var(--danger-600)', flexShrink: 0, marginTop: 1 }} />
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--danger-600)' }}>Risk if skipped</span>
                        <span style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--danger-600)', lineHeight: 1.5, marginTop: 2 }}>{sopRisks}</span>
                      </span>
                    </div>
                  )}
                  {Boolean(sopHasStandards) && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 7 }}>Gold standards enforced</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {(sopDStandards || []).map((g, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid #BFE3D0', background: 'var(--verify-100)', borderRadius: 11 }}>
                            <Icon name="shield-check" style={{ width: 12, height: 12, color: 'var(--verify-600)', flexShrink: 0 }} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--verify-600)' }}>{g.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {Boolean(sopHasTags) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(sopTagsD || []).map((t, i) => (
                        <span key={i} style={{ fontSize: 10.5, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: 'var(--surface-50)', border: '1px solid var(--line-300)', color: 'var(--ink-700)' }}>{t.label}</span>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              )}

              {Boolean(sopTabExec) && (
                <React.Fragment>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)' }}>{sopStepTotal}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {(sopDSteps || []).map((st, i) => (
                      <div key={i} style={{ border: '1px solid var(--line-200)', borderRadius: 13, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', gap: 11, padding: '13px 15px' }}>
                          <span style={{ width: 25, height: 25, borderRadius: 99, background: 'var(--beet-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{st.n}</span>
                          <span style={{ minWidth: 0, flex: 1 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                              <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink-900)' }}>{st.t}</span>
                              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'var(--surface-50)', color: 'var(--ink-500)' }}>{st.dur}</span>
                            </span>
                            <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink-500)', marginTop: 3, lineHeight: 1.55 }}>{st.d}</span>
                            {Boolean(st.hasOutcome) && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5, fontSize: 11, fontWeight: 700, color: 'var(--verify-600)' }}>
                                <Icon name="check-circle-2" style={{ width: 11, height: 11 }} />Expected outcome — {st.outcome}
                              </span>
                            )}
                            {Boolean(st.needsEv) && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--info-600)' }}>Evidence required</span>
                                {(st.evList || []).map((ev, j) => (
                                  <span key={j} style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'var(--info-100)', color: 'var(--info-600)' }}>{ev.label}</span>
                                ))}
                              </span>
                            )}
                            {Boolean(st.hasNotes) && (
                              <span style={{ display: 'block', fontSize: 11, color: 'var(--orchid-700)', marginTop: 5, lineHeight: 1.45 }}>Note — {st.notes}</span>
                            )}
                          </span>
                        </div>
                        {Boolean(st.hasSubs) && (
                          <div style={{ background: 'var(--surface-50)', borderTop: '1px solid var(--line-200)', padding: '9px 15px 9px 51px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {(st.subs || []).map((sb, j) => (
                              <div key={j} style={{ display: 'flex', gap: 9 }}>
                                <span style={{ fontFamily: "'Space Mono'", fontSize: 10, fontWeight: 700, color: 'var(--orchid-700)', flexShrink: 0, marginTop: 1 }}>{sb.n}</span>
                                <span style={{ minWidth: 0 }}>
                                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-900)' }}>{sb.t}</span>
                                  <span style={{ display: 'block', fontSize: 11, color: 'var(--ink-500)', lineHeight: 1.45 }}>{sb.d}</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {Boolean(sopHasDocs) && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 7 }}>Resources &amp; attachments</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {(sopDocs || []).map((d, i) => (
                          <button key={i} onClick={d.open} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 12px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, cursor: 'pointer', textAlign: 'left' }}>
                            <Icon name={d.icon} style={{ width: 13, height: 13, color: 'var(--orchid-600)', flexShrink: 0 }} />
                            <span style={{ flex: 1, minWidth: 0, fontFamily: "'Space Mono'", fontSize: 11, fontWeight: 700, color: 'var(--ink-700)' }}>{d.name}</span>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'var(--surface-50)', color: 'var(--ink-500)' }}>{d.kind}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )}

              {Boolean(sopTabRel) && (
                <React.Fragment>
                  {Boolean(sopHasKpisD) && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 7 }}>Linked KPIs — this SOP contributes to</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {(sopKpiRowsD || []).map((k, i) => (
                          <button key={i} onClick={k.open} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 12, cursor: 'pointer', textAlign: 'left', flexWrap: 'wrap' }}>
                            <Icon name="target" style={{ width: 13, height: 13, color: 'var(--orchid-600)', flexShrink: 0 }} />
                            <span style={{ flex: 1, minWidth: 120 }}>
                              <span style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-900)' }}>{k.name}</span>
                              <span style={{ display: 'block', fontSize: 10.5, color: 'var(--ink-400)' }}>Owner {k.owner} · {k.contributing}</span>
                            </span>
                            <span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:999px;background:${k.bg};color:${k.color}`)}>{k.status}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {Boolean(sopHasRelD) && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 7 }}>Dependencies</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {(sopRelRowsD || []).map((r, i) => (
                          <button key={i} onClick={r.open} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 12, cursor: 'pointer', textAlign: 'left', flexWrap: 'wrap' }}>
                            <span style={cssTextToObject(`display:flex;align-items:center;gap:5px;font-size:10px;font-weight:800;padding:3px 9px;border-radius:999px;background:${r.bg};color:${r.color};flex-shrink:0`)}>
                              <Icon name={r.icon} style={{ width: 10, height: 10 }} />{r.rel}
                            </span>
                            <span style={{ fontFamily: "'Space Mono'", fontSize: 10.5, fontWeight: 700, color: 'var(--ink-900)' }}>{r.id}</span>
                            <span style={{ flex: 1, minWidth: 100, fontSize: 12.5, fontWeight: 600, color: 'var(--ink-900)' }}>{r.title}</span>
                            <span style={{ fontSize: 10.5, color: 'var(--ink-500)' }}>{r.status}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {Boolean(sopHasUsedBy) && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 7 }}>Referenced by</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(sopUsedBy || []).map((u, i) => (
                          <button key={i} onClick={u.open} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 999, fontSize: 11.5, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>
                            <span style={{ fontFamily: "'Space Mono'", fontSize: 10, color: 'var(--ink-900)' }}>{u.id}</span>{u.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {Boolean(sopHasTemplates) && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 7 }}>Task templates</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(sopDTemplates || []).map((t, i) => (
                          <button key={i} onClick={t.open} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, padding: '5px 11px', borderRadius: 999, background: 'var(--info-100)', border: 'none', color: 'var(--info-600)', cursor: 'pointer' }}>
                            <Icon name="layout-template" style={{ width: 11, height: 11 }} />{t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {Boolean(sopHasRoles) && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 7 }}>Roles involved</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(sopDRoles || []).map((r, i) => (
                          <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-700)' }}>{r.label}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )}

              {Boolean(sopTabGov) && (
                <React.Fragment>
                  <div style={{ border: '1px solid var(--line-200)', borderRadius: 13, overflow: 'hidden' }}>
                    {(sopGov || []).map((m, i) => (
                      <div key={i} style={{ padding: '9px 15px', borderBottom: '1px solid var(--line-200)', display: 'flex', gap: 12 }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)', width: 150, flexShrink: 0 }}>{m.k}</span>
                        <span style={{ fontSize: 12.5, color: 'var(--ink-900)', fontWeight: 600 }}>{m.v}</span>
                      </div>
                    ))}
                  </div>
                  {Boolean(sopHasVersions) && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 9 }}>Version history</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {(sopVersions || []).map((v, i) => (
                          <div key={i} style={{ display: 'flex', gap: 11 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                              <span style={{ width: 10, height: 10, borderRadius: 99, background: v.dotBg, marginTop: 5 }} />
                              <span style={{ flex: 1, width: 2, background: 'var(--line-200)' }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0, paddingBottom: 14 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                <span style={{ fontFamily: "'Space Mono'", fontSize: 12, fontWeight: 700, color: 'var(--ink-900)' }}>{v.v}</span>
                                {Boolean(v.current) && <span style={{ fontSize: 9.5, fontWeight: 800, padding: '2px 8px', borderRadius: 999, background: 'var(--orchid-100)', color: 'var(--orchid-700)' }}>CURRENT</span>}
                                <span style={{ fontSize: 10.5, color: 'var(--ink-400)' }}>{v.date} · {v.by}</span>
                              </div>
                              <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-900)', marginTop: 3, lineHeight: 1.45 }}>{v.summary}</div>
                              <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginTop: 2, lineHeight: 1.45 }}>Reason — {v.reason}</div>
                              <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 3 }}>Published {v.published} · review {v.review}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )}

              {Boolean(sopTabHist) && (
                <React.Fragment>
                  <div style={{ border: '1px solid var(--line-200)', borderRadius: 13, overflow: 'hidden' }}>
                    {(sopHist || []).map((m, i) => (
                      <div key={i} style={{ padding: '9px 15px', borderBottom: '1px solid var(--line-200)', display: 'flex', gap: 12 }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)', width: 150, flexShrink: 0 }}>{m.k}</span>
                        <span style={{ fontSize: 12.5, color: 'var(--ink-900)', fontWeight: 600 }}>{m.v}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 8 }}>Audit trail — immutable</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {(sopAudit || []).map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 13px', background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 11 }}>
                          <Icon name={a.icon} style={{ width: 13, height: 13, color: a.color, flexShrink: 0 }} />
                          <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, fontWeight: 700, color: 'var(--ink-900)' }}>{a.what}</span>
                          <span style={{ fontSize: 11, color: 'var(--ink-500)' }}>{a.who}</span>
                          <span style={{ fontSize: 10.5, color: 'var(--ink-400)' }}>{a.when}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              )}

              {Boolean(sopTabCmt) && (
                <React.Fragment>
                  {Boolean(sopHasComments) && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(sopComments || []).map((c, i) => (
                        <div key={i} style={{ background: c.bg, border: '1px solid var(--line-200)', borderRadius: 12, padding: '11px 13px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-900)' }}>{c.by}</span>
                            <span style={{ fontSize: 10.5, color: 'var(--ink-400)' }}>{c.when}</span>
                            {Boolean(c.hasStep) && <span style={{ fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'var(--paper)', border: '1px solid var(--line-300)', color: 'var(--ink-500)' }}>on: {c.step}</span>}
                          </div>
                          <div style={{ fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.5 }}>{c.text}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ border: '1px solid var(--line-300)', borderRadius: 13, padding: '13px 15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)' }}>Reference a step</span>
                      <select value={sopCmtStep} onChange={sopSetCmtStep} style={{ flex: 1, minWidth: 0, padding: '7px 10px', border: '1px solid var(--line-300)', borderRadius: 9, fontSize: 11.5, background: 'var(--paper)' }}>
                        <option value="">Whole SOP</option>
                        {(sopStepOptions || []).map((o, i) => <option key={i} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <textarea value={sopCmt} onInput={sopSetCmt} rows={2} placeholder="Ask a question or suggest a change…" style={{ width: '100%', padding: '9px 11px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, outline: 'none', resize: 'vertical' }} />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 9 }}>
                      <button onClick={sopAddComment} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 15px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                        <Icon name="send" style={{ width: 12, height: 12 }} />Post comment
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              )}

              <div style={{ borderTop: '1px solid var(--line-200)', paddingTop: 13 }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 7 }}>Acknowledged by · next review {sopD.reviewLabel}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(sopAckList || []).map((a, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: 'var(--verify-100)', color: 'var(--verify-600)' }}>
                      <span style={{ width: 18, height: 18, borderRadius: 99, background: 'var(--verify-500)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8.5, fontWeight: 800 }}>{a.initials}</span>{a.name}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', borderTop: '1px solid var(--line-200)', paddingTop: 14 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--ink-400)', flex: 1, minWidth: 160 }}>{sopPermLine}</span>
                {Boolean(sopCanDownload) && (
                  <button onClick={sopDownload} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 15px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 10, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="download" style={{ width: 13, height: 13 }} />Download
                  </button>
                )}
              </div>

              {Boolean(sopCanAuthorD) && (
                <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                  <button onClick={sopPublish} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="upload-cloud" style={{ width: 13, height: 13 }} />{sopPublishLabel}
                  </button>
                  <button onClick={sopBump} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="git-branch" style={{ width: 13, height: 13 }} />New version
                  </button>
                  <button onClick={sopMarkReviewed} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="eye" style={{ width: 13, height: 13 }} />Mark reviewed
                  </button>
                  <button onClick={sopDuplicate} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="copy" style={{ width: 13, height: 13 }} />Duplicate
                  </button>
                  <button onClick={sopSaveAsTemplate} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="layout-template" style={{ width: 13, height: 13 }} />Save as template
                  </button>
                  <button onClick={sopRetire} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="archive" style={{ width: 13, height: 13 }} />{sopRetireLabel}
                  </button>
                  {Boolean(sopCanDeleteD) && (
                    <button onClick={sopDelete} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: '1px solid #F1C9CF', background: 'var(--paper)', color: 'var(--danger-600)', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                      <Icon name="trash-2" style={{ width: 13, height: 13 }} />Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
