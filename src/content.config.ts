import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const categoriasProyecto = [
  "Democracia ambiental",
  "Participación ciudadana",
  "Articulación e incidencia",
  "Transparencia y rendición de cuentas",
  "Gobiernos locales",
  "Innovación y tecnología cívica",
  "Educación y Garantías democráticas",
] as const;

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    imagepost: z.string().optional(),
    date: z.date(),
    category: z.string().optional(),
    author: z.string().optional(),
    showOnHome: z.boolean().default(false),
    tipo: z.enum(["Noticia", "Publicación"]).default("Noticia"),
    tematica: z.array(z.enum(categoriasProyecto)).optional(),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/people" }),
  schema: z.object({
    name: z.string(),
    position: z.string(),
    order: z.number(),
    photo: z.string(),
    description: z.string(),
    email: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
    github: z.string().optional(),
  }),
});

const people2 = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/people2" }),
  schema: z.object({
    name: z.string(),
    position: z.string(),
    order: z.number(),
    photo: z.string(),
    description: z.string(),
    email: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
    github: z.string().optional(),
  }),
});

const proyectos = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/proyectos" }),
  schema: z.object({
    nombre: z.string(),
    imagen: z.string(),
    order: z.number(),
    descripcion: z.string(),
    link: z.string().url(),
    link2: z.string().url().optional(),
    status: z.enum(["Actual", "Pasado"]),
    alcance: z.enum(["Regional", "Local"]),
    home: z.boolean().default(false),
    categorias: z.array(z.enum(categoriasProyecto)).min(1),
  }),
});

const publicaciones = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/publicaciones" }),
  schema: z.object({
    nombre: z.string(),
    imagen: z.string().optional(),
    descripcion: z.string().optional(),
    link: z.string().url(),
    descarga: z.string().optional(),
    order: z.number(),
    showOnHome: z.boolean().default(false),
    tipo: z.enum(["Noticia", "Publicación"]).default("Publicación"),
    tematica: z.array(z.enum(categoriasProyecto)).min(1),
  }),
});

const documentos = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/documentos" }),
  schema: z.object({
    nombre: z.string(),
    link: z.string().url(),
    descarga: z.string().optional(),
    order: z.number().optional(),
  }),
});

const memorias = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/memorias" }),
  schema: z.object({
    nombre: z.string(),
    link: z.string().url(),
    descarga: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  posts,
  people,
  people2,
  proyectos,
  publicaciones,
  documentos,
  memorias,
};
