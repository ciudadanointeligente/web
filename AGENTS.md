# AGENTS.md — Ciudadanía Inteligente (FCI) Web

## Project Overview

Astro v6 static multi-page site for a nonprofit. Stack: Astro 6.4 + Tailwind CSS v4 + Alpine.js 3 + React 19 + Markdoc + Keystatic. Hosted on Netlify. Spanish language. No tests, no lint, no CI.

## Build Commands

| Command           | Action                         |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server at `localhost:4321` |
| `npm run build`   | Static build to `./dist/`      |
| `npm run preview` | Preview build locally          |
| `npm run astro`   | Astro CLI                      |

Node >=22.12.0 required (specified in `package.json` engines).

## Build & Deploy

- **Adapter:** `@astrojs/netlify` — the site is built with `output: "static"` but uses the Netlify adapter for deployment features (headers, redirects).
- **Netlify build:** `netlify.toml` runs `SKIP_KEYSTATIC=true npm run build` to skip Keystatic CMS during production builds.
- **Cache headers:** Images (`/img/*`) and Astro assets (`/_astro/*`) are cached immutably for 1 year.

## Integrations

- **React** — available for interactive components (though most pages use Astro + Alpine).
- **Markdoc** — content for blog posts is authored in `.mdoc` files under `src/content/posts/`.
- **Keystatic** — CMS integration for managing content. Skipped in production via `SKIP_KEYSTATIC=true`.
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin in `astro.config.mjs`.

## Tailwind v4 — Critical Setup

This repo uses **Tailwind CSS v4**, not v3. The configuration is unconventional:

- **No `tailwind.config.js` is used.** The file at `design-system/tailwind.config.js` (if present) is a reference mapping only; it is not loaded by the build.
- Tailwind is wired via `@tailwindcss/vite` in `astro.config.mjs`.
- All tokens (colors, fonts, spacing, shadows, radii) are defined in `src/styles/global.css` using the `@theme` directive.
- The only CSS file imported into the app is `src/styles/global.css` (imported by `src/layouts/Layout.astro`).

### Token classes (examples)

- Colors: `bg-primary`, `text-text-inverse`, `hover:bg-accent-magenta`, `bg-bg-cream`, `bg-bg-gray`, `bg-bg-blue-deep`
- Fonts: `font-sans`, `font-display`, `font-mono`
- Sizes: `text-hero-xl`, `text-hero-lg`, `text-hero`, `text-h1` … `text-h6`, `text-body`, `text-caption`
- Spacing: `spacing-1` through `spacing-16` (4px grid)
- Radii: `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-pill`
- Shadows: `shadow-blue`, `shadow-card`, `shadow-sm`, `shadow-md`, `shadow-lg`
- Transitions: `transition-fast`, `transition-base`, `transition-slow`

## Architecture

```
src/
  layouts/Layout.astro       # Base layout: imports global.css, loads fonts, Alpine.js, ClientRouter
  pages/
    index.astro              # Homepage
    nosotros.astro           # About us (team, mission, values)
    proyectos.astro          # Projects with filters + modals
    novedades.astro          # News + publications with filters
    contacto.astro           # Contact page
    transparencia.astro      # Transparency (reports, supporters, documents)
    posts/[slug].astro       # Dynamic blog post pages (Markdoc content)
  components/
    Navbar.astro             # Sticky nav with mobile hamburger menu (Alpine.js)
    Footer.astro             # Footer with social icons + Fundación Lealtad Chile
    Button.astro             # Reusable buttons (primary, ghost, inverse)
    Card.astro               # Cards with background variants
    SectionHeader.astro      # Section hero with color backgrounds
    Breadcrumb.astro         # Breadcrumb navigation
    PageHero.astro           # Page hero with breadcrumb + title + description
    PersonCard.astro         # Team member card with modal dialog
    ProjectModal.astro       # Project card trigger + detail modal with filters
    Newsletter.astro         # Newsletter signup form (with optional decorative variant)
    nosotros.astro           # *** ORPHAN / UNUSED — duplicate of pages/nosotros.astro
  styles/
    global.css               # Tailwind v4 @theme + base styles + .bg-topo utility
  scripts/
    alpine-init.js           # Alpine.js init script (imported by Layout.astro)
  content.config.ts          # Content collections definitions (Astro v5+ loader API)
  content/
    posts/*.mdoc             # Blog posts in Markdoc format
    people/*.yaml            # Board members data
    people2/*.yaml           # Executive team data
    proyectos/*.yaml         # Projects data
    publicaciones/*.yaml     # Publications data
    documentos/*.yaml        # Transparency documents data
    memorias/*.yaml          # Annual reports data
public/
  img/                       # Image assets (logos, backgrounds, illustrations)
  images/web/                # Additional web images (people photos, project cards)
  pdfs/publicaciones/        # Downloadable PDFs for publications
  posts/                     # Post-specific images
  docs/                      # Other documents
  favicon.*
design-system/               # Reference CSS extracted from Figma; NOT used in build
```

## Content Collections

Defined in `src/content.config.ts` using Astro v5+ `defineCollection` + `glob` loader:

| Collection       | Format  | Path                          | Purpose                         |
| ---------------- | ------- | ----------------------------- | ------------------------------- |
| `posts`          | `.mdoc` | `src/content/posts/`          | Blog posts (Markdoc)            |
| `people`         | `.yaml` | `src/content/people/`         | Board members                   |
| `people2`        | `.yaml` | `src/content/people2/`        | Executive team                  |
| `proyectos`      | `.yaml` | `src/content/proyectos/`      | Projects with categories, scope |
| `publicaciones`  | `.yaml` | `src/content/publicaciones/`  | Publications (PDF downloads)    |
| `documentos`     | `.yaml` | `src/content/documentos/`     | Transparency docs & protocols   |
| `memorias`       | `.yaml` | `src/content/memorias/`       | Annual reports                  |

## Routes (static + dynamic)

| Ruta                      | Página                      |
| :------------------------ | :-------------------------- |
| `/`                       | Inicio (homepage)           |
| `/nosotros`               | Nosotros                    |
| `/proyectos`              | Proyectos                   |
| `/novedades`              | Novedades + Publicaciones   |
| `/contacto`               | Contacto                    |
| `/transparencia`          | Transparencia               |
| `/posts/[slug]`           | Blog post detail (dynamic)  |

## Global Styles That Affect Every Page

- **Topographic background:** `body` has `background-image: url('/img/topo-background.webp')` with `background-size: cover`, fixed attachment. This is the global topo texture.
- **`.bg-topo` utility class:** Alternative SVG-based topo overlay (blue contour lines at 8% opacity) for per-section use. Applied via `.bg-topo` class.
- **Focus styles:** `:focus-visible` uses `outline: 2px solid var(--color-primary)` globally.
- **Base typography:** `html { font-size: 16px }`, body uses `font-sans` at `text-body` size.
- **Transitions:** All `<a>` and `<button>` elements have global transitions on color, background-color, box-shadow, and transform.
- **Astro ClientRouter:** Imported in `Layout.astro` for view transitions.

## Component Patterns

- **Navbar:** Uses Alpine.js `x-data="{ open: false }"` for mobile menu. Has a blue top bar ("En América Latina y el Caribe") with language switcher (ES/EN/PT). Active state uses `bg-accent-magenta`. Logo centered between two nav link groups.
- **Button:** Props `variant` (`primary`|`ghost`|`inverse`), `size` (`sm`|`md`|`lg`), `href`. Renders `<a>` if `href` is provided, otherwise `<button>`.
- **Card:** Props `title`, `description`, `variant` (`default`|`cream`|`warm`|`blue`), `href`, `hover`. Supports slot for children.
- **PageHero:** Blue hero section used on most pages. Props: `title`, `description` (HTML string via `set:html`), `breadcrumb` (array of `{label, href?}`).
- **PersonCard:** Team member card with photo, name, position. Click opens a native `<dialog>` modal with full bio, social links (email, Twitter, LinkedIn, Instagram, GitHub).
- **ProjectModal:** Project card (image + overlay) that opens a `<dialog>` modal with project name, description, categories, status, scope, and external link.
- **Newsletter:** Newsletter signup form section. Props: `decorated` (boolean) — when true, shows code texture background + notebook image decoration.
- **Pages:** Import `Layout`, `Navbar`, `Footer`, wrap content in `<main>`, then `<Footer />`. Most pages include `<Newsletter decorated />` before the footer.

## Important Notes

- **No tests, no linter, no typechecker, no CI/CD.** `npm run build` is the only verification.
- **Alpine.js:** Initialized via `src/scripts/alpine-init.js`, imported in `Layout.astro` as a `<script src>` tag.
- **Language switcher is a placeholder.** The ES/EN/PT buttons in the navbar exist but have no routing logic.
- **Keystatic CMS:** Used for content management in dev; skipped in production builds via env var.
- **Markdoc:** Blog posts use `.mdoc` files with Markdoc syntax, rendered by `@astrojs/markdoc`.
- **React:** Available via `@astrojs/react` integration but used only minimally (if at all).
- **Authentication / Auth0:** Not currently implemented.
- **Asset paths:** Images are in `public/img/`, `public/images/web/`, and `public/posts/`; referenced with absolute paths (`/img/...`, `/images/web/...`, `/posts/...`).
- **Canonical URL:** `Layout.astro` defaults to `https://ciudadaniai.org` if `Astro.site` is not set.
- **Orphan file:** `src/components/nosotros.astro` is a duplicate of `src/pages/nosotros.astro` and references non-existent components (`Boton.astro`, `NewsletterForm.astro`). It appears unused.
- **Figma MCP:** Configured in `opencode.json` for design reference.

## Design System Reference

The `design-system/` folder contains CSS extracted from Figma (`tokens.css`, `typography.css`, `components.css`, `layout.css`, `preview.html`). These are documentation only and not imported into the Astro build. For the actual design tokens, use `src/styles/global.css`.

## Gotchas

- If you add a new Tailwind v4 feature or need to extend tokens, edit `src/styles/global.css` inside the `@theme` block. Do not create or modify `tailwind.config.js`.
- The body-level topo background is an image (`/img/topo-background.webp`) with `background-attachment: fixed`. For per-section SVG-based topo overlays, use the `.bg-topo` utility class instead.
- The `max-w-[1400px]` container width is used consistently across pages (`mx-auto px-6`). Some pages also use `max-w-300`, `max-w-350`, `max-w-250`, `max-w-200` custom values.
- Posts use `.mdoc` (Markdoc) format, NOT `.md` or `.mdx`. The file extension is kept in the collection but stripped in URLs.
- Project and person modals use the native `<dialog>` element with CSS transitions. Media queries and animations use `@starting-style` for entry animations.
- The `nosotros.astro` page exists in both `src/pages/` (the real one) and `src/components/` (an orphan). Always edit `src/pages/nosotros.astro`.

---

## Estructura del proyecto

```
/
├── public/                       # Assets estáticos
│   ├── img/                      # Logos, backgrounds, ilustraciones
│   ├── images/web/               # Fotos de personas, project cards
│   ├── pdfs/publicaciones/       # PDFs descargables
│   └── posts/                    # Imágenes de posts
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Layout base (metatags, fuentes, Alpine.js, ClientRouter)
│   ├── components/
│   │   ├── Navbar.astro          # Navegación principal (responsive + Alpine)
│   │   ├── Footer.astro          # Footer institucional con redes sociales
│   │   ├── Button.astro          # Botones reutilizables
│   │   ├── Card.astro            # Tarjetas con variantes de fondo
│   │   ├── SectionHeader.astro   # Hero de sección con fondo de color
│   │   ├── Breadcrumb.astro      # Migas de pan
│   │   ├── PageHero.astro        # Hero de página con breadcrumb + título + descripción
│   │   ├── PersonCard.astro      # Tarjeta de persona con modal
│   │   ├── ProjectModal.astro    # Tarjeta de proyecto con modal + filtros
│   │   ├── Newsletter.astro      # Suscripción al newsletter (con variante decorada)
│   │   └── nosotros.astro        # *** ORFA — duplicado no usado de pages/nosotros.astro
│   ├── pages/
│   │   ├── index.astro           # Inicio
│   │   ├── nosotros.astro        # Nosotros (equipo, misión, valores)
│   │   ├── proyectos.astro       # Proyectos (con filtros + modales)
│   │   ├── novedades.astro       # Novedades (noticias + publicaciones)
│   │   ├── contacto.astro        # Contacto
│   │   ├── transparencia.astro   # Transparencia (reportes, financiamiento)
│   │   └── posts/[slug].astro    # Página dinámica de post (Markdoc)
│   ├── styles/
│   │   └── global.css            # Tailwind v4 @theme + estilos base
│   ├── scripts/
│   │   └── alpine-init.js        # Inicialización de Alpine.js
│   ├── content.config.ts         # Definiciones de colecciones de contenido
│   └── content/
│       ├── posts/*.mdoc          # Posts en formato Markdoc
│       ├── people/*.yaml         # Miembros del directorio
│       ├── people2/*.yaml        # Equipo ejecutivo
│       ├── proyectos/*.yaml      # Proyectos
│       ├── publicaciones/*.yaml  # Publicaciones
│       ├── documentos/*.yaml     # Documentos de transparencia
│       └── memorias/*.yaml       # Memorias anuales
├── design-system/                # Referencia Figma (NO usado en build)
├── astro.config.mjs              # Configuración de Astro
├── netlify.toml                  # Configuración de Netlify
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
- `--color-neutral-text` → `#373737`
- Fondo: `bg-default` (#fff), `bg-cream`, `bg-warm`, `bg-gray`, `bg-blue-deep`, `bg-blue-bright`
- Texto: `text-primary`, `text-body`, `text-inverse`, `text-muted`

### Tipografía

- **Principal:** `Work Sans` (300–900)
- **Display:** `Geologica` (700, 900)
- **Mono:** `Space Mono` (400, 700)

### Escala tipográfica

- `text-hero-xl` → 11.597rem
- `text-hero-lg` → 6.250rem
- `text-hero` → 3.750rem
- `text-h1` → 2.986rem
- `text-h2` → 2.488rem
- `text-h3` → 2.074rem
- `text-body` → 1rem (base 16px)
- `text-caption` → 0.845rem

### Espaciado (4px grid)

- `spacing-1` → 0.25rem (4px)
- `spacing-4` → 1rem (16px)
- `spacing-6` → 2rem (32px)
- `spacing-8` → 3rem (48px)
- `spacing-10` → 4rem (64px)
- `spacing-12` → 6rem (96px)
- `spacing-16` → 8rem (128px)

### Sombras

- `shadow-blue` → azul 20% opacity
- `shadow-card` → doble sombra para tarjetas
- `shadow-sm`, `shadow-md`, `shadow-lg` → escalas de profundidad

### Radios

- `rounded-xs` (5px), `rounded-sm` (6px), `rounded-md` (10px), `rounded-lg` (20px), `rounded-xl` (28px), `rounded-pill` (9999px)

---

## Componentes clave

### `<Navbar />`

- Barra azul superior con texto "En América Latina y el Caribe" y language switcher (ES/EN/PT) — no funcional
- Navegación sticky con menú mobile (Alpine.js `x-data="{ open: false }"`)
- Logo centrado, enlaces a izquierda (Inicio, Nosotros, Novedades) y derecha (Proyectos, Contacto, Transparencia)
- Estados: default → hover secondary (celeste) → active magenta

### `<Button />`

Props: `text`, `href`, `variant` (primary | ghost | inverse), `size` (sm | md | lg)

### `<Card />`

Props: `title`, `description`, `variant` (default | cream | warm | blue), `href`, `hover`

### `<PageHero />`

Props: `title`, `description` (HTML string), `breadcrumb` (array `{label, href?}`)

### `<PersonCard />`

Props: `name`, `position`, `photo`, `description`, `email?`, `twitter?`, `linkedin?`, `instagram?`, `github?`
Abre un `<dialog>` nativo con la información completa y enlaces sociales.

### `<ProjectModal />`

Props: `nombre`, `descripcion`, `imagen`, `link`, `categorias[]`, `alcance`, `status`, `order`
Renderiza un trigger (imagen) y un `<dialog>` nativo con detalle del proyecto.

### `<Newsletter />`

Props: `decorated` (boolean). Variante decorada incluye textura de código y notebook.

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
2. **Formularios:** Conectar el formulario de newsletter a un backend o servicio (Netlify Forms, Formspree, etc.).
3. **Internacionalización:** Implementar el language switcher (ES / EN / PT) con Astro i18n.
4. **SEO:** Generar `sitemap.xml` y `robots.txt` con `@astrojs/sitemap`.
5. **Limpieza:** Eliminar `src/components/nosotros.astro` (componente duplicado y no usado).
