import React from 'react';
import Icon from '../../components/Icon.jsx';

const label = { display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5 };
const input = { width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13, outline: 'none' };
const select = { ...input, background: 'var(--paper)' };

export default function CreateRepositoryModal({ vm }) {
  const { repoFormOpen, rf, repoClose, repoStop, repoSetName, repoSetDesc, repoCatOptions, repoSetCat, repoOwnerOptions, repoSetOwner, repoSave, repoIsEdit, repoFormTitle, repoSaveLabel } = vm;
  const f = rf || {};
  return (
    <React.Fragment>
      {Boolean(repoFormOpen) && (
        <div onClick={repoClose} style={{ position: 'fixed', inset: 0, zIndex: 180, background: 'rgba(31,8,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div onClick={repoStop} className="blscroll" style={{ width: '100%', maxWidth: 560, maxHeight: '100%', background: 'var(--paper)', borderRadius: 20, boxShadow: 'var(--shadow-xl)', overflowY: 'auto', animation: 'blrise .28s var(--ease-out)' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>Repositories</div>
                <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 19, color: 'var(--ink-900)', margin: '4px 0 0' }}>{repoFormTitle || 'New repository'}</h3>
              </div>
              <button onClick={repoClose} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="x" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} />
              </button>
            </div>
            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 13 }}>
              <div>
                <label style={label}>Repository name <span style={{ color: 'var(--danger-600)' }}>*</span></label>
                <input value={f.name || ''} onInput={repoSetName} placeholder="e.g. Competitor Research" style={input} />
              </div>
              <div>
                <label style={label}>What it holds</label>
                <textarea value={f.desc || ''} onInput={repoSetDesc} rows={2} placeholder="What belongs in this repository and who maintains it." style={{ ...input, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={label}>Category</label>
                  <select value={f.cat || ''} onChange={repoSetCat} style={select}>
                    {(repoCatOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={label}>Owner</label>
                  <select value={f.owner || ''} onChange={repoSetOwner} style={select}>
                    {(repoOwnerOptions || []).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              {!repoIsEdit && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-500)', padding: '10px 13px', borderRadius: 12, fontSize: 11.5 }}>
                  <Icon name="info" style={{ width: 13, height: 13, flexShrink: 0, color: 'var(--orchid-600)' }} />
Starts empty — open it from the list afterwards to add, edit or remove records.
                </div>
              )}
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={repoClose} style={{ padding: '10px 17px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={repoSave} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                <Icon name="check" style={{ width: 14, height: 14 }} />{repoSaveLabel || 'Create repository'}
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
