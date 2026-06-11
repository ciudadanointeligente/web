# Sitio Web — Ciudadanía Inteligente (FCI)

> Proyecto Astro + Tailwind CSS v4 + Alpine.js con Sistema de Diseño integrado extraído desde Figma.

---

## Tecnologías

- **Astro** v6 — Framework estático multi-página
- **Tailwind CSS** v4 — Utilidades CSS con tokens del design system
- **Alpine.js** v3 — Interactividad ligera (navbar mobile, dropdowns, etc.)

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

| Comando           | Acción                                           |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Instalar dependencias                            |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`       |
| `npm run build`   | Build estático para producción en `./dist/`      |
| `npm run preview` | Previsualizar build localmente                   |

---

## Sistema de Diseño

Los tokens del design system se configuran en `src/styles/global.css` mediante la directiva `@theme` de Tailwind v4:

### Colores
- `--color-primary`        → `#0026FF` (Azul Incidencia)
- `--color-secondary`      → `#74D9F9` (Celeste Transparencia)
- `--color-accent-magenta` → `#DA00FF` (Magenta Participación)
- `--color-accent-green`   → `#96F67D` (Verde Acción Cívica)
- `--color-neutral-dark`   → `#252943` (Azul Democracia)

### Tipografía
- **Principal:** `Work Sans` (300–900)
- **Display:** `Geologica` (700, 900)
- **Mono:** `Space Mono` (400, 700)

### Escala tipográfica
- `text-hero-xl` → 11.6rem
- `text-h1`      → 2.986rem
- `text-h2`      → 2.488rem
- `text-h3`      → 2.074rem
- `text-body`    → 1rem (base 16px)

### Espaciado (4px grid)
- `spacing-1` → 0.25rem (4px)
- `spacing-4` → 1rem    (16px)
- `spacing-6` → 2rem    (32px)
- `spacing-12`→ 6rem    (96px)

---

## Rutas generadas (estáticas)

| Ruta              | Página        |
| :---------------- | :------------ |
| `/`               | Inicio        |
| `/nosotros`       | Nosotros      |
| `/proyectos`      | Proyectos     |
| `/novedades`      | Novedades     |
| `/contacto`       | Contacto      |
| `/transparencia`  | Transparencia |

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

*Sistema de diseño extraído desde Figma (`Web FCI - Iteración`) el 2026-06-01.*
