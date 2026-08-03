import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function SopSection({ vm }) {
  const {
    showSop, sopGoPb, sopSegPb, sopGoSop, sopSegSop,
    sopIsList, sopStats, sopQuery, sopSetQuery, sopReset, sopCanAuthor, sopNewBtn,
    sopSearchHint, sopPermSet, sopFilters, sopRows, sopEmpty, sopPg,
  } = vm;
  return (
    <React.Fragment>
      {Boolean(showSop) && (
        <div style={{ display: 'inline-flex', background: 'var(--surface-50)', border: '1px solid var(--line-300)', borderRadius: 12, padding: 3, marginBottom: 16, flexWrap: 'wrap' }}>
          <button onClick={sopGoPb} style={cssTextToObject(sopSegPb)}><Icon name="book-open-check" style={{ width: 15, height: 15 }} />Brand Playbooks</button>
          <button onClick={sopGoSop} style={cssTextToObject(sopSegSop)}><Icon name="list-checks" style={{ width: 15, height: 15 }} />SOPs</button>
        </div>
      )}
      {Boolean(sopIsList) && (
        <React.Fragment>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(145px,1fr))', gap: 12, marginBottom: 16 }}>
            {(sopStats || []).map((s, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid var(--line-300)', borderRadius: 14, padding: '14px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{s.label}</div>
                <div style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 22, color: s.color, marginTop: 4 }}>{s.value}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--line-300)', borderRadius: 16, boxShadow: 'var(--shadow-sm)', padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
                <Icon name="search" style={{ width: 14, height: 14, color: 'var(--ink-400)', position: 'absolute', left: 11, top: 10 }} />
                <input value={sopQuery} onInput={sopSetQuery} placeholder="Search SOPs…" style={{ width: '100%', padding: '8px 11px 8px 33px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 12.5, outline: 'none' }} />
              </div>
              <button onClick={sopReset} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', border: '1px solid var(--line-300)', background: '#fff', borderRadius: 11, fontSize: 12, fontWeight: 700, color: 'var(--ink-500)', cursor: 'pointer' }}>
                <Icon name="rotate-ccw" style={{ width: 12, height: 12 }} />Reset
              </button>
              {Boolean(sopCanAuthor) && (
                <button onClick={sopNewBtn} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 15px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                  <Icon name="plus" style={{ width: 13, height: 13 }} />New SOP
                </button>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10.5, color: 'var(--ink-400)' }}>{sopSearchHint}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 800, padding: '2px 9px', borderRadius: 999, background: 'var(--surface-50)', border: '1px solid var(--line-300)', color: 'var(--ink-500)' }}>
                <Icon name="shield" style={{ width: 10, height: 10 }} />{sopPermSet}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 11, paddingTop: 11, borderTop: '1px solid var(--line-200)' }}>
              {(sopFilters || []).map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface-50)', border: '1px solid var(--line-300)', borderRadius: 10, padding: '5px 9px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-500)' }}>{f.label}</span>
                  <select value={f.value} onChange={f.onChange} style={{ border: 'none', background: 'none', fontSize: 12, fontWeight: 600, color: 'var(--beet-700)', outline: 'none', cursor: 'pointer', maxWidth: 170 }}>
                    {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div className="blscroll" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1220 }}>
                <thead>
                  <tr style={{ background: 'var(--surface-50)' }}>
                    {['SOP', 'Category', 'Priority', 'Frequency', 'Est. time', 'Linked', 'Next review', 'Sign-off', 'Status', 'Action'].map((h, i) => (
                      <th key={i} style={{ textAlign: 'left', padding: i === 0 ? '11px 16px' : (i === 9 ? '11px 16px' : '11px 12px'), fontSize: 10.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(sopRows || []).map(s => (
                    <React.Fragment key={s.id}>
                      <tr>
                        <td onClick={s.open} style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)', cursor: 'pointer', minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: "'Space Mono'", fontSize: 10.5, fontWeight: 700, color: 'var(--beet-700)' }}>{s.id}</span>
                            <span style={{ fontFamily: "'Space Mono'", fontSize: 10, fontWeight: 700, color: 'var(--orchid-700)' }}>{s.version}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{s.title}</span>
                          </div>
                          <div style={{ fontSize: 10, color: 'var(--ink-400)', marginTop: 2 }}>{s.division} · {s.stepCount} · updated {s.updated}</div>
                        </td>
                        <td style={{ padding: '12px 12px', borderBottom: '1px solid var(--line-200)', fontSize: 11.5, color: 'var(--ink-700)' }}>{s.category}</td>
                        <td style={{ padding: '12px 12px', borderBottom: '1px solid var(--line-200)' }}>
                          <span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${s.priBg};color:${s.priColor}`)}>{s.priority}</span>
                        </td>
                        <td style={{ padding: '12px 12px', borderBottom: '1px solid var(--line-200)', fontSize: 11.5, color: 'var(--ink-700)' }}>{s.frequency}</td>
                        <td style={{ padding: '12px 12px', borderBottom: '1px solid var(--line-200)', fontSize: 11.5, color: 'var(--ink-700)' }}>{s.estTime}</td>
                        <td style={{ padding: '12px 12px', borderBottom: '1px solid var(--line-200)' }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--orchid-700)' }}>{s.kpiCount}</div>
                          <div style={{ fontSize: 10, color: 'var(--ink-400)' }}>{s.sopCount}</div>
                        </td>
                        <td style={{ padding: '12px 12px', borderBottom: '1px solid var(--line-200)', fontSize: 10.5, fontWeight: 700, color: s.reviewColor }}>{s.reviewLabel}</td>
                        <td style={{ padding: '12px 12px', borderBottom: '1px solid var(--line-200)' }}>
                          <span style={cssTextToObject(`font-size:10px;font-weight:700;padding:3px 9px;border-radius:999px;background:${s.ackBg};color:${s.ackColor}`)}>{s.ackLabel}</span>
                        </td>
                        <td style={{ padding: '12px 12px', borderBottom: '1px solid var(--line-200)' }}>
                          <span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:999px;background:${s.statusBg};color:${s.statusColor}`)}>{s.status}</span>
                        </td>
                        <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line-200)' }}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button onClick={s.open} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 11px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 9, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                              <Icon name="book-open" style={{ width: 11, height: 11 }} />Read
                            </button>
                            <button onClick={s.toggle} style={{ width: 28, height: 28, borderRadius: 9, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Icon name="chevrons-up-down" style={{ width: 12, height: 12, color: 'var(--ink-500)' }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {Boolean(s.expanded) && (
                        <tr>
                          <td colSpan={10} style={{ padding: 0, borderBottom: '1px solid var(--line-200)', background: 'var(--surface-50)' }}>
                            <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 14 }}>
                              <div>
                                <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 4 }}>Trigger / event</div>
                                <div style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.45 }}>{s.trigger}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 4 }}>Linked KPIs</div>
                                <div style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.45 }}>{s.kpiNames}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 4 }}>Linked SOPs</div>
                                <div style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.45 }}>{s.sopNames}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 4 }}>Last executed</div>
                                <div style={{ fontSize: 11.5, color: 'var(--ink-700)' }}>{s.lastExecuted}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 4 }}>Approver</div>
                                <div style={{ fontSize: 11.5, color: 'var(--ink-700)' }}>{s.approver}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 4 }}>Tags</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                  {(s.tagList || []).map((t, i) => (
                                    <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: '#fff', border: '1px solid var(--line-300)', color: 'var(--ink-700)' }}>{t.label}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {Boolean(sopEmpty) && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)' }}>
                <Icon name="book-open-check" style={{ width: 24, height: 24, color: 'var(--ink-400)' }} />
                <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 9 }}>No SOPs match these filters.</div>
              </div>
            )}

            {Boolean(sopPg && sopPg.show) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', background: 'var(--surface-50)', borderTop: '1px solid var(--line-200)' }}>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: 'var(--ink-500)' }}>{sopPg.label}</span>
                <button onClick={sopPg.prev} style={cssTextToObject(sopPg.prevStyle)}><Icon name="chevron-left" style={{ width: 14, height: 14 }} />Prev</button>
                <button onClick={sopPg.next} style={cssTextToObject(sopPg.nextStyle)}>Next<Icon name="chevron-right" style={{ width: 14, height: 14 }} /></button>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
