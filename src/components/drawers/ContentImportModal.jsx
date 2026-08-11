import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function ContentImportModal({ vm }) {
  const { contentImportOpen, contentImportFileName, contentImportPick, contentImportClose, contentImportStop, contentImportRun } = vm;
  return (
    <React.Fragment>
      {Boolean(contentImportOpen) && (
        <div onClick={contentImportClose} style={{ position: 'fixed', inset: 0, zIndex: 180, background: 'rgba(31,8,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div onClick={contentImportStop} style={{ width: '100%', maxWidth: 460, background: 'var(--paper)', borderRadius: 20, boxShadow: 'var(--shadow-xl)', animation: 'blrise .28s var(--ease-out)' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>Content Repository</div>
                <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 19, color: 'var(--ink-900)', margin: '4px 0 0' }}>Import pages from CSV</h3>
              </div>
              <button onClick={contentImportClose} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="x" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} />
              </button>
            </div>
            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-500)', padding: '10px 13px', borderRadius: 12, fontSize: 11.5 }}>
                <Icon name="info" style={{ width: 13, height: 13, flexShrink: 0, color: 'var(--orchid-600)' }} />
                Columns: <b>Title</b> (required), Topic, Type, Status, Keyword. Imported pages land as Service pages, editable afterwards.
              </div>
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, border: '1.5px dashed var(--line-300)', borderRadius: 14, padding: '26px 16px', cursor: 'pointer', textAlign: 'center' }}>
                <Icon name="upload" style={{ width: 22, height: 22, color: 'var(--orchid-500)' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{contentImportFileName || 'Choose a .csv file'}</span>
                <span style={{ fontSize: 11.5, color: 'var(--ink-400)' }}>or drag it here</span>
                <input type="file" accept=".csv,text/csv" onChange={contentImportPick} style={{ display: 'none' }} />
              </label>
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={contentImportClose} style={{ padding: '10px 17px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={contentImportRun} disabled={!contentImportFileName} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', border: 'none', background: contentImportFileName ? '#7A1C46' : 'var(--ink-400)', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: contentImportFileName ? 'pointer' : 'not-allowed' }}>
                <Icon name="upload" style={{ width: 14, height: 14 }} />Import
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
