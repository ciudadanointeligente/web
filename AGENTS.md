# AGENTS.md — Ciudadanía Inteligente (FCI) Web

## Resumen del proyecto

Sitio multi-página estático con Astro v7 para una organización sin fines de lucro.
Stack: Astro 7.3 + Tailwind CSS v4 + Alpine.js 3 + React 19 + Markdoc + Keystatic. Netlify. Español e inglés.
Sin tests, linter, typechecker ni CI.

## Comandos

| Comando | Acción |
| :------ | :----- |
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` (con `NETLIFY_DEV=true`) |
| `npm run build` | Build estático en `./dist/` |
| `npm run preview` | Previsualizar build localmente |

- `npm run build` es la única verificación del proyecto (no hay tests/lint/typecheck).
- Hay `pnpm-lock.yaml` y `pnpm-workspace.yaml`; `netlify.toml` ejecuta `npm run build`. Cualquiera de los dos gestores funciona, pero respeta el lockfile existente (pnpm) si instalas.
- Keystatic se salta en producción con la variable de entorno `SKIP_KEYSTATIC` (gestionada en Netlify; no está en `netlify.toml`).

## Estructura

```
src/
  layouts/Layout.astro       # Layout base: CSS, fuentes, ClientRouter, GA, Alpine.js
  pages/                     # Rutas estáticas y dinámicas del sitio
  components/                # Componentes Astro en uso
    Navbar.astro
    Footer.astro
    PageHero.astro
    PersonCard.astro         # Solo en /nosotros y /en/nosotros
    ProjectModal.astro       # Solo en /proyectos y /en/proyectos
    Newsletter.astro
    LanguagePicker.astro     # Selector de idioma, usado por Navbar
  i18n/                      # Internacionalización
    ui.ts                      # Diccionario de strings y configuración de idiomas
    utils.ts                   # Helpers: getLangFromUrl, useTranslations, useTranslatedPath
  styles/global.css          # Tokens Tailwind v4 (@theme) + estilos base
  scripts/alpine-init.js     # Inicialización de Alpine.js
  content.config.ts          # Colecciones de contenido
  content/
    posts/*.mdoc             # Blog posts (Markdoc, solo español)
    people/*.yaml            # Directorio (español)
    people-en/*.yaml         # Board (inglés)
    people2/*.yaml           # Equipo ejecutivo (español)
    people2-en/*.yaml        # Executive team (inglés)
    proyectos/*.yaml         # Proyectos (español)
    proyectos-en/*.yaml      # Projects (inglés)
    publicaciones/*.yaml     # Publicaciones (español)
    publicaciones-en/*.yaml  # Publications (inglés)
    documentos/*.yaml        # Documentos de transparencia (español)
    memorias/*.yaml          # Memorias anuales (español)
public/
  img/                       # Imágenes activas del sitio (logos, favicon, etc.)
  images/
    people/                  # Fotos del directorio
    people2/                 # Fotos del equipo ejecutivo
    posts/                   # Imágenes de posts (subcarpetas por slug)
    proyectos/               # Imágenes de proyectos
    publicaciones/           # Imágenes de publicaciones
  pdfs/publicaciones/        # PDFs de publicaciones (actualmente no referenciados)
  _redirects                 # Redirecciones de Netlify
  transparencia-financiamiento.csv
```

Archivos raíz relevantes: `astro.config.mjs`, `keystatic.config.ts`, `netlify.toml`, `tsconfig.json` (extiende `astro/tsconfigs/strict`).

## Tailwind v4

- No se usa `tailwind.config.js`.
- Los tokens están en `src/styles/global.css` con `@theme`.
- El único CSS importado en la app es `src/styles/global.css` (desde `Layout.astro`).
- Tailwind se integra vía el plugin Vite `@tailwindcss/vite` en `astro.config.mjs`.

## Colecciones de contenido

Definidas en `src/content.config.ts` con `defineCollection` + `glob`. Los esquemas usan Zod:

- `postSchema`: `title`, `subtitle?`, `imagepost?`, `date`, `category?`, `author?`, `showOnHome` (default `false`), `tipo` (`Noticia`|`Publicación`, default `Noticia`), `tematica?` (categorías de proyecto).
- `peopleSchema`: `name`, `position`, `order`, `photo`, `description`, `email?`, `twitter?`, `linkedin?`, `instagram?`, `github?`.
- `proyectoSchema`: `nombre`, `imagen`, `order`, `descripcion`, `link`, `link2?`, `status` (`Actual`|`Pasado`), `alcance` (`Regional`|`Local`), `home` (default `false`), `categorias` (≥1).
- `publicacionSchema`: `nombre`, `imagen?`, `descripcion?`, `link`, `descarga?`, `order`, `showOnHome` (default `false`), `tipo`, `tematica` (≥1).
- `documentoSchema` / `memoriaSchema`: `nombre`, `link`, `descarga?`, `order?`.

| Colección | Ruta | Formato | Idioma |
| :-------- | :--- | :------ | :----- |
| `posts` | `src/content/posts/` | `.mdoc` | Español |
| `people` | `src/content/people/` | `.yaml` | Español |
| `peopleEn` | `src/content/people-en/` | `.yaml` | Inglés |
| `people2` | `src/content/people2/` | `.yaml` | Español |
| `people2En` | `src/content/people2-en/` | `.yaml` | Inglés |
| `proyectos` | `src/content/proyectos/` | `.yaml` | Español |
| `proyectosEn` | `src/content/proyectos-en/` | `.yaml` | Inglés |
| `publicaciones` | `src/content/publicaciones/` | `.yaml` | Español |
| `publicacionesEn` | `src/content/publicaciones-en/` | `.yaml` | Inglés |
| `documentos` | `src/content/documentos/` | `.yaml` | Español |
| `memorias` | `src/content/memorias/` | `.yaml` | Español |

## Rutas

### Español (default, sin prefijo)

| Ruta | Página |
| :--- | :----- |
| `/` | Inicio |
| `/nosotros` | Nosotros |
| `/proyectos` | Proyectos |
| `/novedades` | Novedades + Publicaciones |
| `/contacto` | Contacto |
| `/transparencia` | Transparencia |
| `/financiamiento` | Financiamiento |
| `/posts/[slug]` | Detalle de post |

### Inglés (`/en/`)

| Ruta | Página |
| :--- | :----- |
| `/en/` | Home |
| `/en/nosotros` | About |
| `/en/proyectos` | Projects |
| `/en/novedades` | News |
| `/en/contacto` | Contact |
| `/en/transparencia` | Transparency |
| `/en/financiamiento` | Funding |
| `/en/posts/[slug]` | Post detail |

## Notas importantes

- `astro.config.mjs`: `output: "static"` + adaptador `@astrojs/netlify`, `site: https://ciudadaniai.org`, `trailingSlash: "ignore"`, `build.format: "directory"`.
- `Layout.astro` incluye `ClientRouter` (View Transitions) y Google Analytics (`gtag`, ID `G-F0469TVZLF`).
- Keystatic: `keystatic.config.ts` usa almacenamiento `local` en dev y `cloud` (`fciweb/webf`, rama `master`) en producción; el panel vive en `/keystatic` en desarrollo. Los directorios de subida apuntan a `public/images/...` y `public/pdfs/...`.
- El language switcher del navbar (ES/EN) es funcional y enlaza a la misma página en cada idioma (`LanguagePicker.astro`).
- Los posts usan formato Markdoc (`.mdoc`), no Markdown común.
- Assets referenciados con rutas absolutas: `/img/...`, `/images/...`, `/pdfs/...`.
- Falta `public/og-image.jpg`; `Layout.astro` la referencia por defecto.
- El campo `descarga` de publicaciones/documentos/memorias no se usa en ningún YAML; los PDFs de `public/pdfs/` no están referenciados.
- No existe carpeta `design-system/` en este repositorio.
