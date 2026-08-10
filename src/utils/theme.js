// Applies persisted Branding/Theme settings to the live DOM — shared by
// AppRoot's boot-time load (every role) and ConfigurationSection's live
// preview while editing (Admin only, before Save). Keeping this in one
// place means "apply instantly" and "apply on next reload" can never drift
// apart into two different implementations.
//
// Primary/Secondary/Button map onto CSS vars already referenced broadly
// across the app (--beet-700/--beet-600/--orchid-500 — see
// design-system.css), so those three take effect everywhere immediately.
// Sidebar/Navbar color map onto --sidebar-bg/--navbar-bg, which
// Sidebar.jsx/Topbar.jsx now read with the original hardcoded look as the
// CSS fallback. Card Color reuses --surface-50, the existing "raised card"
// var used throughout every module — also genuinely global. Text Color
// reuses --ink-900, the primary-text var read by nearly every heading/body
// element in light mode (dark mode keeps its own override block).
//
// Font Family and Border Radius are real, saved, and live-previewed on
// this settings page, but only Font Family gets a true app-wide DOM hook
// (document.body.style.fontFamily) — Border Radius has no equivalent single
// hook because every component hardcodes its own border-radius pixel value
// inline rather than reading a shared CSS var. Rolling a var out to every
// one of those call sites is a larger follow-up, not pretended here.
export function applyTheme(theme) {
  if (!theme) return;
  const root = document.documentElement;
  if (theme.mode) {
    const wantsDark = theme.mode === 'dark' || (theme.mode === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.setAttribute('data-theme', wantsDark ? 'dark' : 'light');
  }
  if (theme.primaryColor) root.style.setProperty('--beet-700', theme.primaryColor);
  if (theme.secondaryColor) root.style.setProperty('--beet-600', theme.secondaryColor);
  if (theme.sidebarColor) root.style.setProperty('--sidebar-bg', theme.sidebarColor);
  if (theme.navbarColor) root.style.setProperty('--navbar-bg', theme.navbarColor);
  if (theme.buttonColor) root.style.setProperty('--orchid-500', theme.buttonColor);
  if (theme.cardColor) root.style.setProperty('--surface-50', theme.cardColor);
  if (theme.textColor) root.style.setProperty('--ink-900', theme.textColor);
  if (theme.fontFamily) document.body.style.fontFamily = theme.fontFamily;
  if (theme.borderRadius != null && theme.borderRadius !== '') root.style.setProperty('--radius', theme.borderRadius + 'px');
  applyCustomCss(theme.customCss);
}

// Escape hatch for everything the var system above doesn't reach yet
// (card panel backgrounds, border-radius on individual components, etc.)
// — Admin writes raw CSS, injected into a single <style> tag that's
// created once and just has its content swapped on every change, so
// there's never more than one copy fighting for specificity. Only ever
// reachable by a verified role_key==='admin' account (enforced server-
// side in api/admin/settings.js), so this is a deliberate self-service
// override, not untrusted input.
export function applyCustomCss(css) {
  let tag = document.getElementById('bl-custom-css');
  if (!tag) {
    tag = document.createElement('style');
    tag.id = 'bl-custom-css';
    document.head.appendChild(tag);
  }
  tag.textContent = css || '';
}

export function applyFavicon(branding) {
  if (!branding || !branding.favicon) return;
  const link = document.querySelector("link[rel~='icon']");
  if (link) link.href = branding.favicon;
}
