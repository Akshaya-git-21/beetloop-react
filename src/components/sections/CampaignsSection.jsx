import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function CampaignsSection({ vm }) {
  const { showCampaigns, cmpStats, cmpOwnNote, cmpFilterDefs, cmpReset, cmpRows, cmpCanEdit, cmpEmpty, cmpPg } = vm;
  return (
    <React.Fragment>
      {Boolean(showCampaigns) && (
        <React.Fragment>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginBottom: 18 }}>
            {(cmpStats || []).map((s, i) => (
              <div key={i} style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 14, padding: '14px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{s.label}</div>
                <div style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 24, color: s.color, marginTop: 4 }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--info-100)', border: '1px solid #CBE3EC', color: 'var(--info-600)', padding: '11px 15px', borderRadius: 14, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
            <Icon name="workflow" style={{ width: 16, height: 16, flexShrink: 0 }} />
            <span>Campaign → linked KPIs → effort lines → tasks. A campaign sets the goal and audience; its KPIs become measurable targets, effort lines set the output volume, and the Effort Planner generates the assignable tasks.</span>
          </div>

          {Boolean(cmpOwnNote) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-500)', padding: '11px 15px', borderRadius: 14, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
              <Icon name="lock" style={{ width: 16, height: 16, flexShrink: 0 }} />
              <span>Showing campaigns you are assigned to.</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            {(cmpFilterDefs || []).map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 11, padding: '6px 10px' }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)' }}>{f.label}</span>
                <select value={f.value} onChange={f.onChange} style={{ border: 'none', background: 'none', fontSize: 13, fontWeight: 600, color: 'var(--ink-900)', outline: 'none', cursor: 'pointer' }}>
                  {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button onClick={cmpReset} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 12, fontWeight: 700, color: 'var(--ink-500)', cursor: 'pointer' }}>
              <Icon name="rotate-ccw" style={{ width: 12, height: 12 }} />Reset
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
            {(cmpRows || []).map(c => (
              <div key={c.id} onClick={c.open} style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 11, cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--orchid-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="megaphone" style={{ width: 16, height: 16, color: 'var(--orchid-600)' }} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ fontFamily: "'Space Mono'", fontSize: 10.5, fontWeight: 700, color: 'var(--ink-900)' }}>{c.id}</span>
                      <span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:999px;background:${c.statusBg};color:${c.statusColor}`)}>{c.status}</span>
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ink-900)', marginTop: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>{c.brand} · {c.dept} · {c.type}</div>
                  </div>
                  {Boolean(cmpCanEdit) && (
                    <button onClick={c.edit} style={{ padding: '6px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 9, fontSize: 11.5, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Edit</button>
                  )}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-700)', lineHeight: 1.5 }}>{c.goal}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)' }}>KPI achievement</span>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--ink-900)' }}>{c.progress}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: 'var(--line-200)', overflow: 'hidden' }}>
                    <div style={cssTextToObject(`height:100%;border-radius:99px;width:${c.progressW};background:${c.progressColor}`)} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: 'var(--orchid-100)', color: 'var(--orchid-700)' }}>{c.kpiCount}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-700)' }}>{c.effortCount}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-700)' }}>{c.taskLabel}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-700)' }}>{c.teamSize} in team</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: 'var(--ink-500)', borderTop: '1px solid var(--line-200)', paddingTop: 9 }}>
                  <Icon name="calendar" style={{ width: 12, height: 12 }} />{c.dates}
                  <span style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--ink-700)' }}>{c.owner}</span>
                </div>
              </div>
            ))}
          </div>

          {Boolean(cmpEmpty) && (
            <div style={{ padding: 44, textAlign: 'center', color: 'var(--ink-500)', background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18 }}>
              <Icon name="megaphone" style={{ width: 26, height: 26, color: 'var(--ink-400)' }} />
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10 }}>No campaigns match these filters.</div>
            </div>
          )}

          {Boolean(cmpPg && cmpPg.show) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 4px' }}>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: 'var(--ink-500)' }}>{cmpPg.label}</span>
              <button onClick={cmpPg.prev} style={cssTextToObject(cmpPg.prevStyle)}><Icon name="chevron-left" style={{ width: 14, height: 14 }} />Prev</button>
              <button onClick={cmpPg.next} style={cssTextToObject(cmpPg.nextStyle)}>Next<Icon name="chevron-right" style={{ width: 14, height: 14 }} /></button>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
