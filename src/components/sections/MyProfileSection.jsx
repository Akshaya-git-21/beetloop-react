import React from 'react';
import { cssTextToObject } from '../../utils/cssText.js';

export default function MyProfileSection({ vm }) {
  const { showProfile, pfName, pfRoleLabel, pfColor, pfShort, pfFields } = vm;
  return (
    <React.Fragment>
      {Boolean(showProfile) && (
        <React.Fragment>
          <div style={{ background: '#fff', border: '1px solid var(--line-300)', borderRadius: 20, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '22px 24px', borderBottom: '1px solid var(--line-200)' }}>
              <span style={cssTextToObject(`width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#fff;flex-shrink:0;background:${pfColor}`)}>
                {pfShort}
              </span>
              <div>
                <div style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 20, color: 'var(--beet-700)' }}>{pfName}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 2 }}>{pfRoleLabel}</div>
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
