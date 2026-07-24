# Beetloop Marketing Platform — React

A full React 19 + Vite port of the Beetloop Marketing Platform, migrated from the
original single-file HTML bundle.

## Stack

- React 19, class-based root component (`src/app/AppRoot.jsx`) preserving the
  original state machine and business logic
- Vite (JavaScript, no TypeScript)
- React Router DOM (URL-backed routing for every screen and app section)
- lucide-react for icons
- Plain CSS (design system + reset, unmodified from the original)

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  app/AppRoot.jsx        Ported logic class (state, all business methods, render dispatch)
  App.jsx                Router root — keeps one persistent AppRoot instance across
                          login/activate/app so in-memory demo data survives navigation
  pages/                 LoginPage, ActivatePage
  layouts/                AppShell (sidebar + topbar + content), Sidebar, Topbar
  components/sections/    One component per app section (Dashboard, Tasks, OKR, etc.)
  components/drawers/     Modals/drawers (Create Task, OKR panel, Check-in, etc.)
  components/Icon.jsx     Dynamic lucide-react icon lookup by name
  utils/cssText.js        Runtime CSS-text -> style-object helper for dynamic inline styles
  styles/                 design-system.css (brand tokens/type) + base-reset.css
  assets/fonts/           Self-hosted Manrope / Sora / Space Mono subsets
```

## Routing

- `/login`, `/activate`, `/app/:route` (dashboard, projects, campaigns, tasks,
  templates, qc, okr, analytics, content, repositories, files, effort, ideas,
  masters, users, config)
- All three screens are rendered through a single catch-all route so the app
  behaves as one persistent SPA instance (matching the original), while still
  giving every page a real, bookmarkable, back/forward-capable URL.
- Demo accounts have no real backend auth (matches the original — this is a
  client-only mock), so direct navigation to an `/app/*` URL is not gated
  behind login. Add a real auth guard here if this becomes a real backend.

## Notes on the port

- The original was exported from a design tool using a custom template DSL
  (`sc-if`/`sc-for`/`{{ }}` bindings, `sc-camel-on-*` events). It was
  mechanically transpiled into JSX 1:1 — every page, drawer, and modal from
  the original is present with no functionality omitted.
- The vanilla-JS lucide icon injection shim (`icons()` lifecycle method) was
  removed since `lucide-react` renders icons natively through React now.
- Business logic (110+ methods on `AppRoot`) is unchanged from the original.
