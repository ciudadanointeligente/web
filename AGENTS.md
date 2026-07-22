# AGENTS.md — Ciudadanía Inteligente (FCI) Web

## Resumen del proyecto

Sitio multi-página estático con Astro v6 para una organización sin fines de lucro.
Stack: Astro 6.4 + Tailwind CSS v4 + Alpine.js 3 + React 19 + Markdoc + Keystatic. Netlify. Español e inglés.
Sin tests, linter, typechecker ni CI.

## Comandos

| Comando | Acción |
| :------ | :----- |
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build estático en `./dist/` |
| `npm run preview` | Previsualizar build localmente |

Netlify ejecuta: `SKIP_KEYSTATIC=true npm run build`.

## Estructura

```
src/
  layouts/Layout.astro       # Layout base: CSS, fuentes, Alpine.js, ClientRouter
  pages/                     # Rutas estáticas y dinámicas del sitio
  components/                # Componentes Astro en uso
    Navbar.astro
    Footer.astro
    PageHero.astro
    PersonCard.astro
    ProjectModal.astro
    Newsletter.astro
    LanguagePicker.astro      # Selector de idioma funcional
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
  img/                       # Imágenes activas del sitio
  images/
    people/                  # Fotos del directorio
    people2/                 # Fotos del equipo ejecutivo
    posts/                   # Imágenes de posts (subcarpetas por slug)
    proyectos/               # Imágenes de proyectos
    publicaciones/           # Imágenes de publicaciones
  pdfs/publicaciones/        # PDFs de publicaciones (actualmente no referenciados)
```

## Tailwind v4

- No se usa `tailwind.config.js`.
- Los tokens están en `src/styles/global.css` con `@theme`.
- El único CSS importado en la app es `src/styles/global.css` (desde `Layout.astro`).

## Colecciones de contenido

Definidas en `src/content.config.ts` con `defineCollection` + `glob`:

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

- `npm run build` es la única verificación del proyecto.
- Keystatic se salta en producción con `SKIP_KEYSTATIC=true`.
- El language switcher del navbar (ES/EN) es funcional y enlaza a la misma página en cada idioma.
- Los posts usan formato Markdoc (`.mdoc`), no Markdown común.
- Assets referenciados con rutas absolutas: `/img/...`, `/images/...`, `/pdfs/...`.
- Falta `public/og-image.jpg`; `Layout.astro` la referencia por defecto.
- No existe carpeta `design-system/` en este repositorio.
