import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

const label = { display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 };
const input = { width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' };
const select = { ...input, background: 'var(--paper)' };
const card = { background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', padding: '22px 24px' };
const sectionHead = (letter, name) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
    <span style={{ width: 22, height: 22, borderRadius: 7, background: 'var(--beet-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{letter}</span>
    <span style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 15, color: 'var(--ink-900)' }}>{name}</span>
  </div>
);
const smallInput = { minWidth: 0, padding: '9px 11px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, outline: 'none', background: 'var(--paper)' };
const smallSelect = { ...smallInput };

export default function CreateCampaignModal({ vm }) {
  const {
    cmpFormOpen, cmpf, cmpFormTitle, cmpFormCode, cmpFormSaveLabel, cmpFormClose, cmpFormSave, cmpCanDelete, cmpFormDelete,
    cmpSections, cmpSetName, cmpSetType, cmpSetObjective, cmpSetStatus, cmpSetBrand, cmpSetDept, cmpSetCycle, cmpSetStart, cmpSetEnd,
    cmpSetOwner, cmpSetBudget, cmpSetGoal, cmpSetAudience, cmpSetPersona, cmpSetCompanySize, cmpCountryRows, cmpIndustryRows,
    cmpPeopleNames, cmpKpiForm, cmpAddKpi, cmpKpiPoolOptions,
    cmpEffortForm, cmpAddEffort, cmpEffortEmpty, cmpEffortOptions,
    cmpNewEffortOpen, cmpNe, cmpNeSetName, cmpNeSetQty, cmpNeSetUnit, cmpNeSetCadence, cmpNeSetDivision, cmpNeSetKpi,
    cmpNeKpiOptions, cmpNeDivisions, cmpNeCancel, cmpNeSave,
    cmpTeamForm, cmpAddTeam, cmpRoleNames,
  } = vm;
  const f = cmpf || {};
  const ne = cmpNe || {};
  return (
    <React.Fragment>
      {Boolean(cmpFormOpen) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 160, background: 'var(--surface-100)', display: 'flex', flexDirection: 'column', animation: 'blrise .28s var(--ease-out)' }}>
          <header style={{ flex: 'none', background: 'var(--paper)', borderBottom: '1px solid var(--line-200)', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>Campaign configuration</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3 }}>
                <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 22, color: 'var(--ink-900)', margin: 0 }}>{cmpFormTitle}</h3>
                <span style={{ fontFamily: "'Space Mono'", fontSize: 12, color: 'var(--ink-400)' }}>{cmpFormCode}</span>
              </div>
            </div>
            {Boolean(cmpCanDelete) && (
              <button onClick={cmpFormDelete} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 7, background: 'var(--paper)', border: '1px solid var(--danger-300, #e5a3a3)', color: 'var(--danger-600)', borderRadius: 11, padding: '9px 15px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>
                <Icon name="trash-2" style={{ width: 16, height: 16 }} />Delete
              </button>
            )}
            <button onClick={cmpFormClose} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 7, background: 'var(--paper)', border: '1px solid var(--line-300)', color: 'var(--ink-700)', borderRadius: 11, padding: '9px 15px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>
              <Icon name="x" style={{ width: 16, height: 16 }} />Close
            </button>
          </header>

          <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
            <nav style={{ flex: 'none', width: 236, borderRight: '1px solid var(--line-200)', background: 'var(--paper)', padding: '20px 14px', overflowY: 'auto' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-400)', padding: '0 10px 10px' }}>Sections</div>
              {(cmpSections || []).map((s, i) => (
                <a key={i} href="#" onClick={s.go} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 10, fontSize: 12.5, fontWeight: 700, textDecoration: 'none', marginBottom: 3, color: s.active ? 'var(--ink-900)' : 'var(--ink-500)', background: s.active ? 'var(--orchid-100)' : 'transparent' }}>
                  <span style={{ width: 20, height: 20, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, background: s.badgeBg, color: s.badgeColor }}>{s.letter}</span>
                  {s.name}
                </a>
              ))}
            </nav>

            <div className="blscroll" style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
              <div style={{ maxWidth: 880, margin: '0 auto', padding: '28px 34px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                <div id="cmpA" style={card}>
                  {sectionHead('A', 'Campaign basics')}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div><label style={label}>Campaign name *</label><input value={f.name || ''} onChange={cmpSetName} placeholder="e.g. Q3 SEO push — Pubrica" style={input} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div><label style={label}>Campaign type</label>
                        <select value={f.type || ''} onChange={cmpSetType} style={select}>
                          {['SEO Campaign','Content Campaign','SMM Campaign','Website Campaign','Email Campaign','Analytics Campaign'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div><label style={label}>Campaign objective</label>
                        <select value={f.objective || ''} onChange={cmpSetObjective} style={select}>
                          {['Lead Generation','Brand Awareness','Product Launch','Demand Generation','Customer Retention','Thought Leadership'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div><label style={label}>Brand / company</label>
                        <select value={f.brand || ''} onChange={cmpSetBrand} style={select}>
                          {['Beetloop','Pubrica','Food Research Lab','Statswork','Tutors India'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div><label style={label}>Department / division</label>
                        <select value={f.dept || ''} onChange={cmpSetDept} style={select}>
                          {['SEO','Content','SMM','Web Development','Design'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div><label style={label}>Cycle</label>
                        <select value={f.cycle || ''} onChange={cmpSetCycle} style={select}>
                          {['Q1 2026','Q2 2026','Q3 2026','Q4 2026','Annual 2026'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div><label style={label}>Status</label>
                        <select value={f.status || ''} onChange={cmpSetStatus} style={select}>
                          {['Draft','Planning','Live','Paused','Completed'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div><label style={label}>Start date</label><input type="date" value={f.start || ''} onChange={cmpSetStart} style={{ ...input, color: 'var(--ink-700)' }} /></div>
                      <div><label style={label}>End date</label><input type="date" value={f.end || ''} onChange={cmpSetEnd} style={{ ...input, color: 'var(--ink-700)' }} /></div>
                      <div><label style={label}>Campaign owner</label>
                        <select value={f.owner || ''} onChange={cmpSetOwner} style={select}>
                          {(cmpPeopleNames || []).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div><label style={label}>Budget</label><input value={f.budget || ''} onChange={cmpSetBudget} placeholder="e.g. ₹4,50,000" style={input} /></div>
                    </div>
                  </div>
                </div>

                <div id="cmpB" style={card}>
                  {sectionHead('B', 'Goal & scope')}
                  <label style={label}>Campaign goal</label>
                  <textarea value={f.goal || ''} onChange={cmpSetGoal} rows="3" placeholder="e.g. Generate 4,000 qualified leads for research-writing services from organic search this quarter." style={{ ...input, resize: 'vertical' }} />
                  <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginTop: 6 }}>State the outcome in numbers — it becomes the yardstick for the KPIs you link in section D.</div>
                </div>

                <div id="cmpC" style={card}>
                  {sectionHead('C', 'Target audience')}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div style={{ gridColumn: '1 / -1' }}><label style={label}>Target countries</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                          {(cmpCountryRows || []).map((r, i) => <button key={i} onClick={r.toggle} style={cssTextToObject(r.style)}>{r.label}</button>)}
                        </div>
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}><label style={label}>Target industries</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                          {(cmpIndustryRows || []).map((r, i) => <button key={i} onClick={r.toggle} style={cssTextToObject(r.style)}>{r.label}</button>)}
                        </div>
                      </div>
                      <div><label style={label}>Decision-making persona</label><input value={f.persona || ''} onChange={cmpSetPersona} placeholder="e.g. Research Director / Head of R&D" style={input} /></div>
                      <div><label style={label}>Company size</label>
                        <select value={f.companySize || ''} onChange={cmpSetCompanySize} style={select}>
                          {['Individual / 1–50','50–500 employees','200–2,000 employees','2,000+ employees','All sizes'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <div><label style={label}>Target audience</label><input value={f.audience || ''} onChange={cmpSetAudience} placeholder="e.g. Researchers, PhD scholars, academic institutions" style={input} /></div>
                  </div>
                </div>

                <div id="cmpD" style={card}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    {sectionHead('D', 'Linked KPIs')}
                    <button onClick={cmpAddKpi} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Icon name="plus" style={{ width: 12, height: 12 }} />Add KPI</button>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginBottom: 11 }}>Select a key result from an existing OKR — its KPI, unit, target and current value are pulled in, <strong>and every Effort Planner line driving that KPI is auto-attached in section E with its tasks</strong>. KPI templates are listed too for KPIs not yet on an OKR.</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {(cmpKpiForm || []).map(k => (
                      <div key={k.i} style={{ background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 12, padding: 11 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                          <select value={k.srcKey || ''} onChange={k.pick} style={{ flex: 1, minWidth: 0, maxWidth: '100%', ...smallSelect }}>
                            {(cmpKpiPoolOptions || []).map((o, oi) => <option key={oi} value={o.key}>{o.label}</option>)}
                          </select>
                          {k.canRemove ? (
                            <button onClick={k.remove} style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Icon name="trash-2" style={{ width: 13, height: 13, color: 'var(--ink-500)' }} />
                            </button>
                          ) : null}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '.9fr .9fr .8fr', gap: 8 }}>
                          <input value={k.target || ''} onChange={k.setB} placeholder="Campaign target" style={smallInput} />
                          <input value={k.current || ''} onChange={k.setC} placeholder="Current" style={smallInput} />
                          <input value={k.unit || ''} onChange={k.setD} placeholder="Unit" style={smallInput} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7, fontSize: 11, fontWeight: 700, color: 'var(--orchid-700)' }}><Icon name="link" style={{ width: 11, height: 11 }} />{k.okrLabel}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 11, fontWeight: 600, color: 'var(--ink-500)' }}><Icon name="git-branch" style={{ width: 11, height: 11 }} />{k.autoLabel}</div>
                        <div style={{ borderTop: '1px dashed var(--line-300)', marginTop: 9, paddingTop: 9 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 7 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: 'var(--info-600)' }}><Icon name="link-2" style={{ width: 12, height: 12 }} />Landing pages this KPI drives</span>
                            <span style={{ display: 'flex', gap: 6 }}>
                              <button onClick={k.addInternalPage} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 9px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 8, fontSize: 10.5, fontWeight: 700, cursor: 'pointer' }}><Icon name="plus" style={{ width: 10, height: 10 }} />Internal page</button>
                              <button onClick={k.addExternalPage} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 9px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 8, fontSize: 10.5, fontWeight: 700, cursor: 'pointer' }}><Icon name="external-link" style={{ width: 10, height: 10 }} />External URL</button>
                            </span>
                          </div>
                          {Boolean(k.hasPages) && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 6 }}>
                              {(k.pageRows || []).map(p => (
                                <div key={p.pi} style={{ display: 'flex', gap: 6, alignItems: 'center', minWidth: 0 }}>
                                  <select value={p.kind || 'Internal'} onChange={p.setKind} style={{ width: 96, minWidth: 0, padding: '7px 9px', border: '1px solid var(--line-300)', borderRadius: 9, fontSize: 11.5, background: 'var(--paper)' }}>
                                    <option>Internal</option><option>External</option>
                                  </select>
                                  {p.isInternal ? (
                                    <select value={p.url || ''} onChange={p.setUrl} style={{ flex: 1, minWidth: 0, padding: '7px 9px', border: '1px solid var(--line-300)', borderRadius: 9, fontSize: 11.5, background: 'var(--paper)' }}>
                                      {(k.repoPageOptions || []).map((o, oi) => <option key={oi} value={o.v}>{o.label}</option>)}
                                    </select>
                                  ) : null}
                                  {p.isExternal ? (
                                    <input value={p.url || ''} onChange={p.setUrl} placeholder="https://medium.com/@brand/guest-article" style={{ flex: 1, minWidth: 0, padding: '7px 9px', border: '1px solid var(--line-300)', borderRadius: 9, fontSize: 11.5, outline: 'none', fontFamily: "'Space Mono'" }} />
                                  ) : null}
                                  <input value={p.contrib || ''} onChange={p.setContrib} placeholder="Expected" style={{ width: 88, minWidth: 0, padding: '7px 9px', border: '1px solid var(--line-300)', borderRadius: 9, fontSize: 11.5, outline: 'none' }} />
                                  <button onClick={p.remove} style={{ width: 26, height: 26, borderRadius: 8, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon name="x" style={{ width: 11, height: 11, color: 'var(--ink-500)' }} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: 'var(--ink-400)' }}><Icon name="info" style={{ width: 11, height: 11 }} />{k.pageSummary}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="cmpE" style={card}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    {sectionHead('E', 'Effort lines')}
                    <button onClick={cmpAddEffort} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Icon name="plus" style={{ width: 12, height: 12 }} />Add effort line</button>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginBottom: 11 }}>Auto-filled from the KPIs you linked in section D. Add extra lines only if a KPI has no effort plan yet — quantity, unit, cadence, division, owner and tasks come from Effort Planner.</div>
                  {Boolean(cmpEffortEmpty) && (
                    <div style={{ border: '1.5px dashed var(--line-300)', borderRadius: 12, padding: 22, textAlign: 'center', color: 'var(--ink-500)', marginBottom: 11 }}>
                      <Icon name="git-branch" style={{ width: 20, height: 20, color: 'var(--ink-400)' }} />
                      <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 7 }}>Link a KPI in section D — its effort lines and tasks attach here automatically.</div>
                    </div>
                  )}
                  {Boolean(cmpNewEffortOpen) && (
                    <div style={{ background: 'var(--paper)', border: '1.5px solid var(--orchid-400)', borderRadius: 12, padding: 14, marginBottom: 11 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}><Icon name="plus-circle" style={{ width: 15, height: 15, color: 'var(--orchid-600)' }} /><span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink-900)' }}>New effort line — will be created in Effort Planner</span></div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr .6fr .8fr', gap: 8, marginBottom: 8 }}>
                        <input value={ne.name || ''} onChange={cmpNeSetName} placeholder="e.g. Publish long-form articles" style={smallInput} />
                        <input value={ne.qty || ''} onChange={cmpNeSetQty} placeholder="Qty /month" style={smallInput} />
                        <input value={ne.unit || ''} onChange={cmpNeSetUnit} placeholder="Unit e.g. articles" style={smallInput} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                        <select value={ne.division || ''} onChange={cmpNeSetDivision} style={smallSelect}>
                          {(cmpNeDivisions || []).map((d, di) => <option key={di} value={d}>{d}</option>)}
                        </select>
                        <select value={ne.kpi || ''} onChange={cmpNeSetKpi} style={smallSelect}>
                          {(cmpNeKpiOptions || []).map((o, oi) => <option key={oi} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={cmpNeSave} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 15px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 10, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}><Icon name="check" style={{ width: 13, height: 13 }} />Add &amp; sync to Effort Planner</button>
                        <button onClick={cmpNeCancel} style={{ padding: '9px 15px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 10, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {(cmpEffortForm || []).map(e => (
                      <div key={e.i} style={{ background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 12, padding: 11 }}>
                        {e.locked ? (
                          <React.Fragment>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                              <Icon name="lock" style={{ width: 13, height: 13, color: 'var(--ink-400)', flexShrink: 0 }} />
                              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{e.name}</div><div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginTop: 1 }}>{e.summary}</div></div>
                              <button onClick={e.openPlan} style={{ padding: '6px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 9, fontSize: 11.5, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Edit in Effort Planner</button>
                              <button onClick={e.remove} style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon name="unlink" style={{ width: 13, height: 13, color: 'var(--ink-500)' }} />
                              </button>
                            </div>
                          </React.Fragment>
                        ) : (
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                            <select value={e.srcKey || ''} onChange={e.pick} style={{ flex: 1, minWidth: 0, ...smallSelect }}>
                              {(cmpEffortOptions || []).map((o, oi) => <option key={oi} value={o.key}>{o.label}</option>)}
                            </select>
                            <button onClick={e.remove} style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Icon name="trash-2" style={{ width: 13, height: 13, color: 'var(--ink-500)' }} />
                            </button>
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: 'var(--orchid-700)' }}><Icon name="link" style={{ width: 11, height: 11 }} />{e.metaLabel}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: 'var(--ink-400)', margin: '3px 0 8px' }}><Icon name="shield-check" style={{ width: 11, height: 11 }} />{e.planLabel}</div>
                        <div style={{ display: 'flex', gap: 7, marginBottom: 9 }}>
                          <button onClick={e.toggleTasks} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 9, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}><Icon name="list-checks" style={{ width: 12, height: 12 }} />{e.taskToggleLabel}</button>
                          <button onClick={e.openTasks} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-500)', borderRadius: 9, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}><Icon name="external-link" style={{ width: 12, height: 12 }} />Open in Tasks</button>
                        </div>
                        {Boolean(e.expanded) && (
                          <div style={{ background: 'var(--paper)', border: '1px solid var(--line-200)', borderRadius: 11, overflow: 'hidden', marginBottom: 9 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: 'var(--surface-50)', borderBottom: '1px solid var(--line-200)', fontSize: 10.5, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)' }}><Icon name="lock" style={{ width: 11, height: 11 }} />Tasks generated from this effort — read-only, managed in Tasks</div>
                            {(e.taskList || []).map((t, ti) => (
                              <div key={ti} style={{ padding: '8px 12px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', gap: 9 }}>
                                <span style={{ fontFamily: "'Space Mono'", fontSize: 10, fontWeight: 700, color: 'var(--ink-900)', flexShrink: 0 }}>{t.id}</span>
                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-900)', flex: 1, minWidth: 0 }}>{t.name}</span>
                                <span style={{ fontSize: 10.5, color: 'var(--ink-500)', flexShrink: 0 }}>{t.dates}</span>
                                <span style={{ fontSize: 10.5, color: 'var(--ink-500)', flexShrink: 0 }}>{t.who}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: t.statusBg, color: t.statusColor, flexShrink: 0 }}>{t.status}</span>
                              </div>
                            ))}
                            {Boolean(e.taskListEmpty) && (
                              <div style={{ padding: '14px 12px', textAlign: 'center', fontSize: 11.5, color: 'var(--ink-500)' }}>No tasks generated yet — run Generate tasks in Effort Planner.</div>
                            )}
                            <div style={{ padding: '7px 12px', fontSize: 10.5, color: 'var(--ink-400)' }}>{e.taskMore}</div>
                          </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: '.9fr 1.2fr .8fr .7fr', gap: 8 }}>
                          <select value={e.modeVal || 'direct'} onChange={e.setMode} style={{ ...smallSelect, fontSize: 12 }}>
                            <option value="direct">Direct — converts</option>
                            <option value="enabler">Enabler — quality gate</option>
                          </select>
                          <input value={e.driverKpi || ''} onChange={e.setDriver} placeholder="Driver metric (e.g. Sessions per article)" style={{ ...smallInput, fontSize: 12 }} />
                          {e.isEnabler ? (
                            <input value={e.gate || ''} onChange={e.setGate} placeholder="Gate e.g. ≤ 10%" style={{ gridColumn: 'span 2', ...smallInput, fontSize: 12 }} />
                          ) : null}
                          <input value={e.perUnit || ''} onChange={e.setPerUnit} placeholder="Per unit (3000)" style={{ ...smallInput, fontSize: 12 }} />
                          <input value={e.conv || ''} onChange={e.setConv} placeholder="Conv %" style={{ ...smallInput, fontSize: 12 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="cmpF" style={card}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    {sectionHead('F', 'Campaign team')}
                    <button onClick={cmpAddTeam} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Icon name="user-plus" style={{ width: 12, height: 12 }} />Add member</button>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginBottom: 11 }}>A campaign is team work — one accountable owner plus the leads and reviewers who deliver it.</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {(cmpTeamForm || []).map(t => (
                      <div key={t.i} style={{ background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 12, padding: 11, display: 'grid', gridTemplateColumns: '1.2fr 1fr auto', gap: 8, alignItems: 'center' }}>
                        <select value={t.who || ''} onChange={t.setA} style={select}>
                          <option value="">Select member…</option>
                          {(cmpPeopleNames || []).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <select value={t.role || ''} onChange={t.setB} style={select}>
                          <option value="">Role on campaign…</option>
                          {(cmpRoleNames || []).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        {t.canRemove ? (
                          <button onClick={t.remove} style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="trash-2" style={{ width: 13, height: 13, color: 'var(--ink-500)' }} />
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
          <footer style={{ flex: 'none', background: 'var(--paper)', borderTop: '1px solid var(--line-200)', padding: '14px 28px', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button onClick={cmpFormClose} style={{ padding: '11px 18px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13.5, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Cancel</button>
            <button onClick={cmpFormSave} style={{ padding: '11px 28px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 18px -8px rgba(122,28,70,.55)' }}>{cmpFormSaveLabel}</button>
          </footer>
        </div>
      )}
    </React.Fragment>
  );
}
