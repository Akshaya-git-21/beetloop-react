import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function ConvertToTasksModal({ vm }) {
  const { cvOpen, cvIdeaId, cvIdeaTitle, cvClose, cvStop, cvf,
    cvPlanOptions, cvSetPlan, cvRowOptions, cvSetRow, cvEffortInfo, cvHasRow,
    cvModeBtns, cvKpiExisting, cvKpiNew, cvKpiOptions, cvSetKpi,
    cvSetNewKpiName, cvSetNewKpiUnit, cvSetNewKpiTarget,
    cvSetCount, cvAssignees, cvSetAssignee, cvSetStart, cvSetEnd, cvReviewers, cvSetReviewer,
    cvCountNote, cvSave } = vm;
  const f = cvf || {};
  return (
    <React.Fragment>
      {Boolean(cvOpen) && (
        <div onClick={cvClose} style={{ position: 'fixed', inset: 0, zIndex: 170, background: 'rgba(31,8,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div onClick={cvStop} className="blscroll" style={{ width: '100%', maxWidth: 620, maxHeight: '100%', background: 'var(--paper)', borderRadius: 20, boxShadow: 'var(--shadow-xl)', overflowY: 'auto', animation: 'blrise .28s var(--ease-out)' }}>
            <div style={{ position: 'sticky', top: 0, background: 'var(--paper)', borderBottom: '1px solid var(--line-200)', padding: '18px 22px', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>Approved idea · {cvIdeaId}</div>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 18, color: 'var(--ink-900)', margin: '4px 0 0' }}>Convert to tasks</h3>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-500)', marginTop: 3 }}>{cvIdeaTitle}</div>
                </div>
                <button onClick={cvClose} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="x" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} />
                </button>
              </div>
            </div>
            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'var(--info-100)', border: '1px solid #CBE3EC', color: 'var(--info-600)', padding: '10px 13px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
                <Icon name="workflow" style={{ width: 14, height: 14, flexShrink: 0 }} />
                <span>Effort decides how many tasks are created. The KPI you link is what those tasks advance — and it rolls up to its OKR.</span>
              </div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 8 }}>1 · Effort plan &amp; line</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <select value={f.planId || ''} onChange={cvSetPlan} style={{ width: '100%', minWidth: 0, padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, background: 'var(--paper)' }}>
                    {(cvPlanOptions || []).map((o, oi) => <option key={oi} value={o.v}>{o.label}</option>)}
                  </select>
                  <select value={f.rowType || ''} onChange={cvSetRow} style={{ width: '100%', minWidth: 0, padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, background: 'var(--paper)' }}>
                    {(cvRowOptions || []).map((o, oi) => <option key={oi} value={o.v}>{o.label}</option>)}
                  </select>
                  {Boolean(cvHasRow) && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: 'var(--orchid-700)' }}>
                      <Icon name="gauge" style={{ width: 12, height: 12 }} />
                      {cvEffortInfo}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 8 }}>2 · KPI</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 9 }}>
                  {(cvModeBtns || []).map((m, mi) => <button key={mi} onClick={m.set} style={cssTextToObject(m.style)}>{m.label}</button>)}
                </div>
                {Boolean(cvKpiExisting) && (
                  <select value={f.kpiId || ''} onChange={cvSetKpi} style={{ width: '100%', minWidth: 0, padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, background: 'var(--paper)' }}>
                    {(cvKpiOptions || []).map((o, oi) => <option key={oi} value={o.v}>{o.label}</option>)}
                  </select>
                )}
                {Boolean(cvKpiNew) && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1.6fr .7fr .8fr', gap: 8 }}>
                    <input value={f.newKpiName || ''} onChange={cvSetNewKpiName} placeholder="KPI name e.g. Article Sessions" style={{ minWidth: 0, padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, outline: 'none' }} />
                    <input value={f.newKpiUnit || ''} onChange={cvSetNewKpiUnit} placeholder="Unit" style={{ minWidth: 0, padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, outline: 'none' }} />
                    <input value={f.newKpiTarget || ''} onChange={cvSetNewKpiTarget} placeholder="Target" style={{ minWidth: 0, padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, outline: 'none' }} />
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 8 }}>3 · Tasks to generate</div>
                <div style={{ display: 'grid', gridTemplateColumns: '.6fr 1fr', gap: 8, marginBottom: 8 }}>
                  <input value={f.count || ''} onChange={cvSetCount} placeholder="How many" style={{ minWidth: 0, padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, outline: 'none' }} />
                  <select value={f.assignee || ''} onChange={cvSetAssignee} style={{ minWidth: 0, padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, background: 'var(--paper)' }}>
                    {(cvAssignees || []).map((a, ai) => <option key={ai} value={a}>{a}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 8 }}>
                  <input type="date" value={f.start || ''} onChange={cvSetStart} style={{ minWidth: 0, padding: '9px 11px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, outline: 'none', color: 'var(--ink-700)' }} />
                  <input type="date" value={f.end || ''} onChange={cvSetEnd} style={{ minWidth: 0, padding: '9px 11px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, outline: 'none', color: 'var(--ink-700)' }} />
                  <select value={f.reviewer || ''} onChange={cvSetReviewer} style={{ minWidth: 0, padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, background: 'var(--paper)' }}>
                    {(cvReviewers || []).map((r, ri) => <option key={ri} value={r}>{r}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)' }}>
                  <Icon name="list-checks" style={{ width: 12, height: 12 }} />
                  {cvCountNote}
                </div>
              </div>
            </div>
            <div style={{ position: 'sticky', bottom: 0, background: 'var(--paper)', padding: '14px 22px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={cvClose} style={{ padding: '10px 17px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={cvSave} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                <Icon name="check" style={{ width: 14, height: 14 }} />
                Generate tasks
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
