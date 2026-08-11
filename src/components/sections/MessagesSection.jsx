import React from 'react';
import Icon from '../../components/Icon.jsx';
import { cssTextToObject } from '../../utils/cssText.js';

export default function MessagesSection({ vm }) {
  const {
    showMessages, msgThreads, msgNewDm, msgNewGroup, msgThreadQuery, msgSetThreadQuery,
    msgCurName, msgCurIcon, msgCurMembers, msgCurOnline, msgCurStatusLine, msgCurStatusIsTyping, msgRows, msgEmpty,
    msgCanAct, msgHasFiles, msgDraftFiles, msgAttach, msgAttachImage, msgDraft, msgOnDraft, msgSend,
    msgEmojiOpen, msgToggleEmoji, msgEmojiList, msgPickEmoji, msgSearchOpen, msgToggleSearch, msgSearchQuery,
    msgSetSearchQuery, msgSearchHitCount, msgArchiveOpen, msgToggleArchiveView,
  } = vm;
  return (
    <React.Fragment>
      {Boolean(showMessages) && (
        <React.Fragment>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, alignItems: 'start' }}>
            <div style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px 10px' }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-400)', flex: 1 }}>Conversations</span>
                <button onClick={msgToggleArchiveView} title={msgArchiveOpen ? 'Back to conversations' : 'Archived chats'} style={{ width: 28, height: 28, borderRadius: 9, border: '1px solid ' + (msgArchiveOpen ? 'var(--orchid-400)' : 'var(--line-300)'), background: msgArchiveOpen ? 'var(--orchid-100)' : 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="archive" style={{ width: 13, height: 13, color: msgArchiveOpen ? 'var(--orchid-700)' : 'var(--ink-700)' }} />
                </button>
                <button onClick={msgNewDm} title="New message" style={{ width: 28, height: 28, borderRadius: 9, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="pen-square" style={{ width: 13, height: 13, color: 'var(--ink-700)' }} />
                </button>
                <button onClick={msgNewGroup} title="New group" style={{ width: 28, height: 28, borderRadius: 9, border: 'none', background: '#7A1C46', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="users" style={{ width: 13, height: 13, color: '#fff' }} />
                </button>
              </div>
              <div style={{ position: 'relative', padding: '0 4px 10px' }}>
                <Icon name="search" style={{ width: 13, height: 13, color: 'var(--ink-400)', position: 'absolute', left: 15, top: 10 }} />
                <input value={msgThreadQuery} onInput={msgSetThreadQuery} placeholder="Search conversations…" style={{ width: '100%', padding: '8px 10px 8px 30px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {(msgThreads || []).map(t => (
                  <div key={t.id} onClick={t.open} style={cssTextToObject(t.style)}>
                    <span style={{ position: 'relative', width: 30, height: 30, flexShrink: 0 }}>
                      <span style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--surface-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={t.icon} style={{ width: 14, height: 14, color: 'var(--ink-900)' }} />
                      </span>
                      {!t.isChannel && (
                        <span style={cssTextToObject(`position:absolute;bottom:-1px;right:-1px;width:9px;height:9px;border-radius:99px;border:2px solid #fff;background:${t.onlineDotColor}`)} />
                      )}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {Boolean(t.pinned) && <Icon name="pin" style={{ width: 11, height: 11, color: 'var(--orchid-600)', flexShrink: 0 }} />}
                        <span style={{ fontSize: 13, fontWeight: t.hasUnread ? 800 : 700, color: 'var(--ink-900)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</span>
                        <span style={{ fontSize: 10, color: 'var(--ink-400)', flexShrink: 0 }}>{t.when}</span>
                        <button onClick={(e) => { e.stopPropagation(); t.togglePin(); }} title={t.pinned ? 'Unpin' : 'Pin'} style={{ width: 18, height: 18, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: 0.55 }}>
                          <Icon name="pin" style={{ width: 11, height: 11, color: 'var(--ink-500)' }} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); t.toggleArchive(); }} title={t.archived ? 'Unarchive' : 'Archive'} style={{ width: 18, height: 18, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: 0.55 }}>
                          <Icon name="archive" style={{ width: 11, height: 11, color: 'var(--ink-500)' }} />
                        </button>
                        <button onClick={t.deleteThread} title="Delete conversation" style={{ width: 18, height: 18, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: 0.55 }}>
                          <Icon name="trash-2" style={{ width: 11, height: 11, color: 'var(--danger-600)' }} />
                        </button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ flex: 1, minWidth: 0, fontSize: 11, color: t.hasUnread ? 'var(--ink-700)' : 'var(--ink-500)', fontWeight: t.hasUnread ? 700 : 400, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.preview}</div>
                        {Boolean(t.hasUnread) && (
                          <span style={{ flexShrink: 0, minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999, background: '#7A1C46', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.unreadCount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {Boolean(msgEmpty) ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)', fontSize: 13 }}>No conversations to show.</div>
              ) : (
              <React.Fragment>
              <div style={{ padding: '15px 20px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ position: 'relative', width: 34, height: 34, flexShrink: 0 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--orchid-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={msgCurIcon} style={{ width: 16, height: 16, color: 'var(--orchid-600)' }} />
                  </span>
                  {Boolean(msgCurOnline) && (
                    <span style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: 99, border: '2px solid #fff', background: 'var(--verify-500)' }} />
                  )}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 16, color: 'var(--ink-900)' }}>{msgCurName}</div>
                  <div style={cssTextToObject(`font-size:11.5px;margin-top:1px;color:${msgCurStatusIsTyping ? 'var(--verify-600)' : 'var(--ink-500)'};font-weight:${msgCurStatusIsTyping ? 700 : 400}`)}>{msgCurStatusLine || msgCurMembers}</div>
                </div>
                <button onClick={msgToggleSearch} title="Search in conversation" style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid ' + (msgSearchOpen ? 'var(--orchid-400)' : 'var(--line-300)'), background: msgSearchOpen ? 'var(--orchid-100)' : 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="search" style={{ width: 14, height: 14, color: msgSearchOpen ? 'var(--orchid-700)' : 'var(--ink-700)' }} />
                </button>
              </div>

              {Boolean(msgSearchOpen) && (
                <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--line-200)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input value={msgSearchQuery} onInput={msgSetSearchQuery} placeholder="Search this conversation…" autoFocus style={{ flex: 1, minWidth: 0, padding: '8px 11px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, outline: 'none' }} />
                  {Boolean(msgSearchQuery) && <span style={{ fontSize: 11.5, color: 'var(--ink-500)', flexShrink: 0 }}>{msgSearchHitCount} match{msgSearchHitCount === 1 ? '' : 'es'}</span>}
                </div>
              )}

              <div className="blscroll" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 520, overflowY: 'auto' }}>
                {(msgRows || []).map(m => (
                  <div key={m.id} id={'msg-' + m.id} style={cssTextToObject(`display:flex;gap:11px;flex-direction:${m.mine ? 'row-reverse' : 'row'};${m.searchDim ? 'opacity:.35' : ''}`)}>
                    <span style={cssTextToObject(`width:34px;height:34px;border-radius:99px;background:${m.avatarBg};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0`)}>{m.initials}</span>
                    <div style={{ maxWidth: '74%', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: m.mine ? 'flex-end' : 'flex-start' }}>
                      {Boolean(m.showNameRow) ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{m.who}</span>
                          <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-500)' }}>{m.role}</span>
                          <span style={{ fontSize: 10.5, color: 'var(--ink-400)' }}>{m.when}</span>
                        </div>
                      ) : (
                        <div style={{ fontSize: 10.5, color: 'var(--ink-400)', marginBottom: 4 }}>{m.when}</div>
                      )}

                      {Boolean(m.replyPreview) && (
                        <div onClick={m.scrollToReply} style={{ cursor: 'pointer', borderLeft: '3px solid var(--orchid-400)', background: 'var(--surface-50)', borderRadius: '8px 8px 8px 0', padding: '6px 10px', marginBottom: 4, maxWidth: '100%' }}>
                          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--orchid-700)' }}>{m.replyPreview.who}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--ink-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.replyPreview.text}</div>
                        </div>
                      )}

                      {m.deleted ? (
                        <div style={{ background: 'var(--surface-50)', border: '1px dashed var(--line-300)', borderRadius: 13, padding: '11px 14px', fontSize: 12.5, color: 'var(--ink-400)', fontStyle: 'italic' }}>This message was deleted</div>
                      ) : (
                        <div style={cssTextToObject(`background:${m.bubbleBg};border:1px solid var(--line-200);border-radius:13px;padding:11px 14px;font-size:13px;color:var(--ink-900);line-height:1.55`)}>
                          {Boolean(m.forwarded) && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 700, color: 'var(--ink-400)', marginBottom: 4 }}>
                              <Icon name="forward" style={{ width: 11, height: 11 }} />Forwarded
                            </div>
                          )}
                          {m.text}
                          {Boolean(m.edited) && <span style={{ fontSize: 10, color: 'var(--ink-400)', marginLeft: 6 }}>(edited)</span>}
                        </div>
                      )}

                      {Boolean(m.hasReceipt) && !m.deleted && (
                        <div style={cssTextToObject(`display:flex;align-items:center;gap:4px;margin-top:4px;font-size:10.5px;font-weight:600;color:${m.receiptColor}`)}>
                          <Icon name={m.receiptIcon} style={{ width: 12, height: 12 }} />
                          {m.receiptLabel}
                        </div>
                      )}

                      {Boolean(m.hasFiles) && !m.deleted && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 7 }}>
                          {(m.fileRows || []).map((fl, i) => (
                            <button key={i} onClick={fl.openRepo} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 9, fontFamily: "'Space Mono'", fontSize: 10.5, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>
                              <Icon name={fl.icon} style={{ width: 11, height: 11, color: 'var(--orchid-600)' }} />{fl.name}
                            </button>
                          ))}
                        </div>
                      )}

                      {Boolean(m.hasTask) && !m.deleted && (
                        <div onClick={m.openTask} style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginTop: 7, padding: '8px 12px', border: '1px solid var(--line-300)', borderRadius: 11, cursor: 'pointer', background: 'var(--paper)' }}>
                          <Icon name="list-checks" style={{ width: 13, height: 13, color: 'var(--orchid-600)', flexShrink: 0 }} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-900)', flex: 1, minWidth: 0 }}>{m.taskLabel}</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 700, color: 'var(--orchid-700)', flexShrink: 0 }}><Icon name="target" style={{ width: 10, height: 10 }} />{m.taskKpi}</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 700, color: 'var(--ink-500)', flexShrink: 0 }}><Icon name="gauge" style={{ width: 10, height: 10 }} />{m.taskEffort}</span>
                          <span style={cssTextToObject(`font-size:10px;font-weight:700;padding:2px 9px;border-radius:999px;background:${m.taskBg};color:${m.taskColor};flex-shrink:0`)}>{m.taskStatus}</span>
                        </div>
                      )}

                      {!m.deleted && (
                        <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                          <button onClick={m.reply} title="Reply" style={{ width: 24, height: 24, borderRadius: 7, border: '1px solid var(--line-200)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="reply" style={{ width: 12, height: 12, color: 'var(--ink-500)' }} /></button>
                          <button onClick={m.forward} title="Forward" style={{ width: 24, height: 24, borderRadius: 7, border: '1px solid var(--line-200)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="forward" style={{ width: 12, height: 12, color: 'var(--ink-500)' }} /></button>
                          <button onClick={m.copy} title="Copy" style={{ width: 24, height: 24, borderRadius: 7, border: '1px solid var(--line-200)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="copy" style={{ width: 12, height: 12, color: 'var(--ink-500)' }} /></button>
                          {Boolean(m.canEdit) && <button onClick={m.startEdit} title="Edit" style={{ width: 24, height: 24, borderRadius: 7, border: '1px solid var(--line-200)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="pencil" style={{ width: 12, height: 12, color: 'var(--ink-500)' }} /></button>}
                          {Boolean(m.canDelete) && <button onClick={m.remove} title="Delete" style={{ width: 24, height: 24, borderRadius: 7, border: '1px solid var(--line-200)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="trash-2" style={{ width: 12, height: 12, color: 'var(--danger-500)' }} /></button>}
                        </div>
                      )}

                      {Boolean(m.forwardPicker) && (
                        <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginTop: 7 }}>
                          <select onChange={m.forwardPick} style={{ flex: 1, minWidth: 0, padding: '8px 11px', border: '1px solid var(--orchid-300)', borderRadius: 10, fontSize: 12, background: 'var(--paper)' }}>
                            {(m.forwardOptions || []).map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
                          </select>
                          <button onClick={m.forwardCancel} style={{ padding: '8px 12px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 10, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                        </div>
                      )}

                      {Boolean(msgCanAct) && !m.deleted && !m.linkPicker && (
                        <div style={{ display: 'flex', gap: 7, marginTop: 7 }}>
                          <button onClick={m.convert} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}><Icon name="plus" style={{ width: 11, height: 11 }} />Create task</button>
                          <button onClick={m.linkOpen} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}><Icon name="link" style={{ width: 11, height: 11 }} />Link to task</button>
                        </div>
                      )}

                      {Boolean(m.linkPicker) && (
                        <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginTop: 7 }}>
                          <select onChange={m.linkPick} style={{ flex: 1, minWidth: 0, padding: '8px 11px', border: '1px solid var(--orchid-300)', borderRadius: 10, fontSize: 12, background: 'var(--paper)' }}>
                            {(m.linkOptions || []).map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
                          </select>
                          <button onClick={m.linkCancel} style={{ padding: '8px 12px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 10, fontSize: 11.5, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: '14px 20px', borderTop: '1px solid var(--line-200)' }}>
                {Boolean(msgHasFiles) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 9 }}>
                    {(msgDraftFiles || []).map((fd, i) => (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 9, background: 'var(--orchid-100)', color: 'var(--orchid-700)', fontFamily: "'Space Mono'", fontSize: 10.5, fontWeight: 700 }}>
                        <Icon name={fd.icon} style={{ width: 11, height: 11 }} />{fd.name}
                        <button onClick={fd.remove} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: 'var(--orchid-700)' }}><Icon name="x" style={{ width: 11, height: 11 }} /></button>
                      </span>
                    ))}
                  </div>
                )}
                {Boolean(vm.msgReplyingTo) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-50)', borderLeft: '3px solid var(--orchid-400)', borderRadius: '8px 8px 8px 0', padding: '6px 10px', marginBottom: 9 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--orchid-700)' }}>Replying to {vm.msgReplyingTo.who}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vm.msgReplyingTo.text}</div>
                    </div>
                    <button onClick={vm.msgCancelReply} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}><Icon name="x" style={{ width: 14, height: 14, color: 'var(--ink-500)' }} /></button>
                  </div>
                )}
                {Boolean(vm.msgEditingId) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--warn-100)', borderRadius: 9, padding: '6px 10px', marginBottom: 9 }}>
                    <div style={{ flex: 1, fontSize: 11.5, fontWeight: 700, color: 'var(--warn-600)' }}>Editing message</div>
                    <button onClick={vm.msgCancelEdit} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}><Icon name="x" style={{ width: 14, height: 14, color: 'var(--warn-600)' }} /></button>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', position: 'relative' }}>
                  <button onClick={msgAttach} title="Attach file" style={{ width: 38, height: 38, borderRadius: 11, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="paperclip" style={{ width: 15, height: 15, color: 'var(--ink-700)' }} /></button>
                  <button onClick={msgAttachImage} title="Attach image" style={{ width: 38, height: 38, borderRadius: 11, border: '1px solid var(--line-300)', background: 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="image-plus" style={{ width: 15, height: 15, color: 'var(--ink-700)' }} /></button>
                  <button onClick={msgToggleEmoji} title="Emoji" style={{ width: 38, height: 38, borderRadius: 11, border: '1px solid ' + (msgEmojiOpen ? 'var(--orchid-400)' : 'var(--line-300)'), background: msgEmojiOpen ? 'var(--orchid-100)' : 'var(--paper)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="smile" style={{ width: 15, height: 15, color: msgEmojiOpen ? 'var(--orchid-700)' : 'var(--ink-700)' }} /></button>
                  {Boolean(msgEmojiOpen) && (
                    <div style={{ position: 'absolute', bottom: 46, left: 0, background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 12, boxShadow: 'var(--shadow-lg)', padding: 10, display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 4, zIndex: 5 }}>
                      {(msgEmojiList || []).map((em, i) => (
                        <button key={i} onClick={() => msgPickEmoji(em)} style={{ border: 'none', background: 'none', fontSize: 18, cursor: 'pointer', padding: 4, borderRadius: 6 }}>{em}</button>
                      ))}
                    </div>
                  )}
                  <input value={msgDraft} onInput={msgOnDraft} placeholder="Write a message…" style={{ flex: 1, minWidth: 0, padding: '11px 14px', border: '1px solid var(--line-300)', borderRadius: 12, fontSize: 13, outline: 'none' }} />
                  <button onClick={msgSend} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 18px', border: 'none', background: '#7A1C46', color: '#fff', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}><Icon name="send" style={{ width: 14, height: 14 }} />Send</button>
                </div>
              </div>
              </React.Fragment>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
