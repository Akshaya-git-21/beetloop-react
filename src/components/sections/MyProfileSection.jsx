import React from 'react';
import { cssTextToObject } from '../../utils/cssText.js';

export default function MyProfileSection({ vm }) {
  const { showProfile, pfName, pfRoleLabel, pfColor, pfShort, pfFields, pfAvatarUrl, pfHasAvatar, pfAvatarBusy, pfUploadAvatar, pfRemoveAvatar } = vm;
  return (
    <React.Fragment>
      {Boolean(showProfile) && (
        <React.Fragment>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 20, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '22px 24px', borderBottom: '1px solid var(--line-200)' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                {pfHasAvatar ? (
                  <img src={pfAvatarUrl} alt={pfName} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <span style={cssTextToObject(`width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#fff;background:${pfColor}`)}>
                    {pfShort}
                  </span>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 20, color: 'var(--ink-900)' }}>{pfName}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 2 }}>{pfRoleLabel}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 12px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--ink-700)', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                    {pfAvatarBusy ? 'Uploading…' : (pfHasAvatar ? 'Change photo' : 'Upload photo')}
                    <input type="file" accept="image/*" onChange={pfUploadAvatar} disabled={pfAvatarBusy} style={{ display: 'none' }} />
                  </label>
                  {Boolean(pfHasAvatar) && (
                    <button onClick={pfRemoveAvatar} disabled={pfAvatarBusy} style={{ padding: '7px 12px', border: '1px solid var(--line-300)', background: 'var(--paper)', color: 'var(--danger-600)', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div style={{ padding: '22px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 24px' }}>
              {(pfFields || []).map((f, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--ink-400)', marginBottom: 4 }}>{f.k}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-900)' }}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
