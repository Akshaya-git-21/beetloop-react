import React from 'react';
import Icon from '../../components/Icon.jsx';

export default function ConfirmDeleteModal({ vm }) {
  const { showDeleteConfirm, deleteConfirmTitle, deleteConfirmBody, deleteConfirmLabel, deleteConfirmCancel, deleteConfirmOk, stop } = vm;
  return (
    <React.Fragment>
      {Boolean(showDeleteConfirm) && (
        <React.Fragment>
          <div onClick={deleteConfirmCancel} style={{ position: 'fixed', inset: 0, background: 'rgba(31,8,20,.5)', backdropFilter: 'blur(3px)', zIndex: 190, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
            <div onClick={stop} className="blscroll" style={{ width: '100%', maxWidth: 440, maxHeight: '85vh', overflowY: 'auto', background: 'var(--paper)', borderRadius: 22, boxShadow: 'var(--shadow-xl)', animation: 'blrise .3s var(--ease-out)' }}>
              <div style={{ padding: '22px 26px 4px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--danger-100, #F7E3E6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="trash-2" style={{ width: 19, height: 19, color: 'var(--danger-600)' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 18, color: 'var(--ink-900)', margin: 0 }}>{deleteConfirmTitle}</h3>
                </div>
              </div>

              <div style={{ padding: '14px 26px 22px', fontSize: 13.5, color: 'var(--ink-500)', lineHeight: 1.5 }}>
                {deleteConfirmBody}
              </div>

              <div style={{ padding: '16px 26px', borderTop: '1px solid var(--line-200)', display: 'flex', justifyContent: 'flex-end', gap: 10, position: 'sticky', bottom: 0, background: 'var(--paper)', borderRadius: '0 0 22px 22px' }}>
                <button onClick={deleteConfirmCancel} style={{ padding: '10px 18px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', color: 'var(--ink-700)' }}>Cancel</button>
                <button onClick={deleteConfirmOk} style={{ padding: '10px 20px', border: 'none', background: 'var(--danger-600)', color: '#fff', borderRadius: 11, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>{deleteConfirmLabel}</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
