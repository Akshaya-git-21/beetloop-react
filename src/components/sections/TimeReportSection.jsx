import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function TimeReportSection({ vm }) {
  const { tkTabTime, trStats, trFilterDefs, trReset, trGroupTitle, trGroupRows, trRows, trEmpty, trPg } = vm;
  return (
    <React.Fragment>
      {Boolean(tkTabTime) && (
        <React.Fragment>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginBottom: 16 }}>
            {(trStats || []).map((s, i) => (
              <div key={i} style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 14, padding: '14px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{s.label}</div>
                <div style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 23, color: s.color, marginTop: 4 }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            {(trFilterDefs || []).map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 11, padding: '6px 10px' }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)' }}>{f.label}</span>
                <select value={f.value} onChange={f.onChange} style={{ border: 'none', background: 'none', fontSize: 13, fontWeight: 600, color: 'var(--ink-900)', outline: 'none', cursor: 'pointer', maxWidth: 230 }}>
                  {(f.opts || []).map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
                </select>
              </div>
            ))}
            <button onClick={trReset} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 12, fontWeight: 700, color: 'var(--ink-500)', cursor: 'pointer' }}>
              <Icon name="rotate-ccw" style={{ width: 12, height: 12 }} />Reset
            </button>
          </div>

          <div style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', padding: '18px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 12 }}>{trGroupTitle}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {(trGroupRows || []).map((g, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)', flex: 1, minWidth: 0 }}>{g.label}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-500)' }}>{g.tasks}</span>
                    <span style={{ fontSize: 12, color: 'var(--ink-700)' }}>est {g.est}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-900)' }}>actual {g.act}</span>
                    <span style={cssTextToObject(`font-size:11.5px;font-weight:800;color:${g.varianceColor};width:64px;text-align:right`)}>{g.variance}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: 'var(--line-200)', overflow: 'hidden' }}><div style={cssTextToObject(`height:100%;border-radius:99px;width:${g.pctW};background:${g.pctColor}`)} /></div>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 3 }}>{g.util}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1040 }}>
                <thead>
                  <tr style={{ background: 'var(--surface-50)' }}>
                    {['Task ID','Task','Assignee','Campaign','Est.','Actual','Variance','Status'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(trRows || []).map(r => (
                    <tr key={r.id} onClick={r.open} style={{ cursor: 'pointer' }}>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)', fontFamily: "'Space Mono'", fontSize: 11, fontWeight: 700, color: 'var(--ink-900)' }}>{r.id}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          {Boolean(r.running) && <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--danger-500)', flexShrink: 0 }} />}
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)' }}>{r.name}</span>
                        </div>
                        <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 2 }}>{r.division}</div>
                      </td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)', fontSize: 12.5, color: 'var(--ink-700)' }}>{r.assignee}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)', fontSize: 12, color: 'var(--ink-500)' }}>{r.campaign}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)', fontSize: 12.5, color: 'var(--ink-700)' }}>{r.est}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)' }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-900)' }}>{r.act}</div>
                        <div style={{ height: 4, borderRadius: 99, background: 'var(--line-200)', overflow: 'hidden', marginTop: 4, width: 70 }}><div style={cssTextToObject(`height:100%;border-radius:99px;width:${r.pctW};background:${r.pctColor}`)} /></div>
                      </td>
                      <td style={cssTextToObject(`padding:12px 16px;border-bottom:1px solid var(--line-200);font-size:12.5px;font-weight:800;color:${r.varianceColor}`)}>{r.variance}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)' }}>
                        <span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:999px;background:${r.statusBg};color:${r.statusColor}`)}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {Boolean(trEmpty) && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)' }}>
                <Icon name="timer-off" style={{ width: 24, height: 24, color: 'var(--ink-400)' }} />
                <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 9 }}>No tasks match these filters.</div>
              </div>
            )}
            {Boolean(trPg && trPg.show) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', background: 'var(--surface-50)', borderTop: '1px solid var(--line-200)' }}>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: 'var(--ink-500)' }}>{trPg.label}</span>
                <button onClick={trPg.prev} style={cssTextToObject(trPg.prevStyle)}><Icon name="chevron-left" style={{ width: 14, height: 14 }} />Prev</button>
                <button onClick={trPg.next} style={cssTextToObject(trPg.nextStyle)}>Next<Icon name="chevron-right" style={{ width: 14, height: 14 }} /></button>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
