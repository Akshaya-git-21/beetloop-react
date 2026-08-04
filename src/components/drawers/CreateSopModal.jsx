import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

const label = { display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5 };
const input = { width: '100%', padding: '9px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, outline: 'none' };
const select = { ...input, background: '#fff' };
const textarea = { ...input, resize: 'vertical' };

export default function CreateSopModal({ vm }) {
  const {
    sopFormOpen, sf, sopNextId, sopClose, sopStop, sopSecs,
    sopSecBasics, sopSecClassify, sopSecContext, sopSecSteps, sopSecLinks, sopSecGov,
    sopDupOptions, sopDupFrom,
    sopSetTitle, sopSetPurpose, sopSetScope,
    sopCategoryOptions, sopSetCategory, sopDivisionOptions, sopSetDivision,
    sopBrandOptions, sopSetBrand,
    sopPriorityOptions, sopSetPriority, sopFrequencyOptions, sopSetFrequency,
    sopSetEstTime, sopSetTags,
    sopSetTrigger, sopSetApplicability, sopSetInputs, sopSetOutputs, sopSetResources, sopSetDocs,
    sopSetSuccess, sopSetRisks, sopSetEscalation,
    sopStepCount, sopAddStep, sopSteps,
    sopKpiRows, sopRelRows, sopAddRel, sopStdRows,
    sopStatusOptions, sopSetStatus, sopApproverOptions, sopSetApprover, sopSetReview, sopSetChange, sopSetReason,
    sopSave,
  } = vm;
  const f = sf || {};
  return (
    <React.Fragment>
      {Boolean(sopFormOpen) && (
        <div onClick={sopClose} style={{ position: 'fixed', inset: 0, zIndex: 182, background: 'rgba(31,8,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div onClick={sopStop} className="blscroll" style={{ width: '100%', maxWidth: 740, maxHeight: '100%', background: '#fff', borderRadius: 20, boxShadow: 'var(--shadow-xl)', overflowY: 'auto', animation: 'blrise .28s var(--ease-out)' }}>
            <div style={{ position: 'sticky', top: 0, background: '#fff', padding: '18px 22px', borderBottom: '1px solid var(--line-200)', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>Standard operating procedure</div>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 19, color: 'var(--beet-700)', margin: '4px 0 0' }}>
                    New SOP <span style={{ fontFamily: "'Space Mono'", fontSize: 12, fontWeight: 700, color: 'var(--ink-400)' }}>{sopNextId}</span>
                  </h3>
                </div>
                <button onClick={sopClose} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="x" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} />
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 12 }}>
                {(sopSecs || []).map((x, i) => (
                  <button key={i} onClick={x.go} style={cssTextToObject(x.style)}>
                    <Icon name={x.icon} style={{ width: 12, height: 12 }} />{x.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {Boolean(sopSecBasics) && (
                <React.Fragment>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 11, padding: '9px 12px' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)', flexShrink: 0 }}>Start from an existing SOP</span>
                    <select onChange={sopDupFrom} defaultValue="" style={{ flex: 1, minWidth: 0, padding: '7px 10px', border: '1px solid var(--line-300)', borderRadius: 9, fontSize: 11.5, background: '#fff' }}>
                      <option value="">Blank SOP</option>
                      {(sopDupOptions || []).filter(Boolean).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={label}>Title <span style={{ color: 'var(--danger-600)' }}>*</span></label>
                    <input value={f.title || ''} onInput={sopSetTitle} placeholder="e.g. Publishing an insight article" style={input} />
                  </div>
                  <div>
                    <label style={label}>Purpose <span style={{ color: 'var(--danger-600)' }}>*</span></label>
                    <textarea value={f.purpose || ''} onInput={sopSetPurpose} rows={2} placeholder="What outcome this procedure guarantees." style={textarea} />
                  </div>
                  <div>
                    <label style={label}>Scope</label>
                    <textarea value={f.scope || ''} onInput={sopSetScope} rows={2} placeholder="What this covers — and explicitly what it does not." style={textarea} />
                  </div>
                </React.Fragment>
              )}

              {Boolean(sopSecClassify) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={label}>Category</label>
                    <select value={f.category || ''} onChange={sopSetCategory} style={select}>
                      {(sopCategoryOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={label}>Function</label>
                    <select value={f.division || ''} onChange={sopSetDivision} style={select}>
                      {(sopDivisionOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={label}>Priority</label>
                    <select value={f.priority || ''} onChange={sopSetPriority} style={select}>
                      {(sopPriorityOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={label}>Brand</label>
                    <select value={f.brand || 'All brands'} onChange={sopSetBrand} style={select}>
                      {(sopBrandOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={label}>Frequency</label>
                    <select value={f.frequency || ''} onChange={sopSetFrequency} style={select}>
                      {(sopFrequencyOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={label}>Estimated completion time</label>
                    <input value={f.estTime || ''} onInput={sopSetEstTime} placeholder="e.g. 4 h" style={input} />
                  </div>
                  <div>
                    <label style={label}>Tags</label>
                    <input value={f.tags || ''} onInput={sopSetTags} placeholder="comma-separated" style={input} />
                  </div>
                </div>
              )}

              {Boolean(sopSecContext) && (
                <React.Fragment>
                  <div>
                    <label style={label}>Trigger — what initiates this SOP</label>
                    <input value={f.trigger || ''} onInput={sopSetTrigger} placeholder="e.g. A new service is approved for market" style={input} />
                  </div>
                  <div>
                    <label style={label}>Applicability — where and when it applies</label>
                    <input value={f.applicability || ''} onInput={sopSetApplicability} placeholder="e.g. All group domains, all markets" style={input} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={label}>Inputs</label>
                      <input value={f.inputs || ''} onInput={sopSetInputs} placeholder="comma-separated" style={input} />
                    </div>
                    <div>
                      <label style={label}>Outputs</label>
                      <input value={f.outputs || ''} onInput={sopSetOutputs} placeholder="comma-separated" style={input} />
                    </div>
                    <div>
                      <label style={label}>Required resources / tools</label>
                      <input value={f.resources || ''} onInput={sopSetResources} placeholder="comma-separated" style={input} />
                    </div>
                    <div>
                      <label style={label}>Related documents / templates</label>
                      <input value={f.docs || ''} onInput={sopSetDocs} placeholder="comma-separated file names" style={input} />
                    </div>
                  </div>
                  <div>
                    <label style={label}>Success criteria</label>
                    <input value={f.successCriteria || ''} onInput={sopSetSuccess} placeholder="How you know it was done correctly" style={input} />
                  </div>
                  <div>
                    <label style={label}>Risk if skipped</label>
                    <input value={f.risks || ''} onInput={sopSetRisks} placeholder="What goes wrong when this is bypassed" style={input} />
                  </div>
                  <div>
                    <label style={label}>Escalation contact</label>
                    <input value={f.escalation || ''} onInput={sopSetEscalation} placeholder="e.g. Priya Nair → Rahul Menon" style={input} />
                  </div>
                </React.Fragment>
              )}

              {Boolean(sopSecSteps) && (
                <React.Fragment>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)' }}>{sopStepCount}</span>
                    <button onClick={sopAddStep} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 9, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>
                      <Icon name="plus" style={{ width: 11, height: 11 }} />Add step
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(sopSteps || []).map((s, i) => (
                      <div key={i} style={{ border: '1px solid var(--line-300)', borderRadius: 12, padding: '12px 13px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <span style={{ width: 22, height: 22, borderRadius: 99, background: 'var(--beet-700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 800, flexShrink: 0 }}>{s.n}</span>
                          <span style={{ flex: 1 }} />
                          <button onClick={s.moveUp} style={{ width: 26, height: 26, borderRadius: 8, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="chevron-up" style={{ width: 12, height: 12, color: 'var(--ink-500)' }} />
                          </button>
                          <button onClick={s.moveDown} style={{ width: 26, height: 26, borderRadius: 8, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="chevron-down" style={{ width: 12, height: 12, color: 'var(--ink-500)' }} />
                          </button>
                          {Boolean(s.canRemove) && (
                            <button onClick={s.remove} style={{ width: 26, height: 26, borderRadius: 8, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Icon name="trash-2" style={{ width: 12, height: 12, color: 'var(--danger-600)' }} />
                            </button>
                          )}
                        </div>
                        <input value={s.t} onInput={s.setT} placeholder="Step title — what happens here" style={{ ...input, marginBottom: 6 }} />
                        <textarea value={s.d} onInput={s.setD} rows={2} placeholder="Description — how it is done, tool, threshold" style={{ ...textarea, fontSize: 11.5, marginBottom: 6 }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr .7fr', gap: 8, marginBottom: 6 }}>
                          <input value={s.outcome} onInput={s.setOutcome} placeholder="Expected outcome" style={{ ...input, fontSize: 11.5, minWidth: 0 }} />
                          <input value={s.dur} onInput={s.setDur} placeholder="Duration" style={{ ...input, fontSize: 11.5, minWidth: 0 }} />
                        </div>
                        <input value={s.notes} onInput={s.setNotes} placeholder="Notes (optional)" style={{ ...input, fontSize: 11, marginBottom: 8 }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>Evidence required</span>
                          {(s.evRows || []).map((ev, j) => (
                            <button key={j} onClick={ev.toggle} style={cssTextToObject(ev.style)}>{ev.label}</button>
                          ))}
                        </div>
                        {Boolean(s.hasSubs) && (
                          <div style={{ background: 'var(--surface-50)', borderRadius: 10, padding: '9px 11px', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 7 }}>
                            {(s.subRows || []).map((sb, j) => (
                              <div key={j} style={{ display: 'flex', gap: 6 }}>
                                <input value={sb.t} onInput={sb.setT} placeholder="Sub-step" style={{ flex: 1, minWidth: 0, padding: '7px 10px', border: '1px solid var(--line-300)', borderRadius: 9, fontSize: 11, outline: 'none' }} />
                                <input value={sb.d} onInput={sb.setD} placeholder="Detail" style={{ flex: 1, minWidth: 0, padding: '7px 10px', border: '1px solid var(--line-300)', borderRadius: 9, fontSize: 11, outline: 'none' }} />
                                <button onClick={sb.remove} style={{ width: 26, height: 26, borderRadius: 8, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <Icon name="x" style={{ width: 11, height: 11, color: 'var(--ink-500)' }} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        <button onClick={s.addSub} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px dashed var(--line-300)', background: '#fff', color: 'var(--orchid-600)', borderRadius: 8, fontSize: 10.5, fontWeight: 700, cursor: 'pointer' }}>
                          <Icon name="plus" style={{ width: 10, height: 10 }} />Add sub-step
                        </button>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              )}

              {Boolean(sopSecLinks) && (
                <React.Fragment>
                  <div>
                    <label style={label}>Linked KPIs — this SOP contributes to</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(sopKpiRows || []).map((k, i) => (
                        <button key={i} onClick={k.toggle} style={cssTextToObject(k.style)}>
                          <Icon name="target" style={{ width: 11, height: 11 }} />{k.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <label style={{ ...label, marginBottom: 0 }}>Linked SOPs</label>
                      <button onClick={sopAddRel} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 11px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 9, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                        <Icon name="plus" style={{ width: 11, height: 11 }} />Add link
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {(sopRelRows || []).map((r, i) => (
                        <div key={i} style={{ display: 'flex', gap: 7 }}>
                          <select value={r.rel} onChange={r.setRel} style={{ width: 180, flexShrink: 0, padding: '8px 10px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 11.5, background: '#fff' }}>
                            {(r.relOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                          <select value={r.id} onChange={r.setId} style={{ flex: 1, minWidth: 0, padding: '8px 10px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 11.5, background: '#fff' }}>
                            {(r.sopOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                          {Boolean(r.canRemove) && (
                            <button onClick={r.remove} style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Icon name="x" style={{ width: 12, height: 12, color: 'var(--ink-500)' }} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={label}>Gold standards this SOP enforces</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(sopStdRows || []).map((g, i) => (
                        <button key={i} onClick={g.toggle} style={cssTextToObject(g.style)}>
                          {g.label}<span style={{ fontWeight: 500, opacity: .8 }}>{g.note}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              )}

              {Boolean(sopSecGov) && (
                <React.Fragment>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={label}>Status</label>
                      <select value={f.status || ''} onChange={sopSetStatus} style={select}>
                        {(sopStatusOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={label}>Approver</label>
                      <select value={f.approver || ''} onChange={sopSetApprover} style={select}>
                        {(sopApproverOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={label}>Next review date</label>
                      <input type="date" value={f.review || ''} onInput={sopSetReview} style={{ ...input, color: 'var(--ink-700)' }} />
                    </div>
                    <div>
                      <label style={label}>Change summary</label>
                      <input value={f.changeSummary || ''} onInput={sopSetChange} placeholder="What changed in this version" style={input} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={label}>Reason for revision</label>
                      <input value={f.reason || ''} onInput={sopSetReason} placeholder="Why it changed — e.g. an audit finding" style={input} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-500)', padding: '10px 13px', borderRadius: 12, fontSize: 11.5 }}>
                    <Icon name="git-branch" style={{ width: 13, height: 13, flexShrink: 0, color: 'var(--orchid-600)' }} />
                    Saved as v1.0. Later revisions keep full history — publishing a new version never overwrites the old one.
                  </div>
                </React.Fragment>
              )}
            </div>

            <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '14px 22px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={sopClose} style={{ padding: '10px 17px', border: '1px solid var(--line-300)', background: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={sopSave} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                <Icon name="check" style={{ width: 14, height: 14 }} />Save SOP
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
