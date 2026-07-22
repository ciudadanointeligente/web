import { config, fields, collection } from "@keystatic/core";

const opcionesTematica = [
  { label: "Democracia ambiental", value: "Democracia ambiental" },
  { label: "Participación ciudadana", value: "Participación ciudadana" },
  { label: "Articulación e incidencia", value: "Articulación e incidencia" },
  {
    label: "Transparencia y rendición de cuentas",
    value: "Transparencia y rendición de cuentas",
  },
  { label: "Gobiernos locales", value: "Gobiernos locales" },
  {
    label: "Innovación y tecnología cívica",
    value: "Innovación y tecnología cívica",
  },
  {
    label: "Educación y Garantías democráticas",
    value: "Educación y Garantías democráticas",
  },
] as const;

const opcionesTipo = [
  { label: "Noticia", value: "Noticia" },
  { label: "Publicación", value: "Publicación" },
] as const;

const useCloud = import.meta.env.PROD;

export default config({
  storage: {
    kind: useCloud ? "cloud" : "local",
  },
  cloud: useCloud ? { project: "fciweb/webf", branch: "master" } : undefined,
  collections: {
    posts: collection({
      label: "Noticias",
      columns: ["title", "date"],
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        subtitle: fields.text({ label: "Subtítulo" }),
        category: fields.text({ label: "Categoría/s" }),
        author: fields.text({ label: "Autor/s" }),
        imagepost: fields.image({
          label: "Imagen Principal",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        date: fields.date({
          label: "Fecha de Publicación",
          validation: { isRequired: true },
        }),
        content: fields.markdoc({
          label: "Contenido",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "../../public/images/posts/",
            },
          },
        }),
        showOnHome: fields.checkbox({
          label: "Mostrar en Home",
          description:
            "Marcar para mostrar esta noticia en el carrusel de la página de inicio.",
        }),
        tipo: fields.select({
          label: "Tipo",
          options: opcionesTipo,
          defaultValue: "Noticia",
        }),
        tematica: fields.multiselect({
          label: "Temáticas",
          description: "Seleccionar una o más temáticas.",
          options: opcionesTematica,
        }),
      },
    }),
    people: collection({
      label: "Directorio",
      slugField: "name",
      path: "src/content/people/*",
      schema: {
        name: fields.slug({ name: { label: "Nombre" } }),
        position: fields.text({ label: "Cargo" }),
        order: fields.number({
          label: "Orden",
          validation: { isRequired: true },
        }),
        photo: fields.image({
          label: "Foto",
          directory: "public/images/people",
          publicPath: "/images/people/",
        }),
        description: fields.text({ label: "Descripción" }),
        email: fields.text({ label: "Email" }),
        twitter: fields.text({ label: "Twitter" }),
        linkedin: fields.text({ label: "LinkedIn" }),
        instagram: fields.text({ label: "Instagram" }),
        github: fields.text({ label: "GitHub" }),
      },
    }),
    peopleEn: collection({
      label: "Board (English)",
      slugField: "name",
      path: "src/content/people-en/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        position: fields.text({ label: "Position" }),
        order: fields.number({
          label: "Order",
          validation: { isRequired: true },
        }),
        photo: fields.image({
          label: "Photo",
          directory: "public/images/people",
          publicPath: "/images/people/",
        }),
        description: fields.text({ label: "Description" }),
        email: fields.text({ label: "Email" }),
        twitter: fields.text({ label: "Twitter" }),
        linkedin: fields.text({ label: "LinkedIn" }),
        instagram: fields.text({ label: "Instagram" }),
        github: fields.text({ label: "GitHub" }),
      },
    }),
    people2: collection({
      label: "Equipo",
      slugField: "name",
      path: "src/content/people2/*",
      schema: {
        name: fields.slug({ name: { label: "Nombre" } }),
        position: fields.text({ label: "Cargo" }),
        order: fields.number({
          label: "Orden",
          validation: { isRequired: true },
        }),
        photo: fields.image({
          label: "Foto",
          directory: "public/images/people2",
          publicPath: "/images/people2/",
        }),
        description: fields.text({ label: "Descripción" }),
        email: fields.text({ label: "Email" }),
        twitter: fields.text({ label: "Twitter" }),
        linkedin: fields.text({ label: "LinkedIn" }),
        instagram: fields.text({ label: "Instagram" }),
        github: fields.text({ label: "GitHub" }),
      },
    }),
    people2En: collection({
      label: "Team (English)",
      slugField: "name",
      path: "src/content/people2-en/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        position: fields.text({ label: "Position" }),
        order: fields.number({
          label: "Order",
          validation: { isRequired: true },
        }),
        photo: fields.image({
          label: "Photo",
          directory: "public/images/people2",
          publicPath: "/images/people2/",
        }),
        description: fields.text({ label: "Description" }),
        email: fields.text({ label: "Email" }),
        twitter: fields.text({ label: "Twitter" }),
        linkedin: fields.text({ label: "LinkedIn" }),
        instagram: fields.text({ label: "Instagram" }),
        github: fields.text({ label: "GitHub" }),
      },
    }),
    proyectos: collection({
      label: "Proyectos",
      slugField: "nombre",
      path: "src/content/proyectos/*",
      schema: {
        nombre: fields.slug({ name: { label: "Nombre" } }),
        order: fields.number({
          label: "Orden",
          validation: { isRequired: true },
        }),
        imagen: fields.image({
          label: "Imagen",
          directory: "public/images/proyectos",
          publicPath: "/images/proyectos/",
        }),
        descripcion: fields.text({
          label: "Descripción",
          multiline: true,
        }),
        link: fields.url({ label: "Link" }),
        link2: fields.url({ label: "Link 2" }),
        status: fields.select({
          label: "Estado",
          options: [
            { label: "Actual", value: "Actual" },
            { label: "Pasado", value: "Pasado" },
          ],
          defaultValue: "Actual",
        }),
        alcance: fields.select({
          label: "Alcance",
          options: [
            { label: "Regional", value: "Regional" },
            { label: "Local", value: "Local" },
          ],
          defaultValue: "Regional",
        }),
        home: fields.checkbox({
          label: "Mostrar en Home",
          description:
            "Marcar para mostrar este proyecto en la página de inicio.",
        }),
        categorias: fields.multiselect({
          label: "Categorías",
          description: "Temáticas del proyecto. Seleccionar al menos una.",
          options: [
            { label: "Democracia ambiental", value: "Democracia ambiental" },
            {
              label: "Participación ciudadana",
              value: "Participación ciudadana",
            },
            {
              label: "Articulación e incidencia",
              value: "Articulación e incidencia",
            },
            {
              label: "Transparencia y rendición de cuentas",
              value: "Transparencia y rendición de cuentas",
            },
            { label: "Gobiernos locales", value: "Gobiernos locales" },
            {
              label: "Innovación y tecnología cívica",
              value: "Innovación y tecnología cívica",
            },
            {
              label: "Educación y Garantías democráticas",
              value: "Educación y Garantías democráticas",
            },
          ],
        }),
      },
    }),
    proyectosEn: collection({
      label: "Projects (English)",
      slugField: "nombre",
      path: "src/content/proyectos-en/*",
      schema: {
        nombre: fields.slug({ name: { label: "Name" } }),
        order: fields.number({
          label: "Order",
          validation: { isRequired: true },
        }),
        imagen: fields.image({
          label: "Image",
          directory: "public/images/proyectos",
          publicPath: "/images/proyectos/",
        }),
        descripcion: fields.text({
          label: "Description",
          multiline: true,
        }),
        link: fields.url({ label: "Link" }),
        link2: fields.url({ label: "Link 2" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Current", value: "Actual" },
            { label: "Past", value: "Pasado" },
          ],
          defaultValue: "Actual",
        }),
        alcance: fields.select({
          label: "Scope",
          options: [
            { label: "Regional", value: "Regional" },
            { label: "Local", value: "Local" },
          ],
          defaultValue: "Regional",
        }),
        home: fields.checkbox({
          label: "Show on Home",
          description:
            "Check to show this project on the home page.",
        }),
        categorias: fields.multiselect({
          label: "Categories",
          description: "Project themes. Select at least one.",
          options: [
            { label: "Environmental Democracy", value: "Democracia ambiental" },
            {
              label: "Citizen Participation",
              value: "Participación ciudadana",
            },
            {
              label: "Articulation and Advocacy",
              value: "Articulación e incidencia",
            },
            {
              label: "Transparency and Accountability",
              value: "Transparencia y rendición de cuentas",
            },
            { label: "Local Governments", value: "Gobiernos locales" },
            {
              label: "Innovation and Civic Technology",
              value: "Innovación y tecnología cívica",
            },
            {
              label: "Education and Democratic Guarantees",
              value: "Educación y Garantías democráticas",
            },
          ],
        }),
      },
    }),

    publicaciones: collection({
      label: "Publicaciones",
      slugField: "nombre",
      path: "src/content/publicaciones/*",
      schema: {
        nombre: fields.slug({ name: { label: "Título" } }),
        descripcion: fields.text({ label: "Descripción" }),
        imagen: fields.image({
          label: "imagen",
          directory: "public/images/publicaciones",
          publicPath: "/images/publicaciones/",
        }),
        link: fields.url({ label: "Link" }),
        descarga: fields.file({
          label: "Documento",
          directory: "public/pdfs/publicaciones",
          publicPath: "/pdfs/publicaciones/",
        }),
        order: fields.number({
          label: "Orden",
          validation: { isRequired: true },
        }),
        showOnHome: fields.checkbox({
          label: "Mostrar en Home",
          description:
            "Marcar para mostrar esta publicación en la sección de publicaciones del home.",
        }),
        tipo: fields.select({
          label: "Tipo",
          options: opcionesTipo,
          defaultValue: "Publicación",
        }),
        tematica: fields.multiselect({
          label: "Temáticas",
          description: "Seleccionar una o más temáticas.",
          options: opcionesTematica,
        }),
      },
    }),
    publicacionesEn: collection({
      label: "Publications (English)",
      slugField: "nombre",
      path: "src/content/publicaciones-en/*",
      schema: {
        nombre: fields.slug({ name: { label: "Title" } }),
        descripcion: fields.text({ label: "Description" }),
        imagen: fields.image({
          label: "image",
          directory: "public/images/publicaciones",
          publicPath: "/images/publicaciones/",
        }),
        link: fields.url({ label: "Link" }),
        descarga: fields.file({
          label: "Document",
          directory: "public/pdfs/publicaciones",
          publicPath: "/pdfs/publicaciones/",
        }),
        order: fields.number({
          label: "Order",
          validation: { isRequired: true },
        }),
        showOnHome: fields.checkbox({
          label: "Show on Home",
          description:
            "Check to show this publication on the home publications section.",
        }),
        tipo: fields.select({
          label: "Type",
          options: [
            { label: "News", value: "Noticia" },
            { label: "Publication", value: "Publicación" },
          ],
          defaultValue: "Publicación",
        }),
        tematica: fields.multiselect({
          label: "Themes",
          description: "Select one or more themes.",
          options: opcionesTematica,
        }),
      },
    }),

    documentos: collection({
      label: "Documentos",
      slugField: "nombre",
      path: "src/content/documentos/*",
      schema: {
        nombre: fields.slug({ name: { label: "Nombre" } }),
        link: fields.url({ label: "Link" }),
        order: fields.number({
          label: "Orden",
          validation: { isRequired: true },
        }),
        descarga: fields.file({
          label: "Documento",
          directory: "public/pdfs/documentos",
          publicPath: "/pdfs/documentos/",
        }),
      },
    }),

    memorias: collection({
      label: "Memorias",
      slugField: "nombre",
      path: "src/content/memorias/*",
      schema: {
        nombre: fields.slug({ name: { label: "Nombre" } }),
        link: fields.url({ label: "Link" }),
        order: fields.number({
          label: "Orden",
          validation: { isRequired: true },
        }),
        descarga: fields.file({
          label: "Documento",
          directory: "public/pdfs/memorias",
          publicPath: "/pdfs/memorias/",
        }),
      },
    }),
  },
});
