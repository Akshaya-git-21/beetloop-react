import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../../components/Icon.jsx';
import { supabase } from '../../utils/supabaseClient.js';
import { applyTheme, applyFavicon } from '../../utils/theme.js';

const DEFAULT_GENERAL = {
  companyName: 'Beetloop', tagline: 'Marketing Platform', companyEmail: '', companyPhone: '', companyAddress: '', website: '',
  timezone: 'Asia/Kolkata', dateFormat: 'DD/MM/YYYY', currency: 'INR', language: 'en',
};
const DEFAULT_BRANDING = { companyLogo: '', darkLogo: '', loginLogo: '', favicon: '', loginBackground: '' };
const DEFAULT_THEME = {
  mode: 'light', primaryColor: '#380F23', secondaryColor: '#4E1631', sidebarColor: '', navbarColor: '',
  buttonColor: '#B45A8C', cardColor: '#FCFAFB', textColor: '', fontFamily: '', borderRadius: 12, customCss: '',
};

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD', 'AUD', 'CAD'];
const LANGUAGES = [{ v: 'en', label: 'English' }, { v: 'hi', label: 'Hindi' }, { v: 'es', label: 'Spanish' }, { v: 'fr', label: 'French' }, { v: 'de', label: 'German' }];
const DATE_FORMATS = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
const FONTS = ['', 'Manrope', 'Sora', 'Arial', 'Georgia', 'Verdana', 'Tahoma', 'Trebuchet MS'];
const TIMEZONES = (() => {
  try { return Intl.supportedValuesOf('timeZone'); }
  catch { return ['Asia/Kolkata', 'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Berlin', 'Asia/Singapore', 'Asia/Dubai', 'Australia/Sydney']; }
})();

const label = { display: 'block', fontSize: 11.5, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.04em' };
const input = { width: '100%', minWidth: 0, padding: '10px 12px', border: '1px solid var(--line-300)', borderRadius: 11, fontSize: 13, outline: 'none', background: 'var(--paper)' };
const card = { background: 'var(--paper)', border: '1px solid var(--line-300)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', padding: '20px 22px', marginBottom: 16 };
const sectionTitle = { fontFamily: "'Sora'", fontWeight: 700, fontSize: 15, color: 'var(--ink-900)', margin: '0 0 14px' };

function resizeToDataUrl(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error || new Error('Could not read file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not read that image'));
      img.onload = () => {
        let { width, height } = img;
        if (width > height) { if (width > maxDim) { height = Math.round(height * maxDim / width); width = maxDim; } }
        else if (height > maxDim) { width = Math.round(width * maxDim / height); height = maxDim; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function authedFetch(path, options) {
  const { data } = await supabase.auth.getSession();
  const token = data && data.session && data.session.access_token;
  const resp = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options && options.headers), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const body = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(body.error || `Request failed (${resp.status})`);
  return body;
}

function Field({ children, match }) {
  if (match === false) return null;
  return <div style={{ marginBottom: 14 }}>{children}</div>;
}

// Shared load/save/cancel/reset for one section key inside the single
// platform_settings row (value = { general, branding, theme }). Save always
// re-fetches the full row first and merges in just this section before
// PUTting the whole thing back — so editing General in one tab can't clobber
// an in-flight edit to Theme in another tab that hasn't saved yet.
function useSettingsSection(sectionKey, defaults, onLiveApply) {
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(defaults);
  const [form, setForm] = useState(defaults);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const okTimer = useRef(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const body = await authedFetch('/api/admin/settings', { method: 'GET' });
        const section = { ...defaults, ...((body.value || {})[sectionKey] || {}) };
        if (!alive) return;
        setSaved(section); setForm(section); setLoaded(true);
        if (onLiveApply) onLiveApply(section);
      } catch (e) {
        if (alive) { setErr(e.message); setLoaded(true); }
      }
    })();
    return () => { alive = false; };
  }, []);

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);

  useEffect(() => {
    const handler = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  const save = async () => {
    setBusy(true); setErr(''); setOk('');
    try {
      const current = await authedFetch('/api/admin/settings', { method: 'GET' });
      const merged = { ...(current.value || {}), [sectionKey]: form };
      const body = await authedFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify({ value: merged }) });
      const nextSection = (body.value || {})[sectionKey] || form;
      setSaved(nextSection); setForm(nextSection);
      setOk('Saved.');
      clearTimeout(okTimer.current); okTimer.current = setTimeout(() => setOk(''), 4000);
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  const cancel = () => { setForm(saved); setErr(''); setOk(''); if (onLiveApply) onLiveApply(saved); };
  const resetToDefault = () => { setForm(defaults); if (onLiveApply) onLiveApply(defaults); };

  return { loaded, form, setForm, dirty, busy, err, ok, save, cancel, resetToDefault };
}

function Toolbar({ canEdit, s, resetLabel, saveLabel }) {
  if (!canEdit) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-50)', border: '1px solid var(--line-200)', color: 'var(--ink-500)', padding: '10px 14px', borderRadius: 12, fontSize: 12.5, fontWeight: 600, marginBottom: 14 }}>
      <Icon name="eye" style={{ width: 14, height: 14, flexShrink: 0 }} />View only — Settings can only be changed by a Super Admin.
    </div>
  );
  return (
    <React.Fragment>
      {Boolean(s.err) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--danger-100, #F7E3E6)', border: '1px solid #E7B9C1', color: 'var(--danger-600)', padding: '10px 14px', borderRadius: 12, fontSize: 12.5, fontWeight: 600, marginBottom: 14 }}>
          <Icon name="alert-triangle" style={{ width: 14, height: 14, flexShrink: 0 }} />{s.err}
        </div>
      )}
      {Boolean(s.ok) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--verify-100)', border: '1px solid #BFE3D0', color: 'var(--verify-600)', padding: '10px 14px', borderRadius: 12, fontSize: 12.5, fontWeight: 600, marginBottom: 14 }}>
          <Icon name="check-circle-2" style={{ width: 14, height: 14, flexShrink: 0 }} />{s.ok}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
        <button onClick={s.resetToDefault} disabled={s.busy} style={{ padding: '10px 16px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', cursor: 'pointer' }}>{resetLabel || 'Reset'}</button>
        <button onClick={s.cancel} disabled={s.busy || !s.dirty} style={{ padding: '10px 16px', border: '1px solid var(--line-300)', background: 'var(--paper)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: s.dirty ? 'var(--ink-700)' : 'var(--ink-400)', cursor: s.dirty ? 'pointer' : 'not-allowed' }}>Cancel</button>
        <button onClick={s.save} disabled={s.busy || !s.dirty} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', border: 'none', background: (s.busy || !s.dirty) ? 'var(--ink-400)' : '#7A1C46', color: '#fff', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: (s.busy || !s.dirty) ? 'not-allowed' : 'pointer' }}>
          {s.busy ? 'Saving…' : (<><Icon name="check" style={{ width: 14, height: 14 }} />{saveLabel || 'Save'}</>)}
        </button>
      </div>
    </React.Fragment>
  );
}

function SearchBox({ query, setQuery }) {
  return (
    <div style={{ position: 'relative', flex: 1, maxWidth: 320, marginBottom: 16 }}>
      <Icon name="search" style={{ width: 14, height: 14, position: 'absolute', left: 12, top: 12, color: 'var(--ink-400)' }} />
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search settings…" style={{ ...input, paddingLeft: 34 }} />
    </div>
  );
}

function GeneralTab({ canEdit }) {
  const s = useSettingsSection('general', DEFAULT_GENERAL);
  const [query, setQuery] = useState('');
  const set = (k) => (e) => s.setForm((f) => ({ ...f, [k]: e.target.value }));
  const q = query.trim().toLowerCase();
  const shows = (...labels) => !q || labels.some((l) => l.toLowerCase().includes(q));

  if (!s.loaded) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)' }}>Loading general settings…</div>;
  const dis = !canEdit;
  return (
    <div>
      <SearchBox query={query} setQuery={setQuery} />
      <Toolbar canEdit={canEdit} s={s} />
      <div style={card}>
        <h3 style={sectionTitle}>Company</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field match={shows('company name')}><label style={label}>Company Name</label><input style={input} value={s.form.companyName} onChange={set('companyName')} disabled={dis} /></Field>
          <Field match={shows('tagline', 'subtitle')}><label style={label}>Tagline / Subtitle</label><input style={input} value={s.form.tagline} onChange={set('tagline')} disabled={dis} placeholder="Marketing Platform" /></Field>
          <Field match={shows('company email')}><label style={label}>Company Email</label><input type="email" style={input} value={s.form.companyEmail} onChange={set('companyEmail')} disabled={dis} /></Field>
          <Field match={shows('company phone')}><label style={label}>Company Phone</label><input style={input} value={s.form.companyPhone} onChange={set('companyPhone')} disabled={dis} /></Field>
          <Field match={shows('company address')}><label style={label}>Company Address</label><input style={input} value={s.form.companyAddress} onChange={set('companyAddress')} disabled={dis} /></Field>
          <Field match={shows('website')}><label style={label}>Website</label><input style={input} value={s.form.website} onChange={set('website')} disabled={dis} /></Field>
        </div>
      </div>
      <div style={card}>
        <h3 style={sectionTitle}>Localization</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field match={shows('time zone', 'timezone')}><label style={label}>Time Zone</label>
            <select style={input} value={s.form.timezone} onChange={set('timezone')} disabled={dis}>{TIMEZONES.map((t) => <option key={t} value={t}>{t}</option>)}</select>
          </Field>
          <Field match={shows('date format')}><label style={label}>Date Format</label>
            <select style={input} value={s.form.dateFormat} onChange={set('dateFormat')} disabled={dis}>{DATE_FORMATS.map((d) => <option key={d} value={d}>{d}</option>)}</select>
          </Field>
          <Field match={shows('currency')}><label style={label}>Currency</label>
            <select style={input} value={s.form.currency} onChange={set('currency')} disabled={dis}>{CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
          </Field>
          <Field match={shows('language')}><label style={label}>Language</label>
            <select style={input} value={s.form.language} onChange={set('language')} disabled={dis}>{LANGUAGES.map((l) => <option key={l.v} value={l.v}>{l.label}</option>)}</select>
          </Field>
        </div>
      </div>
      <Toolbar canEdit={canEdit} s={s} />
    </div>
  );
}

function ImageField({ shows, labelText, value, onPick, onRemove, maxDim, canEdit, round }) {
  return (
    <Field match={shows}>
      <label style={label}>{labelText}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {value ? <img src={value} alt={labelText} style={{ width: 44, height: 44, borderRadius: round ? 22 : 9, objectFit: 'cover', border: '1px solid var(--line-300)', background: '#f5f5f5' }} /> : (
          <div style={{ width: 44, height: 44, borderRadius: round ? 22 : 9, border: '1px dashed var(--line-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-400)' }}><Icon name="image" style={{ width: 16, height: 16 }} /></div>
        )}
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid var(--line-300)', borderRadius: 10, fontSize: 12.5, fontWeight: 700, color: 'var(--ink-700)', cursor: canEdit ? 'pointer' : 'not-allowed', background: 'var(--paper)' }}>
          <Icon name="upload" style={{ width: 13, height: 13 }} />{value ? 'Replace' : 'Upload'}
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onPick} disabled={!canEdit} />
        </label>
        {value && canEdit && <button onClick={onRemove} style={{ border: 'none', background: 'none', color: 'var(--danger-600)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Delete</button>}
      </div>
    </Field>
  );
}

function BrandingTab({ canEdit }) {
  const s = useSettingsSection('branding', DEFAULT_BRANDING, (v) => applyFavicon(v));
  const [query, setQuery] = useState('');
  const [err, setErr] = useState('');
  const q = query.trim().toLowerCase();
  const shows = (...labels) => !q || labels.some((l) => l.toLowerCase().includes(q));

  const pick = (key, maxDim) => async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!/^image\//.test(file.type)) { setErr('Choose an image file.'); return; }
    try {
      const dataUrl = await resizeToDataUrl(file, maxDim, 0.9);
      s.setForm((f) => ({ ...f, [key]: dataUrl }));
      setErr('');
    } catch { setErr('Could not process that image — try a different file.'); }
  };
  const remove = (key) => () => s.setForm((f) => ({ ...f, [key]: '' }));

  if (!s.loaded) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)' }}>Loading branding…</div>;

  return (
    <div>
      <SearchBox query={query} setQuery={setQuery} />
      {Boolean(err) && <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--danger-100, #F7E3E6)', border: '1px solid #E7B9C1', color: 'var(--danger-600)', padding: '10px 14px', borderRadius: 12, fontSize: 12.5, fontWeight: 600, marginBottom: 14 }}><Icon name="alert-triangle" style={{ width: 14, height: 14 }} />{err}</div>}
      <Toolbar canEdit={canEdit} s={s} />
      <div style={{ ...card, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <ImageField shows={shows('company logo')} labelText="Company Logo" value={s.form.companyLogo} onPick={pick('companyLogo', 512)} onRemove={remove('companyLogo')} canEdit={canEdit} />
        <ImageField shows={shows('dark logo')} labelText="Dark Logo (used when Theme mode is Dark)" value={s.form.darkLogo} onPick={pick('darkLogo', 512)} onRemove={remove('darkLogo')} canEdit={canEdit} />
        <ImageField shows={shows('login logo')} labelText="Login Logo" value={s.form.loginLogo} onPick={pick('loginLogo', 512)} onRemove={remove('loginLogo')} canEdit={canEdit} />
        <ImageField shows={shows('favicon')} labelText="Favicon" value={s.form.favicon} onPick={pick('favicon', 64)} onRemove={remove('favicon')} canEdit={canEdit} round />
        <ImageField shows={shows('login background')} labelText="Login Background" value={s.form.loginBackground} onPick={pick('loginBackground', 1600)} onRemove={remove('loginBackground')} canEdit={canEdit} />
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--ink-500)', marginBottom: 16 }}>Company Logo replaces the sidebar wordmark immediately after saving. Favicon updates the browser tab icon immediately.</div>
      <Toolbar canEdit={canEdit} s={s} />
    </div>
  );
}

function ThemeTab({ canEdit }) {
  const s = useSettingsSection('theme', DEFAULT_THEME, (v) => applyTheme(v));
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const shows = (...labels) => !q || labels.some((l) => l.toLowerCase().includes(q));
  const dis = !canEdit;

  // Live preview — every edit applies to the DOM immediately, before Save.
  useEffect(() => { if (s.loaded) applyTheme(s.form); }, [s.form, s.loaded]);

  const set = (k) => (e) => s.setForm((f) => ({ ...f, [k]: e.target.value }));
  const setNum = (k) => (e) => s.setForm((f) => ({ ...f, [k]: parseInt(e.target.value, 10) || 0 }));
  const colorField = (key, text) => (
    <Field match={shows(text)}>
      <label style={label}>{text}</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="color" value={s.form[key] || '#ffffff'} onChange={set(key)} disabled={dis} style={{ width: 40, height: 38, border: '1px solid var(--line-300)', borderRadius: 8, padding: 2 }} />
        <input style={input} value={s.form[key] || ''} onChange={set(key)} disabled={dis} placeholder="inherit default" />
      </div>
    </Field>
  );

  if (!s.loaded) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-500)' }}>Loading theme…</div>;

  return (
    <div>
      <SearchBox query={query} setQuery={setQuery} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--info-100)', border: '1px solid #CBE3EC', color: 'var(--info-600)', padding: '10px 14px', borderRadius: 12, fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
        <Icon name="wand-2" style={{ width: 14, height: 14, flexShrink: 0 }} />Live preview — every change here applies instantly across the app (Primary/Secondary/Sidebar/Navbar/Button/Card/Text colors, Font, and Dark mode's text/borders/page canvas), even before you Save. Individual card panels and Border Radius stay on their current look for now — rolling those out everywhere is a larger follow-up.
      </div>
      <Toolbar canEdit={canEdit} s={s} resetLabel="Reset theme" saveLabel="Save theme" />
      <div style={card}>
        <h3 style={sectionTitle}>Mode</h3>
        <Field match={shows('theme mode', 'light', 'dark')}>
          <label style={label}>Theme Mode</label>
          <select style={{ ...input, maxWidth: 240 }} value={s.form.mode} onChange={set('mode')} disabled={dis}>
            <option value="light">Light</option><option value="dark">Dark</option><option value="system">System default</option>
          </select>
        </Field>
      </div>
      <div style={{ ...card, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <h3 style={{ ...sectionTitle, gridColumn: '1 / -1' }}>Colors</h3>
        {colorField('primaryColor', 'Primary Color')}
        {colorField('secondaryColor', 'Secondary Color')}
        {colorField('sidebarColor', 'Sidebar Color')}
        {colorField('navbarColor', 'Navbar Color')}
        {colorField('buttonColor', 'Button Color')}
        {colorField('cardColor', 'Card Color')}
        {colorField('textColor', 'Text Color')}
      </div>
      <div style={{ ...card, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <h3 style={{ ...sectionTitle, gridColumn: '1 / -1' }}>Typography & Shape</h3>
        <Field match={shows('font family')}>
          <label style={label}>Font Family</label>
          <select style={input} value={s.form.fontFamily} onChange={set('fontFamily')} disabled={dis}>
            {FONTS.map((f) => <option key={f} value={f}>{f || '(default)'}</option>)}
          </select>
        </Field>
        <Field match={shows('border radius')}>
          <label style={label}>Border Radius (px)</label>
          <input type="number" min="0" max="30" style={input} value={s.form.borderRadius} onChange={setNum('borderRadius')} disabled={dis} />
        </Field>
      </div>
      <div style={card}>
        <h3 style={sectionTitle}>Custom CSS</h3>
        <Field match={shows('custom css')}>
          <label style={label}>Custom CSS — applies instantly, site-wide</label>
          <textarea rows={8} style={{ ...input, fontFamily: "'Space Mono', monospace", fontSize: 12.5, resize: 'vertical' }}
            placeholder={'.blscroll { scrollbar-width: thin; }\n[data-theme="dark"] .some-card { background: #1a1420; }'}
            value={s.form.customCss} onChange={set('customCss')} disabled={dis} />
          <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 4 }}>Raw CSS, injected into a single &lt;style&gt; tag. This is the escape hatch for anything the color/font/radius fields above don't reach yet — e.g. an individual card's background. Only Super Admin can write it.</div>
        </Field>
      </div>
      <Toolbar canEdit={canEdit} s={s} resetLabel="Reset theme" saveLabel="Save theme" />
    </div>
  );
}

const TABS = [
  { key: 'general', label: 'General', icon: 'sliders-horizontal', Cmp: GeneralTab },
  { key: 'branding', label: 'Branding', icon: 'image', Cmp: BrandingTab },
  { key: 'theme', label: 'Theme', icon: 'palette', Cmp: ThemeTab },
];

export default function ConfigurationSection({ vm }) {
  const { showConfig, configAccessDenied, configCanEdit } = vm;
  const [tab, setTab] = useState('general');
  if (!showConfig) return null;

  if (configAccessDenied) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--ink-500)' }}>
        <Icon name="shield-alert" style={{ width: 28, height: 28, color: 'var(--danger-500)' }} />
        <div style={{ fontSize: 14, fontWeight: 700, marginTop: 10, color: 'var(--ink-700)' }}>Access restricted</div>
        <div style={{ fontSize: 13, marginTop: 4 }}>Admin Settings is only visible to Super Admin accounts.</div>
      </div>
    );
  }

  const Active = TABS.find((t) => t.key === tab) || TABS[0];
  return (
    <div>
      <div style={{ display: 'inline-flex', background: 'var(--surface-50)', border: '1px solid var(--line-300)', borderRadius: 12, padding: 3, marginBottom: 18 }}>
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 15px', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', background: tab === t.key ? 'var(--paper)' : 'none', color: tab === t.key ? 'var(--ink-900)' : 'var(--ink-500)', boxShadow: tab === t.key ? 'var(--shadow-xs)' : 'none' }}>
            <Icon name={t.icon} style={{ width: 15, height: 15 }} />{t.label}
          </button>
        ))}
      </div>
      <Active.Cmp canEdit={configCanEdit} />
    </div>
  );
}
