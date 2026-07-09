# AGENTS.md — Ciudadanía Inteligente (FCI) Web

## Resumen del proyecto

Sitio multi-página estático con Astro v6 para una organización sin fines de lucro.
Stack: Astro 6.4 + Tailwind CSS v4 + Alpine.js 3 + React 19 + Markdoc + Keystatic. Netlify. Español.
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
  styles/global.css          # Tokens Tailwind v4 (@theme) + estilos base
  scripts/alpine-init.js     # Inicialización de Alpine.js
  content.config.ts          # Colecciones de contenido
  content/
    posts/*.mdoc             # Blog posts (Markdoc)
    people/*.yaml            # Directorio
    people2/*.yaml           # Equipo ejecutivo
    proyectos/*.yaml         # Proyectos
    publicaciones/*.yaml     # Publicaciones
    documentos/*.yaml        # Documentos de transparencia
    memorias/*.yaml          # Memorias anuales
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

| Colección | Ruta | Formato |
| :-------- | :--- | :------ |
| `posts` | `src/content/posts/` | `.mdoc` |
| `people` | `src/content/people/` | `.yaml` |
| `people2` | `src/content/people2/` | `.yaml` |
| `proyectos` | `src/content/proyectos/` | `.yaml` |
| `publicaciones` | `src/content/publicaciones/` | `.yaml` |
| `documentos` | `src/content/documentos/` | `.yaml` |
| `memorias` | `src/content/memorias/` | `.yaml` |

## Rutas

| Ruta | Página |
| :--- | :----- |
| `/` | Inicio |
| `/nosotros` | Nosotros |
| `/proyectos` | Proyectos |
| `/novedades` | Novedades + Publicaciones |
| `/contacto` | Contacto |
| `/transparencia` | Transparencia |
| `/posts/[slug]` | Detalle de post |

## Notas importantes

- `npm run build` es la única verificación del proyecto.
- Keystatic se salta en producción con `SKIP_KEYSTATIC=true`.
- El language switcher (ES/EN/PT) del navbar no tiene lógica de routing.
- Los posts usan formato Markdoc (`.mdoc`), no Markdown común.
- Assets referenciados con rutas absolutas: `/img/...`, `/images/...`, `/pdfs/...`.
- Falta `public/og-image.jpg`; `Layout.astro` la referencia por defecto.
- No existe carpeta `design-system/` en este repositorio.
