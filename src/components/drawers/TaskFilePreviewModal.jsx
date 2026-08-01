import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function TaskFilePreviewModal({ vm }) {
  const { fpvOpen, fpvName, fpvKind, fpvIcon, fpvIconBg, fpvIconColor, fpvHasContent,
    fpvIsImage, fpvIsPdf, fpvIsOther, fpvDataUrl, fpvSize, fpvClose, fpvStop, fpvGoRepo } = vm;
  return (
    <React.Fragment>
      {Boolean(fpvOpen) && (
        <div onClick={fpvClose} style={{ position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(31,8,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <div onClick={fpvStop} className="blscroll" style={{ width: '100%', maxWidth: 640, maxHeight: '100%', background: '#fff', borderRadius: 20, boxShadow: 'var(--shadow-xl)', overflowY: 'auto', animation: 'blrise .28s var(--ease-out)' }}>
            <div style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid var(--line-200)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, zIndex: 2 }}>
              <span style={{ width: 38, height: 38, borderRadius: 11, background: fpvIconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={fpvIcon} style={{ width: 18, height: 18, color: fpvIconColor }} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Space Mono'", fontSize: 13, fontWeight: 700, color: 'var(--ink-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fpvName}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 1 }}>{fpvKind}{fpvSize ? (' · ' + fpvSize) : ''}</div>
              </div>
              <button onClick={fpvClose} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line-300)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="x" style={{ width: 16, height: 16, color: 'var(--ink-700)' }} />
              </button>
            </div>
            <div style={{ padding: 20 }}>
              {Boolean(fpvHasContent) && (
                <React.Fragment>
                  {Boolean(fpvIsImage) && (
                    <img src={fpvDataUrl} alt={fpvName} style={{ width: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 12, border: '1px solid var(--line-200)', background: 'var(--surface-50)' }} />
                  )}
                  {Boolean(fpvIsPdf) && (
                    <iframe title={fpvName} src={fpvDataUrl} style={{ width: '100%', height: 420, border: '1px solid var(--line-200)', borderRadius: 12 }} />
                  )}
                  {Boolean(fpvIsOther) && (
                    <div style={{ border: '1.5px dashed var(--line-300)', borderRadius: 12, padding: 30, textAlign: 'center', color: 'var(--ink-500)' }}>
                      <Icon name={fpvIcon} style={{ width: 26, height: 26, color: 'var(--ink-400)' }} />
                      <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 8 }}>Inline preview isn't available for this file type — download it to view.</div>
                    </div>
                  )}
                  <a href={fpvDataUrl} download={fpvName} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 16, padding: '11px 18px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                    <Icon name="download" style={{ width: 14, height: 14 }} />
                    Download to my device
                  </a>
                </React.Fragment>
              )}
              {!fpvHasContent && (
                <React.Fragment>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'var(--info-100)', border: '1px solid #CBE3EC', color: 'var(--info-600)', padding: '13px 15px', borderRadius: 12, fontSize: 12.5, fontWeight: 600, lineHeight: 1.5 }}>
                    <Icon name="info" style={{ width: 15, height: 15, flexShrink: 0, marginTop: 1 }} />
                    <span>No file content is stored for this one — it was attached by name only (a legacy record, or entered without picking a real device file). Files chosen through "Choose files from your device" can be previewed and downloaded here directly.</span>
                  </div>
                  <button onClick={fpvGoRepo} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 14, width: '100%', padding: '10px 16px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                    <Icon name="folder-open" style={{ width: 14, height: 14 }} />
                    View this file's record in the Document Repository
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
