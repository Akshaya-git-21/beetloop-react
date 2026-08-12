import React from 'react';
import Icon from '../../components/Icon.jsx';

const label = { display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5 };
const input = { width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13, outline: 'none' };
const select = { ...input, background: 'var(--paper)' };

export default function TicketAssignModal({ vm }) {
  const {
    showAssignTicket, tktD, tktAmForm, tktAmStop,
    tktAmAssigneeOptions, tktAmSetAssignee,
    tktAmPriorityOptions, tktAmSetPriority,
    tktAmStatusOptions, tktAmSetStatus,
    tktAmCancel, tktAmSave,
  } = vm;
  if (!tktD) return null;
  const f = tktAmForm || {};
  return (
    <React.Fragment>
      {Boolean(showAssignTicket) && (
        <div onClick={tktAmCancel} style={{ position: 'fixed', inset: 0, zIndex: 185, background: 'rgba(31,8,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div onClick={tktAmStop} className="blscroll" style={{ width: '100%', maxWidth: 460, maxHeight: '100%', background: 'var(--paper)', borderRadius: 20, boxShadow: 'var(--shadow-xl)', overflowY: 'auto', animation: 'blrise .28s var(--ease-out)' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>{tktD.id}</div>
                <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 18, color: 'var(--ink-900)', margin: '4px 0 0' }}>Assign ticket</h3>
              </div>
              <button onClick={tktAmCancel} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="x" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} />
              </button>
            </div>

            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 13 }}>
              <div>
                <label style={label}>Assignee</label>
                <select value={f.assignee ? f.assignee : 'Unassigned'} onChange={tktAmSetAssignee} style={select}>
                  {(tktAmAssigneeOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={label}>Priority</label>
                  <select value={f.priority || ''} onChange={tktAmSetPriority} style={select}>
                    {(tktAmPriorityOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={label}>Status</label>
                  <select value={f.status || ''} onChange={tktAmSetStatus} style={select}>
                    {(tktAmStatusOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div style={{ position: 'sticky', bottom: 0, background: 'var(--paper)', padding: '14px 22px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={tktAmCancel} style={{ padding: '10px 17px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={tktAmSave} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                <Icon name="check" style={{ width: 14, height: 14 }} />Save Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
