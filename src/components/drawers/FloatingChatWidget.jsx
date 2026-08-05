import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function FloatingChatWidget({ vm }) {
  const {
    cwOpen, cwMinimized, cwHasUnread, cwUnreadTotal, cwToggleOpen, cwClose, cwToggleMinimize,
    cwBack, cwShowList, cwThreads, cwCurName, cwCurIcon, cwCurOnline, cwCurStatusLine, cwRows,
    cwDraft, cwOnDraft, cwSend,
  } = vm;

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {Boolean(cwOpen) && (
        <div style={{ width: 320, height: cwMinimized ? 'auto' : 440, background: '#fff', border: '1px solid var(--line-300)', borderRadius: 16, boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '12px 14px', background: '#7A1C46', color: '#fff', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={cwToggleMinimize}>
            {!cwShowList && (
              <button onClick={(e) => { e.stopPropagation(); cwBack(); }} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', color: '#fff', padding: 0 }}>
                <Icon name="chevron-left" style={{ width: 16, height: 16 }} />
              </button>
            )}
            <Icon name={cwShowList ? 'message-circle' : (cwCurIcon || 'user')} style={{ width: 15, height: 15, flexShrink: 0 }} />
            <span style={{ flex: 1, minWidth: 0, fontFamily: "'Sora'", fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {cwShowList ? 'Messages' : cwCurName}
            </span>
            <button onClick={(e) => { e.stopPropagation(); cwToggleMinimize(); }} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', color: '#fff', padding: 0 }}>
              <Icon name={cwMinimized ? 'chevron-up' : 'minus'} style={{ width: 15, height: 15 }} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); cwClose(); }} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', color: '#fff', padding: 0 }}>
              <Icon name="x" style={{ width: 15, height: 15 }} />
            </button>
          </div>

          {!cwMinimized && (
            <React.Fragment>
              {cwShowList ? (
                <div className="blscroll" style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
                  {(cwThreads || []).length === 0 && (
                    <div style={{ padding: 20, textAlign: 'center', fontSize: 12, color: 'var(--ink-500)' }}>No conversations yet.</div>
                  )}
                  {(cwThreads || []).map(t => (
                    <div key={t.id} onClick={t.open} style={{ display: 'flex', gap: 9, padding: '9px 10px', borderRadius: 10, cursor: 'pointer' }}>
                      <span style={{ position: 'relative', width: 28, height: 28, flexShrink: 0 }}>
                        <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--surface-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name={t.icon} style={{ width: 13, height: 13, color: 'var(--beet-700)' }} />
                        </span>
                        {t.icon === 'user' && (
                          <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: 99, border: '2px solid #fff', background: t.onlineDotColor }} />
                        )}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: t.hasUnread ? 800 : 700, color: 'var(--ink-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--ink-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.preview}</div>
                      </div>
                      {Boolean(t.hasUnread) && (
                        <span style={{ flexShrink: 0, alignSelf: 'center', minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: '#7A1C46', color: '#fff', fontSize: 9.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.unreadCount}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <React.Fragment>
                  {Boolean(cwCurStatusLine) && (
                    <div style={{ padding: '6px 14px', fontSize: 10.5, color: 'var(--verify-600)', fontWeight: 600, borderBottom: '1px solid var(--line-200)' }}>{cwCurStatusLine}</div>
                  )}
                  <div className="blscroll" style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(cwRows || []).map(m => (
                      <div key={m.id} style={{ display: 'flex', gap: 8, flexDirection: m.mine ? 'row-reverse' : 'row' }}>
                        <span style={{ width: 24, height: 24, borderRadius: 99, background: m.avatarBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{m.initials}</span>
                        <div style={{ maxWidth: '76%', display: 'flex', flexDirection: 'column', alignItems: m.mine ? 'flex-end' : 'flex-start' }}>
                          {Boolean(m.showNameRow) && <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 2 }}>{m.who}</div>}
                          {m.deleted ? (
                            <div style={{ background: 'var(--surface-50)', border: '1px dashed var(--line-300)', borderRadius: 10, padding: '7px 10px', fontSize: 11, color: 'var(--ink-400)', fontStyle: 'italic' }}>Message deleted</div>
                          ) : (
                            <div style={{ background: m.bubbleBg, border: '1px solid var(--line-200)', borderRadius: 10, padding: '7px 10px', fontSize: 12, color: 'var(--ink-900)', lineHeight: 1.45 }}>{m.text}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: 10, borderTop: '1px solid var(--line-200)', display: 'flex', gap: 8 }}>
                    <input value={cwDraft} onInput={cwOnDraft} placeholder="Message…" style={{ flex: 1, minWidth: 0, padding: '8px 11px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, outline: 'none' }} />
                    <button onClick={cwSend} style={{ width: 34, height: 34, border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name="send" style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      )}

      <button onClick={cwToggleOpen} title="Messages" style={{ position: 'relative', width: 54, height: 54, borderRadius: 99, border: 'none', background: '#7A1C46', boxShadow: 'var(--shadow-lg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={cwOpen ? 'x' : 'message-circle'} style={{ width: 22, height: 22, color: '#fff' }} />
        {Boolean(cwHasUnread) && !cwOpen && (
          <span style={{ position: 'absolute', top: -2, right: -2, minWidth: 20, height: 20, padding: '0 5px', borderRadius: 999, background: 'var(--danger-500)', color: '#fff', fontSize: 10.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>{cwUnreadTotal}</span>
        )}
      </button>
    </div>
  );
}
