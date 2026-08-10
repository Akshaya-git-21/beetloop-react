import React from 'react';
import Icon from '../../components/Icon.jsx';

const label = { display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5 };
const select = { width: '100%', padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13, outline: 'none', background: '#fff' };

const STATUS_OPTIONS = ['Published', 'Draft', 'Under Review', 'SEO Review', 'Scheduled', 'Archived'];

export default function ContentBulkUpdateModal({ vm }) {
  const { contentBulkOpen, contentBulkStatus, contentBulkSetStatus, contentBulkClose, contentBulkStop, contentBulkApply, contentBulkMatchCount } = vm;
  return (
    <React.Fragment>
      {Boolean(contentBulkOpen) && (
        <div onClick={contentBulkClose} style={{ position: 'fixed', inset: 0, zIndex: 180, background: 'rgba(31,8,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div onClick={contentBulkStop} style={{ width: '100%', maxWidth: 440, background: '#fff', borderRadius: 20, boxShadow: 'var(--shadow-xl)', animation: 'blrise .28s var(--ease-out)' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>Content Repository</div>
                <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 19, color: 'var(--beet-700)', margin: '4px 0 0' }}>Bulk update status</h3>
              </div>
              <button onClick={contentBulkClose} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="x" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} />
              </button>
            </div>
            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--info-100)', border: '1px solid #CBE3EC', color: 'var(--info-600)', padding: '10px 13px', borderRadius: 12, fontSize: 12.5 }}>
                <Icon name="filter" style={{ width: 14, height: 14, flexShrink: 0 }} />
                Applies to the {contentBulkMatchCount} page{contentBulkMatchCount === 1 ? '' : 's'} matching your current search/status filters.
              </div>
              <div>
                <label style={label}>New status</label>
                <select value={contentBulkStatus} onChange={contentBulkSetStatus} style={select}>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={contentBulkClose} style={{ padding: '10px 17px', border: '1px solid var(--line-300)', background: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={contentBulkApply} disabled={!contentBulkMatchCount} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', border: 'none', background: contentBulkMatchCount ? '#7A1C46' : 'var(--ink-400)', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: contentBulkMatchCount ? 'pointer' : 'not-allowed' }}>
                <Icon name="check" style={{ width: 14, height: 14 }} />Apply to {contentBulkMatchCount} page{contentBulkMatchCount === 1 ? '' : 's'}
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
