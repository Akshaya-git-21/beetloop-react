import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function SupportSection({ vm }) {
  const {
    supIsList, supStats, supCatCards, supScopeBtns, supFilters, supReset, supNew,
    supRows, supEmpty, supPg,
  } = vm;
  return (
    <React.Fragment>
      {Boolean(supIsList) && (
        <React.Fragment>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 16 }}>
            {(supStats || []).map((s, i) => (
              <div key={i} style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 14, padding: '14px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{s.label}</div>
                <div style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 22, color: s.color, marginTop: 4 }}>{s.value}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', padding: '16px 18px', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 11 }}>What do you need help with? — pick a category to raise a ticket</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 10 }}>
              {(supCatCards || []).map((c, i) => (
                <button key={i} onClick={c.pick} style={{ textAlign: 'left', padding: '13px 15px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 13, cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--orchid-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={c.icon} style={{ width: 15, height: 15, color: 'var(--orchid-600)' }} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-900)' }}>{c.label}</span>
                    <span style={{ display: 'block', fontSize: 10.5, color: 'var(--ink-500)', marginTop: 2, lineHeight: 1.4 }}>{c.hint}</span>
                    <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--orchid-700)', marginTop: 4 }}>{c.queue} · {c.sla}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            {(supScopeBtns || []).map((b, i) => (
              <button key={i} onClick={b.set} style={cssTextToObject(b.style)}>{b.label}</button>
            ))}
            {(supFilters || []).map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 11, padding: '6px 10px' }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-500)' }}>{f.label}</span>
                <select value={f.value} onChange={f.onChange} style={{ border: 'none', background: 'none', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-900)', outline: 'none', cursor: 'pointer', maxWidth: 180 }}>
                  {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button onClick={supReset} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 12, fontWeight: 700, color: 'var(--ink-500)', cursor: 'pointer' }}>
              <Icon name="rotate-ccw" style={{ width: 12, height: 12 }} />Reset
            </button>
            <button onClick={supNew} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 15px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', marginLeft: 'auto' }}>
              <Icon name="plus" style={{ width: 13, height: 13 }} />Raise a ticket
            </button>
          </div>

          <div style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div className="blscroll" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1180 }}>
                <thead>
                  <tr style={{ background: 'var(--surface-50)' }}>
                    {['Ticket', 'Category', 'Raised by', 'Priority', 'Assignee', 'SLA', 'Status', 'Action'].map((h, i) => (
                      <th key={i} style={{ textAlign: 'left', padding: i === 0 ? '11px 18px' : (i === 7 ? '11px 18px' : '11px 14px'), fontSize: 10.5, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(supRows || []).map(t => (
                    <tr key={t.id}>
                      <td onClick={t.open} style={{ padding: '12px 18px', borderBottom: '1px solid var(--line-200)', cursor: 'pointer', minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontFamily: "'Space Mono'", fontSize: 10.5, fontWeight: 700, color: 'var(--ink-900)' }}>{t.id}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{t.subject}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 3, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 10, color: 'var(--ink-400)' }}>{t.ageLabel} · {t.replies} replies</span>
                          {Boolean(t.hasTask) && <span style={{ fontFamily: "'Space Mono'", fontSize: 9.5, fontWeight: 700, padding: '1px 7px', borderRadius: 5, background: 'var(--info-100)', color: 'var(--info-600)' }}>{t.task}</span>}
                          {Boolean(t.training) && <span style={{ fontSize: 9.5, fontWeight: 800, padding: '1px 7px', borderRadius: 5, background: 'var(--orchid-100)', color: 'var(--orchid-700)' }}>TRAINING</span>}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--line-200)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Icon name={t.catIcon} style={{ width: 12, height: 12, color: 'var(--orchid-600)', flexShrink: 0 }} />
                          <span style={{ fontSize: 11.5, color: 'var(--ink-700)' }}>{t.cat}</span>
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--ink-400)', marginTop: 1 }}>{t.queue}</div>
                      </td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--line-200)' }}>
                        <div style={{ fontSize: 12, color: 'var(--ink-900)', fontWeight: 600 }}>{t.by}</div>
                        <div style={{ fontSize: 10, color: 'var(--ink-400)' }}>{t.byRole}</div>
                      </td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--line-200)', fontSize: 12, fontWeight: 700, color: t.priColor }}>{t.priority}</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--line-200)', fontSize: 12, color: 'var(--ink-700)' }}>{t.assignee}</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--line-200)', fontSize: 10.5, fontWeight: 700, color: t.slaColor }}>{t.sla}</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--line-200)' }}>
                        <span style={cssTextToObject(`font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:999px;background:${t.statusBg};color:${t.statusColor}`)}>{t.status}</span>
                      </td>
                      <td style={{ padding: '12px 18px', borderBottom: '1px solid var(--line-200)' }}>
                        <button onClick={t.open} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 9, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>
                          <Icon name="eye" style={{ width: 12, height: 12 }} />Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {Boolean(supEmpty) && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)' }}>
                <Icon name="life-buoy" style={{ width: 24, height: 24, color: 'var(--ink-400)' }} />
                <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 9 }}>No tickets match these filters.</div>
              </div>
            )}

            {Boolean(supPg && supPg.show) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', background: 'var(--surface-50)', borderTop: '1px solid var(--line-200)' }}>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: 'var(--ink-500)' }}>{supPg.label}</span>
                <button onClick={supPg.prev} style={cssTextToObject(supPg.prevStyle)}><Icon name="chevron-left" style={{ width: 14, height: 14 }} />Prev</button>
                <button onClick={supPg.next} style={cssTextToObject(supPg.nextStyle)}>Next<Icon name="chevron-right" style={{ width: 14, height: 14 }} /></button>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
