# AGENTS.md — Ciudadanía Inteligente (FCI) Web

## Project Overview

Astro v6 static multi-page site for a nonprofit. Stack: Astro 6.4 + Tailwind CSS v4 + Alpine.js 3. Spanish language. No tests, no lint, no CI.

## Build Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Static build to `./dist/` |
| `npm run preview` | Preview build locally |

Node >=22.12.0 required (specified in `package.json` engines).

## Tailwind v4 — Critical Setup

This repo uses **Tailwind CSS v4**, not v3. The configuration is unconventional:

- **No `tailwind.config.js` is used.** The file at `design-system/tailwind.config.js` is a reference mapping only; it is not loaded by the build.
- Tailwind is wired via `@tailwindcss/vite` in `astro.config.mjs`.
- All tokens (colors, fonts, spacing, shadows, radii) are defined in `src/styles/global.css` using the `@theme` directive.
- The only CSS file imported into the app is `src/styles/global.css` (imported by `src/layouts/Layout.astro`).

### Token classes (examples)
- Colors: `bg-primary`, `text-text-inverse`, `hover:bg-accent-magenta`
- Fonts: `font-sans`, `font-display`, `font-mono`
- Sizes: `text-hero-xl`, `text-h2`, `text-body`, `text-caption`
- Spacing: `spacing-4`, `spacing-12`
- Radii: `rounded-pill`, `rounded-lg`
- Shadows: `shadow-blue`, `shadow-card`

## Architecture

```
src/
  layouts/Layout.astro    # Base layout: imports global.css, loads fonts, Alpine.js
  pages/*.astro           # 6 static pages (index, nosotros, proyectos, novedades, contacto, transparencia)
  components/             # Astro components (Navbar, Footer, Button, Card, etc.)
  styles/global.css       # Tailwind v4 @theme + base styles
  scripts/alpine-init.js  # UNUSED — Alpine is initialized inline in Layout.astro
public/
  img/                    # All image assets (webp, svg)
  favicon.*
design-system/            # Reference CSS extracted from Figma; NOT used in build
```

## Global Styles That Affect Every Page

- **Topographic background overlay:** `main::before` in `global.css` applies a full-page topo texture (`/img/topo-background.webp`) to every `<main>` element. This is global and intentional.
- **Focus styles:** `:focus-visible` uses `outline: 2px solid var(--color-primary)` globally.
- **Base typography:** `html { font-size: 16px }`, body uses `font-sans` at `text-body` size.

## Component Patterns

- **Navbar:** Uses Alpine.js `x-data="{ open: false }"` for mobile menu. Active state uses `bg-accent-magenta`.
- **Button:** Props `variant` (`primary`|`ghost`|`inverse`), `size` (`sm`|`md`|`lg`), `href`. Renders `<a>` if `href` is provided, otherwise `<button>`.
- **Pages:** Import `Layout`, `Navbar`, `Footer`, wrap content in `<main>`, then `<Footer />`.

## Important Notes

- **No tests, no linter, no typechecker, no CI/CD.** `npm run build` is the only verification.
- **Alpine.js inline init:** In `Layout.astro`, Alpine is imported and started in a `<script type="module">` block. The `src/scripts/alpine-init.js` file exists but is not referenced anywhere.
- **Language switcher is a placeholder.** The ES/EN/PT buttons in the navbar are non-functional.
- **No content collections.** The `.astro/content.d.ts` has an empty `DataEntryMap`.
- **Figma MCP:** Configured in `opencode.json` for design reference.
- **Assets:** All images live in `public/img/` and are referenced with absolute paths (`/img/...`).
- **Canonical URL:** `Layout.astro` defaults to `https://ciudadaniai.org` if `Astro.site` is not set.

## Design System Reference

The `design-system/` folder contains CSS extracted from Figma (`tokens.css`, `typography.css`, `components.css`, `layout.css`, `preview.html`). These are documentation only and not imported into the Astro build. For the actual design tokens, use `src/styles/global.css`.

## Gotchas

- If you add a new Tailwind v4 feature or need to extend tokens, edit `src/styles/global.css` inside the `@theme` block. Do not create or modify `tailwind.config.js`.
- The `main::before` topo background is intentionally subtle (`opacity: 0.08`, `z-index: 0`). Per-section overlays use the `.bg-topo-image` utility class (`opacity: 0.06`) instead of inline SVGs.
- The `max-w-[1400px]` container width is used consistently across pages (`mx-auto px-6`).
