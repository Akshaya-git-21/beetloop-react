function camelizeCssProp(prop) {
  if (prop.startsWith('--')) return prop;
  return prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// The original design used raw CSS-text bindings for dynamic inline styles
// (`style="{{ expr }}"`); React requires a style object, so dynamic style
// expressions are routed through this at render time.
export function cssTextToObject(cssText) {
  if (!cssText) return undefined;
  if (typeof cssText === 'object') return cssText;
  const decls = String(cssText).split(';').map(d => d.trim()).filter(Boolean);
  const out = {};
  for (const d of decls) {
    const idx = d.indexOf(':');
    if (idx === -1) continue;
    const prop = d.slice(0, idx).trim();
    const val = d.slice(idx + 1).trim();
    if (!prop) continue;
    out[camelizeCssProp(prop)] = val;
  }
  return out;
}
