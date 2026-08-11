import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function ContentCalendarSection({ vm }) {
  const {
    tkTabCal, calStats, calPrev, calNext, calToday, calTodayLabel, calTitle, calScopeLabel,
    calFilters, calReset, calExport, calIsGantt, calIsGrid,
    calGanttGroupBy, calGanttTicks, calGanttRows, calGanttHasToday, calGanttTodayLeft, calGanttEmpty,
    calCols, calDows, calCells, calLegend, calHasUnscheduled, calUnscheduled,
  } = vm;
  return (
    <React.Fragment>
      {Boolean(tkTabCal) && (
        <React.Fragment>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginBottom: 14 }}>
            {(calStats || []).map((s, i) => (
              <div key={i} style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 14, padding: '14px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{s.label}</div>
                <div style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 22, color: s.color, marginTop: 4 }}>{s.value}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            <button onClick={calPrev} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="chevron-left" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} /></button>
            <button onClick={calNext} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="chevron-right" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} /></button>
            <button onClick={calToday} style={{ padding: '8px 13px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 10, fontSize: 12, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>{calTodayLabel}</button>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 17, color: 'var(--ink-900)' }}>{calTitle}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginTop: 1 }}>{calScopeLabel}</div>
            </div>
            <div style={{ flex: 1 }} />
            {(calFilters || []).map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 11, padding: '6px 10px' }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)' }}>{f.label}</span>
                <select value={f.value} onChange={f.onChange} style={{ border: 'none', background: 'none', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-900)', outline: 'none', cursor: 'pointer', maxWidth: 150 }}>
                  {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button onClick={calReset} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 12, fontWeight: 700, color: 'var(--ink-500)', cursor: 'pointer' }}><Icon name="rotate-ccw" style={{ width: 12, height: 12 }} />Reset</button>
            <button onClick={calExport} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 13px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><Icon name="download" style={{ width: 13, height: 13 }} />Export .ics</button>
          </div>

          {Boolean(calIsGantt) && (
            <div style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <Icon name="gantt-chart" style={{ width: 15, height: 15, color: 'var(--orchid-600)', flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-900)', flex: 1 }}>Timeline — {calGanttGroupBy}</span>
                <span style={{ fontSize: 10.5, color: 'var(--ink-400)' }}>Bar spans start → end · red bars are overdue · click to open the task</span>
              </div>
              <div className="blscroll" style={{ overflowX: 'auto' }}>
                <div style={{ minWidth: 900 }}>
                  <div style={{ display: 'flex', padding: '0 0 0 210px', background: 'var(--surface-50)', borderBottom: '1px solid var(--line-200)' }}>
                    {(calGanttTicks || []).map((t, i) => (
                      <div key={i} style={cssTextToObject(`width:${t.w};padding:7px 0;text-align:center;font-size:9px;font-weight:700;color:var(--ink-400);background:${t.bg};border-right:1px solid var(--line-200)`)}>{t.d}</div>
                    ))}
                  </div>
                  {(calGanttRows || []).map((g, gi) => (
                    <div key={gi} style={{ borderBottom: '1px solid var(--line-200)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 18px', background: 'var(--surface-50)' }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-900)', flex: 1, minWidth: 0 }}>{g.label}</span>
                        <span style={{ fontSize: 10.5, color: 'var(--ink-500)' }}>{g.count}</span>
                        <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--danger-600)' }}>{g.late}</span>
                      </div>
                      {(g.bars || []).map((b, bi) => (
                        <div key={bi} style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid var(--line-200)' }}>
                          <div onClick={b.open} style={{ width: 210, flexShrink: 0, padding: '7px 12px', cursor: 'pointer', minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontFamily: "'Space Mono'", fontSize: 9.5, fontWeight: 700, color: 'var(--ink-900)', flexShrink: 0 }}>{b.id}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.name}</span>
                            </div>
                            <div style={{ fontSize: 9.5, color: 'var(--ink-400)', marginTop: 1 }}>{b.dates} · {b.hours}</div>
                          </div>
                          <div style={{ flex: 1, position: 'relative', height: 34 }}>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
                              {(calGanttTicks || []).map((t, ti) => (
                                <div key={ti} style={cssTextToObject(`width:${t.w};background:${t.bg};border-right:1px solid var(--line-200)`)} />
                              ))}
                            </div>
                            {Boolean(calGanttHasToday) && (
                              <div style={cssTextToObject(`position:absolute;top:0;bottom:0;width:2px;left:${calGanttTodayLeft};background:var(--orchid-500);opacity:.7`)} />
                            )}
                            <div onClick={b.open} title={b.name} style={cssTextToObject(`position:absolute;top:8px;height:18px;left:${b.left};width:${b.width};background:${b.bg};border-radius:6px;cursor:pointer;display:flex;align-items:center;padding:0 7px;overflow:hidden`)}>
                              <span style={{ fontSize: 9.5, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap' }}>{b.status} {b.lateNote}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                  {Boolean(calGanttEmpty) && (
                    <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)' }}>
                      <Icon name="gantt-chart" style={{ width: 22, height: 22, color: 'var(--ink-400)' }} />
                      <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 8 }}>No scheduled tasks in this month.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {Boolean(calIsGrid) && (
            <div style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={cssTextToObject(`display:grid;grid-template-columns:${calCols};background:var(--surface-50);border-bottom:1px solid var(--line-200)`)}>
                {(calDows || []).map((d, i) => (
                  <div key={i} style={{ padding: '9px 10px', fontSize: 10.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', textAlign: 'center' }}>{d}</div>
                ))}
              </div>
              <div style={cssTextToObject(`display:grid;grid-template-columns:${calCols}`)}>
                {(calCells || []).map((c, i) => (
                  <div key={i} style={cssTextToObject(`min-height:112px;border-right:1px solid var(--line-200);border-bottom:1px solid var(--line-200);padding:7px 8px;background:${c.bg};display:flex;flex-direction:column;gap:4px;min-width:0`)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={cssTextToObject(`font-family:'Sora';font-weight:800;font-size:13px;color:${c.dayColor}`)}>{c.day}</span>
                      <span style={{ flex: 1 }} />
                      <span style={cssTextToObject(`font-size:9.5px;font-weight:700;color:${c.hoursColor}`)}>{c.hoursLabel}</span>
                    </div>
                    {Boolean(c.over) && (
                      <span style={{ fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 5, background: 'var(--danger-100)', color: 'var(--danger-600)', alignSelf: 'flex-start' }}>{c.overCap}</span>
                    )}
                    {(c.items || []).map((it, ii) => (
                      <div key={ii} onClick={it.open} title={it.name} style={cssTextToObject(`padding:3px 6px;border-radius:6px;background:${it.bg};color:${it.color};font-size:10px;font-weight:700;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{it.marker} {it.name}</div>
                    ))}
                    <span style={{ fontSize: 9.5, color: 'var(--ink-400)' }}>{c.more}</span>
                    {Boolean(c.overdueLabel) && <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--danger-600)' }}>{c.overdueLabel}</span>}
                  </div>
                ))}
              </div>
              <div style={{ padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', background: 'var(--surface-50)', borderTop: '1px solid var(--line-200)' }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>Legend</span>
                {(calLegend || []).map((l, i) => (
                  <span key={i} style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:999px;background:${l.bg};color:${l.color}`)}>{l.label}</span>
                ))}
                <span style={{ fontSize: 10.5, color: 'var(--ink-500)' }}>▸ due · ▪ start</span>
              </div>
            </div>
          )}

          {Boolean(calHasUnscheduled) && (
            <div style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 16, boxShadow: 'var(--shadow-sm)', padding: '14px 17px', marginTop: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 9 }}>Unscheduled — no due date</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {(calUnscheduled || []).map((u, i) => (
                  <button key={i} onClick={u.open} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 11px', border: '1px dashed var(--line-300)', background: 'var(--paper)', borderRadius: 9, fontSize: 11.5, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>
                    <Icon name="calendar-plus" style={{ width: 11, height: 11, color: 'var(--orchid-600)' }} />{u.id} · {u.name}<span style={{ fontWeight: 500, color: 'var(--ink-400)' }}>{u.who}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
