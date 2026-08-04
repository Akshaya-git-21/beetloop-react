import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

function Tokens({ tokens }) {
  return (
    <React.Fragment>
      {(tokens || []).map((tk, i) => {
        if (tk.bold) return <span key={i} style={{ fontWeight: 700, color: 'var(--ink-900)' }}>{tk.text}</span>;
        if (tk.code) return <span key={i} style={{ fontFamily: "'Space Mono'", fontSize: '.92em', background: 'var(--surface-50)', border: '1px solid var(--line-200)', borderRadius: 5, padding: '1px 5px', color: 'var(--beet-700)' }}>{tk.text}</span>;
        return <span key={i}>{tk.text}</span>;
      })}
    </React.Fragment>
  );
}

function Block({ bl }) {
  if (bl.isH) return <div style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 15, color: 'var(--beet-700)', marginTop: 6 }}>{bl.text}</div>;
  if (bl.isP) return <div style={{ fontSize: 13.5, color: 'var(--ink-700)', lineHeight: 1.6 }}><Tokens tokens={bl.tokens} /></div>;
  if (bl.isList) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {(bl.items || []).map((it, i) => (
        <div key={i} style={{ display: 'flex', gap: 9 }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: 'var(--orchid-500)', flexShrink: 0, marginTop: 7 }} />
          <span style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.55 }}><Tokens tokens={it.tokens} /></span>
        </div>
      ))}
    </div>
  );
  if (bl.isNote) return (
    <div style={{ display: 'flex', gap: 9, background: 'var(--orchid-100)', border: '1px solid #E4CBD9', borderRadius: 12, padding: '12px 14px' }}>
      <Icon name="info" style={{ width: 14, height: 14, color: 'var(--orchid-700)', flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--orchid-700)', lineHeight: 1.55 }}><Tokens tokens={bl.tokens} /></span>
    </div>
  );
  if (bl.isTable) return (
    <div className="blscroll" style={{ overflowX: 'auto', border: '1px solid var(--line-200)', borderRadius: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
        <thead>
          <tr style={{ background: 'var(--surface-50)' }}>
            {(bl.cols || []).map((c, i) => (
              <th key={i} style={{ textAlign: 'left', padding: '9px 13px', fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{c.v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(bl.rows || []).map((r, i) => (
            <tr key={i}>
              {(r.cells || []).map((c, j) => (
                <td key={j} style={{ padding: '10px 13px', borderTop: '1px solid var(--line-200)', fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.5 }}><Tokens tokens={c.tokens} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  if (bl.isDo) return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 11 }}>
      <div style={{ border: '1px solid #BFE3D0', background: 'var(--verify-100)', borderRadius: 12, padding: '13px 15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--verify-600)', marginBottom: 8 }}>
          <Icon name="check-circle-2" style={{ width: 12, height: 12 }} />We do
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {(bl.dos || []).map((d, i) => <div key={i} style={{ fontSize: 12, color: 'var(--verify-600)', fontWeight: 600, lineHeight: 1.5 }}>{d.text}</div>)}
        </div>
      </div>
      <div style={{ border: '1px solid #F1C9CF', background: 'var(--danger-100)', borderRadius: 12, padding: '13px 15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--danger-600)', marginBottom: 8 }}>
          <Icon name="x-circle" style={{ width: 12, height: 12 }} />We never
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {(bl.donts || []).map((d, i) => <div key={i} style={{ fontSize: 12, color: 'var(--danger-600)', fontWeight: 600, lineHeight: 1.5 }}>{d.text}</div>)}
        </div>
      </div>
    </div>
  );
  if (bl.isSwatch) return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
      {(bl.swatches || []).map((s, i) => (
        <div key={i} style={{ border: '1px solid var(--line-200)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ height: 44, background: s.hex }} />
          <div style={{ padding: '9px 12px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-900)' }}>{s.name}</div>
            <div style={{ fontFamily: "'Space Mono'", fontSize: 10.5, color: 'var(--ink-500)', marginTop: 1 }}>{s.hex}</div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 3, lineHeight: 1.45 }}>{s.use}</div>
          </div>
        </div>
      ))}
    </div>
  );
  if (bl.isIcp) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(bl.icps || []).map((p, i) => (
        <div key={i} style={{ border: '1px solid var(--line-300)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '13px 16px', background: 'var(--surface-50)', borderBottom: '1px solid var(--line-200)' }}>
            <div style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 14.5, color: 'var(--beet-700)' }}>{p.name}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 3, lineHeight: 1.5 }}>{p.who}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 7 }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: '#fff', border: '1px solid var(--line-300)', color: 'var(--ink-700)' }}>{p.size}</span>
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: '#fff', border: '1px solid var(--line-300)', color: 'var(--ink-700)' }}>{p.geo}</span>
            </div>
          </div>
          <div style={{ padding: '13px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 13 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--danger-600)', marginBottom: 5 }}>Pains</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {(p.pains || []).map((x, j) => <div key={j} style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.45 }}>· {x.text}</div>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--warn-600)', marginBottom: 5 }}>Buying triggers</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {(p.triggers || []).map((x, j) => <div key={j} style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.45 }}>· {x.text}</div>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--info-600)', marginBottom: 5 }}>Where they are</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {(p.channels || []).map((x, j) => <div key={j} style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.45 }}>· {x.text}</div>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 5 }}>Objections</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {(p.objections || []).map((x, j) => <div key={j} style={{ fontSize: 11.5, color: 'var(--ink-700)', lineHeight: 1.45 }}>· {x.text}</div>)}
              </div>
            </div>
          </div>
          <div style={{ padding: '11px 16px', borderTop: '1px solid var(--line-200)', background: 'var(--orchid-100)' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--orchid-700)', marginBottom: 3 }}>Lead with this</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--orchid-700)', lineHeight: 1.5 }}>{p.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
  return null;
}

export default function BrandPlaybookSection({ vm }) {
  const {
    pbIsOpen, pbEmpty, pbEmptyNote, pbBrandTabs, pbBrandName, pbBrandTagline, pbBrandSector, pbBrandSite,
    pbProgress, pbProgressW, pbChapters, pbCur, pbBlocks, pbEditable, pbEdit,
    pbMarkRead, pbGovLocked, pbGovNote, pbPrev, pbNext,
    pbQuery, pbSetQuery, pbHasHits, pbHits,
  } = vm;
  if (pbEmpty) {
    return (
      <React.Fragment>
        {Boolean(pbIsOpen) && (
          <div style={{ background: '#fff', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', padding: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
            <Icon name="tag" style={{ width: 22, height: 22, color: 'var(--ink-400)' }} />
            <div style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 15, color: 'var(--beet-700)' }}>No brand playbook to show</div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', maxWidth: 420, lineHeight: 1.55 }}>{pbEmptyNote}</div>
          </div>
        )}
      </React.Fragment>
    );
  }
  if (!pbCur) return null;
  return (
    <React.Fragment>
      {Boolean(pbIsOpen) && (
        <React.Fragment>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {(pbBrandTabs || []).map((b, i) => (
              <button key={i} onClick={b.set} style={cssTextToObject(b.style)}>
                <span style={{ fontSize: 12.5, fontWeight: 800 }}>{b.name}</span>
                <span style={{ fontSize: 10, opacity: .75 }}>{b.sub}</span>
              </button>
            ))}
          </div>

          <div style={{ background: 'var(--beet-700)', borderRadius: 18, padding: '20px 24px', color: '#fff', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--orchid-300)' }}>Brand playbook</div>
                <div style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 23, marginTop: 4 }}>{pbBrandName}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.82)', marginTop: 3 }}>{pbBrandTagline}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', marginTop: 5 }}>{pbBrandSector} · {pbBrandSite}</div>
              </div>
              <div style={{ minWidth: 200 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'rgba(255,255,255,.6)' }}>Your reading progress</div>
                <div style={{ height: 7, borderRadius: 99, background: 'rgba(255,255,255,.14)', overflow: 'hidden', marginTop: 7 }}>
                  <div style={{ height: '100%', borderRadius: 99, width: pbProgressW, background: 'var(--verify-500)' }} />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.75)', marginTop: 5 }}>{pbProgress}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '300px minmax(0,1fr)', gap: 16, alignItems: 'start' }}>
            <div style={{ background: '#fff', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', padding: 14, minWidth: 0 }}>
              <div style={{ position: 'relative', marginBottom: 11 }}>
                <Icon name="search" style={{ width: 14, height: 14, color: 'var(--ink-400)', position: 'absolute', left: 11, top: 10 }} />
                <input value={pbQuery} onInput={pbSetQuery} placeholder="Search the playbook…" style={{ width: '100%', padding: '8px 11px 8px 33px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, outline: 'none' }} />
              </div>
              {Boolean(pbHasHits) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 11, paddingBottom: 11, borderBottom: '1px solid var(--line-200)' }}>
                  {(pbHits || []).map((h, i) => (
                    <button key={i} onClick={h.go} style={{ textAlign: 'left', padding: '7px 10px', border: 'none', background: 'var(--orchid-100)', color: 'var(--orchid-700)', borderRadius: 9, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>{h.title}</button>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {(pbChapters || []).map((c, i) => (
                  <button key={i} onClick={c.go} style={cssTextToObject(c.style)}>
                    <span style={{ width: 22, height: 22, borderRadius: 7, background: 'var(--surface-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Icon name={c.icon} style={{ width: 12, height: 12, color: 'var(--orchid-600)' }} />
                    </span>
                    <span style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-900)' }}>{c.n}. {c.title}</span>
                        {Boolean(c.done) && <Icon name="check" style={{ width: 11, height: 11, color: 'var(--verify-600)' }} />}
                      </span>
                      {Boolean(c.gov) && <span style={{ display: 'inline-block', fontSize: 9, fontWeight: 800, letterSpacing: '.05em', padding: '1px 6px', borderRadius: 5, background: 'var(--surface-50)', color: 'var(--ink-500)', marginTop: 2 }}>{c.govLabel}</span>}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', overflow: 'hidden', minWidth: 0 }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line-200)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--orchid-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={pbCur.icon} style={{ width: 17, height: 17, color: 'var(--orchid-600)' }} />
                  </span>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orchid-500)' }}>Chapter {pbCur.n} of {pbCur.total}</div>
                    <div style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 19, color: 'var(--beet-700)', marginTop: 2 }}>{pbCur.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 3 }}>{pbCur.summary}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginTop: 4 }}>Chapter owner · {pbCur.owner}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                    {Boolean(pbEditable) && (
                      <button onClick={pbEdit} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 13px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 9, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>
                        <Icon name="pencil" style={{ width: 12, height: 12 }} />Edit chapter
                      </button>
                    )}
                    <button onClick={pbMarkRead} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 13px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 9, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>
                      <Icon name="check" style={{ width: 12, height: 12 }} />Mark as read
                    </button>
                  </div>
                </div>
                {Boolean(pbGovLocked) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-500)', padding: '9px 12px', borderRadius: 11, fontSize: 11.5, fontWeight: 600 }}>
                    <Icon name="lock" style={{ width: 13, height: 13, flexShrink: 0, color: 'var(--orchid-600)' }} />{pbGovNote}
                  </div>
                )}
              </div>
              <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 13 }}>
                {(pbBlocks || []).map((bl, i) => <div key={i} style={{ minWidth: 0 }}><Block bl={bl} /></div>)}
              </div>
              <div style={{ padding: '14px 22px', borderTop: '1px solid var(--line-200)', background: 'var(--surface-50)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={pbPrev} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '8px 14px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  <Icon name="chevron-left" style={{ width: 13, height: 13 }} />Previous
                </button>
                <span style={{ flex: 1 }} />
                <button onClick={pbNext} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '8px 14px', border: '1px solid var(--line-300)', background: '#fff', color: 'var(--ink-700)', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  Next chapter<Icon name="chevron-right" style={{ width: 13, height: 13 }} />
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
