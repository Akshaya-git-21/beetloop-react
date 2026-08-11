import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function FloatingChatWidget({ vm }) {
  const {
    cwOpen, cwMinimized, cwHasUnread, cwUnreadTotal, cwToggleOpen, cwClose, cwToggleMinimize,
    cwBack, cwShowList, cwThreads, cwCurName, cwCurIcon, cwCurOnline, cwCurStatusLine, cwRows,
    cwEmojiOpen, cwToggleEmoji, cwEmojiList, cwPickEmoji, cwReplyingTo, cwCancelReply,
    cwEditingId, cwCancelEdit, cwDraftFiles, cwHasFiles, cwAttach, cwAttachImage,
    cwDraft, cwOnDraft, cwSend,
  } = vm;

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {Boolean(cwOpen) && (
        <div style={{ width: 340, height: cwMinimized ? 'auto' : 500, background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 16, boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
                          <Icon name={t.icon} style={{ width: 13, height: 13, color: 'var(--ink-900)' }} />
                        </span>
                        {t.icon === 'user' && (
                          <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: 99, border: '2px solid #fff', background: t.onlineDotColor }} />
                        )}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          {Boolean(t.pinned) && <Icon name="pin" style={{ width: 9, height: 9, color: 'var(--orchid-600)', flexShrink: 0 }} />}
                          <div style={{ fontSize: 12.5, fontWeight: t.hasUnread ? 800 : 700, color: 'var(--ink-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--ink-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.preview}</div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); t.togglePin(); }} title={t.pinned ? 'Unpin' : 'Pin'} style={{ width: 18, height: 18, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: 0.55 }}>
                        <Icon name="pin" style={{ width: 11, height: 11, color: 'var(--ink-500)' }} />
                      </button>
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
                  <div className="blscroll" style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {(cwRows || []).map(m => (
                      <div key={m.id} id={'cw-msg-' + m.id} style={{ display: 'flex', gap: 8, flexDirection: m.mine ? 'row-reverse' : 'row' }}>
                        <span style={{ width: 24, height: 24, borderRadius: 99, background: m.avatarBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{m.initials}</span>
                        <div style={{ maxWidth: '78%', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: m.mine ? 'flex-end' : 'flex-start' }}>
                          {Boolean(m.showNameRow) && <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 2 }}>{m.who}</div>}

                          {Boolean(m.replyPreview) && (
                            <div onClick={m.scrollToReply} style={{ cursor: 'pointer', borderLeft: '3px solid var(--orchid-400)', background: 'var(--surface-50)', borderRadius: '7px 7px 7px 0', padding: '5px 8px', marginBottom: 3, maxWidth: '100%' }}>
                              <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--orchid-700)' }}>{m.replyPreview.who}</div>
                              <div style={{ fontSize: 10.5, color: 'var(--ink-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.replyPreview.text}</div>
                            </div>
                          )}

                          {m.deleted ? (
                            <div style={{ background: 'var(--surface-50)', border: '1px dashed var(--line-300)', borderRadius: 10, padding: '7px 10px', fontSize: 11, color: 'var(--ink-400)', fontStyle: 'italic' }}>Message deleted</div>
                          ) : (
                            <div style={{ background: m.bubbleBg, border: '1px solid var(--line-200)', borderRadius: 10, padding: '7px 10px', fontSize: 12, color: 'var(--ink-900)', lineHeight: 1.45 }}>
                              {Boolean(m.forwarded) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9.5, fontWeight: 700, color: 'var(--ink-400)', marginBottom: 3 }}>
                                  <Icon name="forward" style={{ width: 10, height: 10 }} />Forwarded
                                </div>
                              )}
                              {m.text}
                              {Boolean(m.edited) && <span style={{ fontSize: 9.5, color: 'var(--ink-400)', marginLeft: 5 }}>(edited)</span>}
                            </div>
                          )}

                          {Boolean(m.hasReceipt) && !m.deleted && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3, fontSize: 9.5, fontWeight: 600, color: m.receiptColor }}>
                              <Icon name={m.receiptIcon} style={{ width: 10, height: 10 }} />{m.receiptLabel}
                            </div>
                          )}

                          {Boolean(m.hasFiles) && !m.deleted && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 5 }}>
                              {(m.fileRows || []).map((fl, i) => (
                                <button key={i} onClick={fl.openRepo} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 8px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 8, fontSize: 9.5, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>
                                  <Icon name={fl.icon} style={{ width: 10, height: 10, color: 'var(--orchid-600)' }} />{fl.name}
                                </button>
                              ))}
                            </div>
                          )}

                          {!m.deleted && (
                            <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
                              <button onClick={m.reply} title="Reply" style={{ width: 20, height: 20, borderRadius: 6, border: '1px solid var(--line-200)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="reply" style={{ width: 10, height: 10, color: 'var(--ink-500)' }} /></button>
                              <button onClick={m.forward} title="Forward" style={{ width: 20, height: 20, borderRadius: 6, border: '1px solid var(--line-200)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="forward" style={{ width: 10, height: 10, color: 'var(--ink-500)' }} /></button>
                              <button onClick={m.copy} title="Copy" style={{ width: 20, height: 20, borderRadius: 6, border: '1px solid var(--line-200)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="copy" style={{ width: 10, height: 10, color: 'var(--ink-500)' }} /></button>
                              {Boolean(m.canEdit) && <button onClick={m.startEdit} title="Edit" style={{ width: 20, height: 20, borderRadius: 6, border: '1px solid var(--line-200)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="pencil" style={{ width: 10, height: 10, color: 'var(--ink-500)' }} /></button>}
                              {Boolean(m.canDelete) && <button onClick={m.remove} title="Delete" style={{ width: 20, height: 20, borderRadius: 6, border: '1px solid var(--line-200)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="trash-2" style={{ width: 10, height: 10, color: 'var(--danger-500)' }} /></button>}
                            </div>
                          )}

                          {Boolean(m.forwardPicker) && (
                            <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginTop: 5, width: '100%' }}>
                              <select onChange={m.forwardPick} style={{ flex: 1, minWidth: 0, padding: '6px 8px', border: '1px solid var(--orchid-300)', borderRadius: 8, fontSize: 10.5, background: 'var(--paper)' }}>
                                {(m.forwardOptions || []).map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
                              </select>
                              <button onClick={m.forwardCancel} style={{ padding: '6px 9px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 8, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: 10, borderTop: '1px solid var(--line-200)' }}>
                    {Boolean(cwHasFiles) && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                        {(cwDraftFiles || []).map((fd, i) => (
                          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 8px', borderRadius: 8, background: 'var(--orchid-100)', color: 'var(--orchid-700)', fontSize: 9.5, fontWeight: 700 }}>
                            <Icon name={fd.icon} style={{ width: 10, height: 10 }} />{fd.name}
                            <button onClick={fd.remove} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: 'var(--orchid-700)' }}><Icon name="x" style={{ width: 10, height: 10 }} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                    {Boolean(cwReplyingTo) && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface-50)', borderLeft: '3px solid var(--orchid-400)', borderRadius: '7px 7px 7px 0', padding: '5px 8px', marginBottom: 8 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--orchid-700)' }}>Replying to {cwReplyingTo.who}</div>
                          <div style={{ fontSize: 10.5, color: 'var(--ink-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cwReplyingTo.text}</div>
                        </div>
                        <button onClick={cwCancelReply} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}><Icon name="x" style={{ width: 13, height: 13, color: 'var(--ink-500)' }} /></button>
                      </div>
                    )}
                    {Boolean(cwEditingId) && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--warn-100)', borderRadius: 8, padding: '5px 8px', marginBottom: 8 }}>
                        <div style={{ flex: 1, fontSize: 10.5, fontWeight: 700, color: 'var(--warn-600)' }}>Editing message</div>
                        <button onClick={cwCancelEdit} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}><Icon name="x" style={{ width: 13, height: 13, color: 'var(--warn-600)' }} /></button>
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', position: 'relative' }}>
                      <button onClick={cwAttach} title="Attach file" style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="paperclip" style={{ width: 13, height: 13, color: 'var(--ink-700)' }} /></button>
                      <button onClick={cwAttachImage} title="Attach image" style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="image-plus" style={{ width: 13, height: 13, color: 'var(--ink-700)' }} /></button>
                      <button onClick={cwToggleEmoji} title="Emoji" style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid ' + (cwEmojiOpen ? 'var(--orchid-400)' : 'var(--line-300)'), background: cwEmojiOpen ? 'var(--orchid-100)' : 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="smile" style={{ width: 13, height: 13, color: cwEmojiOpen ? 'var(--orchid-700)' : 'var(--ink-700)' }} /></button>
                      {Boolean(cwEmojiOpen) && (
                        <div style={{ position: 'absolute', bottom: 36, left: 0, background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 10, boxShadow: 'var(--shadow-lg)', padding: 8, display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 3, zIndex: 5, width: 240 }}>
                          {(cwEmojiList || []).map((em, i) => (
                            <button key={i} onClick={() => cwPickEmoji(em)} style={{ border: 'none', background: 'none', fontSize: 15, cursor: 'pointer', padding: 2, borderRadius: 5 }}>{em}</button>
                          ))}
                        </div>
                      )}
                      <input value={cwDraft} onInput={cwOnDraft} placeholder="Message…" style={{ flex: 1, minWidth: 0, padding: '8px 11px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, outline: 'none' }} />
                      <button onClick={cwSend} style={{ width: 34, height: 34, border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon name="send" style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
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
