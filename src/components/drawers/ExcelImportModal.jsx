import React from 'react';
import Icon from '../../components/Icon.jsx';

const toneColor = { update:'var(--info-600)', create:'var(--verify-600)', skip:'var(--ink-400)', danger:'var(--danger-600)' };
const toneBg = { update:'var(--info-100)', create:'var(--verify-100)', skip:'var(--surface-50)', danger:'var(--danger-100)' };

export default function ExcelImportModal({ vm }) {
  const {
    xlImpOpen, xlImpTarget, xlImpTitle, xlImpStep, xlImpFileName, xlImpBusy, xlImpError,
    xlImpCreateNew, xlImpSetCreateNew, xlImpPick, xlImpDownloadTemplate, xlImpClose, xlImpStop,
    xlImpBack, xlImpRun, xlImpRows, xlImpHasRows, xlImpSummaryText, xlImpConfirmDisabled, xlImpConfirmLabel,
  } = vm;
  if (!xlImpOpen) return null;
  const isPreview = xlImpStep === 'preview';
  return (
    <div onClick={xlImpClose} style={{ position: 'fixed', inset: 0, zIndex: 180, background: 'rgba(31,8,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
      <div onClick={xlImpStop} style={{ width: '100%', maxWidth: isPreview ? 880 : 480, maxHeight: '86vh', display: 'flex', flexDirection: 'column', background: 'var(--paper)', borderRadius: 20, boxShadow: 'var(--shadow-xl)', animation: 'blrise .28s var(--ease-out)' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>
              {xlImpTarget === 'kpi' ? 'KPI Templates' : 'OKR & KPI'}
            </div>
            <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 19, color: 'var(--ink-900)', margin: '4px 0 0' }}>{xlImpTitle}</h3>
          </div>
          <button onClick={xlImpClose} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="x" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} />
          </button>
        </div>

        {!isPreview && (
          <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 13, overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-500)', padding: '10px 13px', borderRadius: 12, fontSize: 11.5 }}>
              <Icon name="info" style={{ width: 13, height: 13, flexShrink: 0, color: 'var(--orchid-600)' }} />
              {xlImpTarget === 'kpi'
                ? 'Match rows on KPI ID to update existing templates. Rows with an unmatched or blank ID are treated as new.'
                : 'Sheet "OKRs" matches on OKR ID; an optional "Key Results" sheet matches on OKR ID + KPI Name. Only columns you fill in are changed.'}
            </div>
            <button onClick={xlImpDownloadTemplate} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '9px 14px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>
              <Icon name="file-down" style={{ width: 14, height: 14 }} />Download Template
            </button>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, border: '1.5px dashed var(--line-300)', borderRadius: 14, padding: '26px 16px', cursor: 'pointer', textAlign: 'center' }}>
              <Icon name="upload" style={{ width: 22, height: 22, color: 'var(--orchid-500)' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{xlImpBusy ? 'Reading file…' : (xlImpFileName || 'Choose a .xlsx or .xls file')}</span>
              <span style={{ fontSize: 11.5, color: 'var(--ink-400)' }}>or drag it here</span>
              <input type="file" accept=".xlsx,.xls" onChange={xlImpPick} style={{ display: 'none' }} disabled={xlImpBusy} />
            </label>
            {Boolean(xlImpError) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--danger-100)', color: 'var(--danger-600)', padding: '9px 12px', borderRadius: 11, fontSize: 12 }}>
                <Icon name="alert-triangle" style={{ width: 13, height: 13, flexShrink: 0 }} />{xlImpError}
              </div>
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, fontWeight: 600, color: 'var(--ink-700)', cursor: 'pointer' }}>
              <input type="checkbox" checked={xlImpCreateNew} onChange={xlImpSetCreateNew} style={{ width: 15, height: 15, cursor: 'pointer' }} />
              Create new records for rows that don't match an existing ID
            </label>
          </div>
        )}

        {isPreview && (
          <React.Fragment>
            <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)' }}>{xlImpSummaryText}</div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: 'var(--ink-700)', cursor: 'pointer' }}>
                <input type="checkbox" checked={xlImpCreateNew} onChange={xlImpSetCreateNew} style={{ width: 14, height: 14, cursor: 'pointer' }} />
                Create new records
              </label>
            </div>
            <div style={{ overflow: 'auto', flex: 1, padding: '0 22px' }}>
              {xlImpHasRows ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ position: 'sticky', top: 0, background: 'var(--paper)' }}>
                      {['Excel Row', 'Record', 'Field', 'Existing Value', 'Excel Value', 'Action'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '9px 8px', borderBottom: '1px solid var(--line-300)', fontSize: 11, fontWeight: 700, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {xlImpRows.map((r, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--line-100)' }}>
                        <td style={{ padding: '7px 8px', color: 'var(--ink-400)' }}>{r.excelRow}</td>
                        <td style={{ padding: '7px 8px', fontWeight: 700, color: 'var(--ink-900)', whiteSpace: 'nowrap' }}>{r.record}</td>
                        <td style={{ padding: '7px 8px', color: 'var(--ink-700)', whiteSpace: 'nowrap' }}>{r.field}</td>
                        <td style={{ padding: '7px 8px', color: 'var(--ink-500)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.existing}</td>
                        <td style={{ padding: '7px 8px', color: 'var(--ink-900)', fontWeight: 600, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.excelVal}</td>
                        <td style={{ padding: '7px 8px' }}>
                          <span style={{ padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: toneBg[r.tone] || 'var(--surface-50)', color: toneColor[r.tone] || 'var(--ink-500)', whiteSpace: 'nowrap' }}>{r.action}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: '30px 0', textAlign: 'center', color: 'var(--ink-400)', fontSize: 13 }}>No rows matched, changed, or need creating — nothing to import.</div>
              )}
            </div>
          </React.Fragment>
        )}

        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0 }}>
          {isPreview
            ? <button onClick={xlImpBack} style={{ padding: '10px 17px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Back</button>
            : <button onClick={xlImpClose} style={{ padding: '10px 17px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>Cancel</button>}
          {isPreview && (
            <button onClick={xlImpRun} disabled={xlImpConfirmDisabled} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', border: 'none', background: xlImpConfirmDisabled ? 'var(--ink-400)' : '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: xlImpConfirmDisabled ? 'not-allowed' : 'pointer' }}>
              <Icon name="check" style={{ width: 14, height: 14 }} />{xlImpConfirmLabel || 'Confirm Import'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
