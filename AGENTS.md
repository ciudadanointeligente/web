# AGENTS.md — Ciudadanía Inteligente (FCI) Web

## Project Overview

Astro v6 static multi-page site for a nonprofit. Stack: Astro 6.4 + Tailwind CSS v4 + Alpine.js 3. Spanish language. No tests, no lint, no CI.

## Build Commands

| Command           | Action                         |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server at `localhost:4321` |
| `npm run build`   | Static build to `./dist/`      |
| `npm run preview` | Preview build locally          |

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

---

## Estructura del proyecto

```
/
├── public/                    # Assets estáticos (favicon, imágenes, fonts)
├── src/
│   ├── layouts/
│   │   └── Layout.astro         # Layout base (metatags, fuentes, Alpine.js)
│   ├── components/
│   │   ├── Navbar.astro         # Navegación principal (responsive + Alpine)
│   │   ├── Footer.astro         # Footer institucional
│   │   ├── Button.astro         # Botones reutilizables (primary, ghost, inverse)
│   │   ├── Card.astro           # Tarjetas con variantes de fondo
│   │   ├── SectionHeader.astro # Hero de sección con fondo de color
│   │   └── Breadcrumb.astro     # Migas de pan
│   ├── pages/
│   │   ├── index.astro          # Inicio
│   │   ├── nosotros.astro       # Nosotros
│   │   ├── proyectos.astro      # Proyectos
│   │   ├── novedades.astro      # Novedades
│   │   ├── contacto.astro       # Contacto
│   │   └── transparencia.astro  # Transparencia
│   └── styles/
│       └── global.css           # Tailwind + tokens del design system
├── design-system/              # Referencia: tokens, tipografía, componentes puros CSS
├── astro.config.mjs            # Configuración de Astro
├── tailwind.config.js          # Referencia Tailwind v3 (no usado en v4)
└── package.json
```

---

## Comandos

| Comando           | Acción                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Instalar dependencias                       |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`  |
| `npm run build`   | Build estático para producción en `./dist/` |
| `npm run preview` | Previsualizar build localmente              |

---

## Sistema de Diseño

Los tokens del design system se configuran en `src/styles/global.css` mediante la directiva `@theme` de Tailwind v4:

### Colores

- `--color-primary` → `#0026FF` (Azul Incidencia)
- `--color-secondary` → `#74D9F9` (Celeste Transparencia)
- `--color-accent-magenta` → `#DA00FF` (Magenta Participación)
- `--color-accent-green` → `#96F67D` (Verde Acción Cívica)
- `--color-neutral-dark` → `#252943` (Azul Democracia)

### Tipografía

- **Principal:** `Work Sans` (300–900)
- **Display:** `Geologica` (700, 900)
- **Mono:** `Space Mono` (400, 700)

### Escala tipográfica

- `text-hero-xl` → 11.6rem
- `text-h1` → 2.986rem
- `text-h2` → 2.488rem
- `text-h3` → 2.074rem
- `text-body` → 1rem (base 16px)

### Espaciado (4px grid)

- `spacing-1` → 0.25rem (4px)
- `spacing-4` → 1rem (16px)
- `spacing-6` → 2rem (32px)
- `spacing-12`→ 6rem (96px)

---

## Rutas generadas (estáticas)

| Ruta             | Página        |
| :--------------- | :------------ |
| `/`              | Inicio        |
| `/nosotros`      | Nosotros      |
| `/proyectos`     | Proyectos     |
| `/novedades`     | Novedades     |
| `/contacto`      | Contacto      |
| `/transparencia` | Transparencia |

---

## Componentes clave

### `<Navbar />`

- Navegación sticky con menú mobile (Alpine.js `x-data="{ open: false }"`)
- Estados: default → hover celeste → active magenta
- Language switcher placeholder (ES)

### `<Button />`

Props: `text`, `href`, `variant` (primary | ghost | inverse), `size` (sm | md | lg)

### `<Card />`

Props: `title`, `description`, `variant` (default | cream | warm | blue), `href`, `hover`

### `<SectionHeader />`

Props: `title`, `subtitle`, `bgColor` (primary | secondary | default | neutral-dark)

---

## Referencia adicional

La carpeta `design-system/` contiene la extracción original del archivo de Figma:

- `tokens.css` — Variables CSS puros
- `typography.css` — Clases tipográficas puras
- `components.css` — Componentes en CSS puro
- `layout.css` — Utilidades de layout
- `preview.html` — Visualización estática de referencia

Estos archivos no se usan directamente en el build de Astro, pero sirven como documentación y referencia del design system.

---

## Próximos pasos sugeridos

1. **Revisión visual:** Comparar cada página con los frames de Figma (`Prototipo Desktop` / `Prototipo Mobile`) y ajustar paddings, márgenes y tipografía exacta.
2. **Assets:** Agregar imágenes reales al directorio `public/` y reemplazar los placeholders.
3. **Mobile:** Ajustar breakpoints y layouts para la vista mobile (revisar página `Prototipo Mobile` en Figma).
4. **Formularios:** Conectar el formulario de contacto y newsletter a un backend o servicio (Netlify Forms, Formspree, etc.).
5. **Internacionalización:** Implementar el language switcher (ES / EN / PT) con Astro i18n.
6. **SEO:** Generar `sitemap.xml` y `robots.txt` con `@astrojs/sitemap`.

---

_Sistema de diseño extraído desde Figma (`Web FCI - Iteración`) el 2026-06-01._
