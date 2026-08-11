import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function EditMasterRecordModal({ vm }) {
  const { showMasterRecordEdit, mrTitle, mrFieldRows, mrSave, mrCancel, mrCanDelete, mrDelete, stop } = vm;
  return (
    <React.Fragment>
      {Boolean(showMasterRecordEdit) && (
        <React.Fragment>
          <div onClick={mrCancel} style={{ position: 'fixed', inset: 0, background: 'rgba(31,8,20,.5)', backdropFilter: 'blur(3px)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
            <div onClick={stop} className="blscroll" style={{ width: '100%', maxWidth: 640, maxHeight: '88vh', overflowY: 'auto', background: 'var(--paper)', borderRadius: 22, boxShadow: 'var(--shadow-xl)', animation: 'blrise .3s var(--ease-out)' }}>
              <div style={{ padding: '22px 26px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'var(--paper)', borderRadius: '22px 22px 0 0' }}>
                <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 20, color: 'var(--ink-900)', margin: 0 }}>{mrTitle}</h3>
                <button onClick={mrCancel} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="x" style={{ width: 17, height: 17, color: 'var(--ink-700)' }} />
                </button>
              </div>

              <div style={{ padding: '22px 26px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {(mrFieldRows || []).map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 6 }}>{f.label}</label>
                    {f.isMulti ? (
                      <div>
                        {Boolean(f.multiChips && f.multiChips.length) && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                            {f.multiChips.map((c, ci) => (
                              <span key={ci} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 999, background: 'var(--orchid-100)', color: 'var(--orchid-700)', fontSize: 12, fontWeight: 700 }}>
                                {c.name}
                                <button onClick={c.remove} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: 'var(--orchid-700)' }}>
                                  <Icon name="x" style={{ width: 10, height: 10 }} />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        <select value={f.multiAddVal} onChange={f.onMultiAdd} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: 'var(--paper)', color: 'var(--ink-500)' }}>
                          {f.multiOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                      </div>
                    ) : f.readOnly ? (
                      <input value={f.value} readOnly placeholder={f.placeholder} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none', background: 'var(--surface-50)', color: 'var(--ink-500)', cursor: 'not-allowed' }} />
                    ) : f.isSelect ? (
                      <select value={f.value} onChange={f.onChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, background: 'var(--paper)' }}>
                        <option value="">— Select —</option>
                        {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    ) : (
                      <input value={f.value} onChange={f.onChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13.5, outline: 'none' }} />
                    )}
                  </div>
                ))}
              </div>

              <div style={{ padding: '16px 26px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, position: 'sticky', bottom: 0, background: 'var(--paper)', borderRadius: '0 0 22px 22px' }}>
                {mrCanDelete ? (
                  <button onClick={mrDelete} style={{ padding: '10px 16px', border: '1px solid var(--danger-300, #e5a3a3)', background: 'var(--paper)', color: 'var(--danger-600)', borderRadius: 11, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                ) : <span />}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={mrCancel} style={{ padding: '10px 18px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', color: 'var(--ink-700)' }}>Cancel</button>
                  <button onClick={mrSave} style={{ padding: '10px 20px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>Save entry</button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
