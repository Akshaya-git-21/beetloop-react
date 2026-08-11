import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function CampaignDetailDrawer({ vm }) {
  const {
    cmpDrawerOpen, cmpD, cmpClose, cmpStop,
    cmpTabOverview, cmpTabAudience, cmpTabChain, cmpTabModel, cmpTabTeam,
    cmpSegOverview, cmpSegAudience, cmpSegChain, cmpSegModel, cmpSegTeam,
    cmpGoOverview, cmpGoAudience, cmpGoChain, cmpGoModel, cmpGoTeam,
    cmpModel, cmpMeta, cmpAudienceMeta, cmpKpiRows, cmpEffortRows,
    cmpTeamRows, cmpTaskLabel, cmpTaskPctW, cmpGoTasks, cmpGoEffort, cmpGoOkr,
  } = vm;
  return (
    <React.Fragment>
      {Boolean(cmpDrawerOpen) && (
        <React.Fragment>
          <div onClick={cmpClose} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(31,8,20,.5)', display: 'flex', justifyContent: 'flex-end' }}>
            <div onClick={cmpStop} className="blscroll" style={{ width: '100%', maxWidth: 840, height: '100%', background: 'var(--paper)', boxShadow: 'var(--shadow-xl)', overflowY: 'auto', animation: 'blrise .3s var(--ease-out)' }}>
              <div style={{ position: 'sticky', top: 0, background: 'var(--paper)', borderBottom: '1px solid var(--line-200)', padding: '18px 24px', zIndex: 3 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: "'Space Mono'", fontSize: 11.5, color: 'var(--ink-400)' }}>{cmpD.id}</span>
                      <span style={cssTextToObject(`font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:${cmpD.statusBg};color:${cmpD.statusColor}`)}>{cmpD.status}</span>
                      <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 9px', borderRadius: 999, background: 'var(--orchid-100)', color: 'var(--orchid-700)' }}>{cmpD.type}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 20, color: 'var(--ink-900)', margin: '6px 0 0' }}>{cmpD.name}</h3>
                    <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 4 }}>{cmpD.goal}</div>
                  </div>
                  <button onClick={cmpClose} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="x" style={{ width: 17, height: 17, color: 'var(--ink-700)' }} />
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)' }}>KPI achievement</span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-900)' }}>{cmpD.progress}</span>
                    </div>
                    <div style={{ height: 7, borderRadius: 99, background: 'var(--line-200)', overflow: 'hidden' }}><div style={cssTextToObject(`height:100%;border-radius:99px;width:${cmpD.progressW};background:${cmpD.progressColor}`)} /></div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)' }}>Task completion</span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-900)' }}>{cmpD.taskLabel}</span>
                    </div>
                    <div style={{ height: 7, borderRadius: 99, background: 'var(--line-200)', overflow: 'hidden' }}><div style={cssTextToObject(`height:100%;border-radius:99px;width:${cmpTaskPctW};background:var(--info-500)`)} /></div>
                  </div>
                </div>
                <div style={{ display: 'inline-flex', background: 'var(--surface-50)', border: '1px solid var(--line-300)', borderRadius: 12, padding: 3, marginTop: 14 }}>
                  <button onClick={cmpGoOverview} style={cssTextToObject(cmpSegOverview)}><Icon name="info" style={{ width: 14, height: 14 }} />Overview</button>
                  <button onClick={cmpGoAudience} style={cssTextToObject(cmpSegAudience)}><Icon name="users" style={{ width: 14, height: 14 }} />Audience</button>
                  <button onClick={cmpGoChain} style={cssTextToObject(cmpSegChain)}><Icon name="workflow" style={{ width: 14, height: 14 }} />KPI → Effort → Tasks</button>
                  <button onClick={cmpGoModel} style={cssTextToObject(cmpSegModel)}><Icon name="calculator" style={{ width: 14, height: 14 }} />Success model</button>
                  <button onClick={cmpGoTeam} style={cssTextToObject(cmpSegTeam)}><Icon name="user-check" style={{ width: 14, height: 14 }} />Team</button>
                </div>
              </div>

              <div style={{ padding: '20px 24px 32px' }}>
                {Boolean(cmpTabOverview) && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--line-200)', borderRadius: 14, overflow: 'hidden' }}>
                    {(cmpMeta || []).map((m, i) => (
                      <div key={i} style={{ padding: '11px 15px', borderBottom: '1px solid var(--line-200)', display: 'flex', gap: 10 }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)', width: 130, flexShrink: 0 }}>{m[0]}</span>
                        <span style={{ fontSize: 12.5, color: 'var(--ink-900)', fontWeight: 600 }}>{m[1]}</span>
                      </div>
                    ))}
                  </div>
                )}

                {Boolean(cmpTabAudience) && (
                  <div style={{ border: '1px solid var(--line-200)', borderRadius: 14, overflow: 'hidden' }}>
                    {(cmpAudienceMeta || []).map((m, i) => (
                      <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)', display: 'flex', gap: 12 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-500)', width: 190, flexShrink: 0 }}>{m[0]}</span>
                        <span style={{ fontSize: 13, color: 'var(--ink-900)', fontWeight: 600 }}>{m[1]}</span>
                      </div>
                    ))}
                  </div>
                )}

                {Boolean(cmpTabChain) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                        <span style={{ width: 22, height: 22, borderRadius: 7, background: 'var(--beet-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>1</span>
                        <span style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 14, color: 'var(--ink-900)' }}>Linked KPIs — what success is measured by</span>
                      </div>
                      <div style={{ border: '1px solid var(--line-200)', borderRadius: 14, overflow: 'hidden' }}>
                        {(cmpKpiRows || []).map((k, i) => (
                          <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)', flex: 1 }}>{k.kpi}</span>
                              <span style={{ fontFamily: "'Space Mono'", fontSize: 11.5, color: 'var(--ink-500)' }}>{k.current} / {k.target} {k.unit}</span>
                              <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--ink-900)', width: 44, textAlign: 'right' }}>{k.pct}</span>
                            </div>
                            <div style={{ height: 5, borderRadius: 99, background: 'var(--line-200)', overflow: 'hidden' }}><div style={cssTextToObject(`height:100%;border-radius:99px;width:${k.pctW};background:${k.pctColor}`)} /></div>
                            <button onClick={k.openOkr} style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 7, padding: 0, border: 'none', background: 'none', fontSize: 11, fontWeight: 700, color: 'var(--orchid-600)', cursor: 'pointer' }}>
                              <Icon name="link" style={{ width: 11, height: 11 }} />{k.okrLabel}
                            </button>
                            {Boolean(k.hasPages) && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                                {(k.pages || []).map((p, pi) => (
                                  <span key={pi} style={cssTextToObject(`display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:9px;background:${p.bg};color:${p.color};font-size:11px;font-weight:700`)}>
                                    <Icon name={p.icon} style={{ width: 11, height: 11, flexShrink: 0 }} />{p.label}
                                    <span style={{ fontFamily: "'Space Mono'", fontSize: 10, fontWeight: 500, opacity: .75 }}>{p.sub}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                        <span style={{ width: 22, height: 22, borderRadius: 7, background: 'var(--beet-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>2</span>
                        <span style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 14, color: 'var(--ink-900)' }}>Effort lines — the output volume required</span>
                      </div>
                      <div style={{ border: '1px solid var(--line-200)', borderRadius: 14, overflow: 'hidden' }}>
                        {(cmpEffortRows || []).map((e, i) => (
                          <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <Icon name="gauge" style={{ width: 14, height: 14, color: 'var(--orchid-600)', flexShrink: 0 }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)', flex: 1 }}>{e.name}</span>
                            <span style={{ fontSize: 12, color: 'var(--ink-700)' }}>{e.qty} {e.unit}</span>
                            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-700)' }}>{e.cadence}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                        <span style={{ width: 22, height: 22, borderRadius: 7, background: 'var(--beet-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>3</span>
                        <span style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 14, color: 'var(--ink-900)' }}>Tasks — the assignable work generated</span>
                      </div>
                      <div style={{ background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 14, padding: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{cmpTaskLabel}</span>
                        </div>
                        <div style={{ height: 7, borderRadius: 99, background: 'var(--line-200)', overflow: 'hidden', marginBottom: 13 }}><div style={cssTextToObject(`height:100%;border-radius:99px;width:${cmpTaskPctW};background:var(--info-500)`)} /></div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <button onClick={cmpGoTasks} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Icon name="list-checks" style={{ width: 13, height: 13 }} />View campaign tasks</button>
                          <button onClick={cmpGoEffort} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Icon name="gauge" style={{ width: 13, height: 13 }} />Open Effort Planner</button>
                          <button onClick={cmpGoOkr} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Icon name="target" style={{ width: 13, height: 13 }} />Open OKR & KPI</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {Boolean(cmpTabModel) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ background: 'var(--beet-700)', borderRadius: 16, padding: '18px 20px', color: '#fff' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-300)' }}>Campaign outcome</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 5 }}>
                        <span style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 26 }}>{cmpModel.outcomeKpi}</span>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>target {cmpModel.targetLabel}</span>
                      </div>
                      <div style={{ marginTop: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.75)' }}>Actual to date</span>
                          <span style={{ fontSize: 12, fontWeight: 800 }}>{cmpModel.currentLabel}</span>
                        </div>
                        <div style={{ height: 7, borderRadius: 99, background: 'rgba(255,255,255,.14)', overflow: 'hidden' }}><div style={cssTextToObject(`height:100%;border-radius:99px;width:${cmpModel.currentPctW};background:var(--verify-500)`)} /></div>
                      </div>
                      <div style={{ marginTop: 11 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.75)' }}>Planned from effort model</span>
                          <span style={{ fontSize: 12, fontWeight: 800 }}>{cmpModel.plannedLabel}</span>
                        </div>
                        <div style={{ height: 7, borderRadius: 99, background: 'rgba(255,255,255,.14)', overflow: 'hidden' }}><div style={cssTextToObject(`height:100%;border-radius:99px;width:${cmpModel.plannedPctW};background:var(--orchid-500)`)} /></div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                        <span style={cssTextToObject(`font-size:11.5px;font-weight:700;padding:5px 12px;border-radius:999px;background:${cmpModel.gapBg};color:${cmpModel.gapColor}`)}>{cmpModel.gapLabel}</span>
                        <span style={cssTextToObject(`font-size:11.5px;font-weight:700;padding:5px 12px;border-radius:999px;background:${cmpModel.blockerBg};color:${cmpModel.blockerColor}`)}>{cmpModel.blockerLabel}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>Effort target → tasks → driver KPI → contribution</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                      {(cmpModel.rows || []).map((r, i) => (
                        <div key={i} style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 16, boxShadow: 'var(--shadow-sm)', padding: '16px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                            <span style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--orchid-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Icon name="gauge" style={{ width: 15, height: 15, color: 'var(--orchid-600)' }} />
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink-900)' }}>{r.name}</div>
                              <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginTop: 2 }}>{r.note}</div>
                            </div>
                            {Boolean(r.isDirect) && (
                              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Contributes</div>
                                <div style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 17, color: 'var(--verify-600)' }}>{r.projected}</div>
                              </div>
                            )}
                            {Boolean(r.isEnabler) && (
                              <span style={cssTextToObject(`font-size:11px;font-weight:700;padding:4px 11px;border-radius:999px;background:${r.gateBg};color:${r.gateColor};flex-shrink:0`)}>{r.gateLabel}</span>
                            )}
                          </div>
                          <div style={{ background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 11, padding: '10px 13px', fontFamily: "'Space Mono'", fontSize: 11.5, color: 'var(--ink-700)', marginBottom: 10 }}>{r.chain}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)' }}>Tasks generated from this effort</span>
                                <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--ink-900)' }}>{r.tasksLabel} · {r.taskPct}</span>
                              </div>
                              <div style={{ height: 5, borderRadius: 99, background: 'var(--line-200)', overflow: 'hidden' }}><div style={cssTextToObject(`height:100%;border-radius:99px;width:${r.taskPctW};background:${r.taskColor}`)} /></div>
                            </div>
                            {Boolean(r.isDirect) && (
                              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--ink-400)' }}>Delivered so far</div>
                                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-900)' }}>{r.delivered}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 12, padding: '11px 14px', fontSize: 12.5, color: 'var(--ink-500)' }}>
                      <Icon name="info" style={{ width: 15, height: 15, flexShrink: 0, color: 'var(--orchid-600)' }} />
                      <span>Direct lines convert output into the outcome KPI. Enabler lines are quality gates — they don't add {cmpModel.outcomeUnit} themselves, but the direct lines only deliver at plan if their gate is met.</span>
                    </div>
                  </div>
                )}

                {Boolean(cmpTabTeam) && (
                  <div style={{ border: '1px solid var(--line-200)', borderRadius: 14, overflow: 'hidden' }}>
                    {(cmpTeamRows || []).map((t, i) => (
                      <div key={i} style={{ padding: '13px 16px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ width: 34, height: 34, borderRadius: 99, background: 'var(--beet-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{t.initials}</span>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink-900)', flex: 1 }}>{t.who}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 700, padding: '4px 11px', borderRadius: 999, background: 'var(--orchid-100)', color: 'var(--orchid-700)' }}>{t.role}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
