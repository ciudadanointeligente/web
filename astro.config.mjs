// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://ciudadaniai.org",
  output: "static",
  adapter: netlify(),
  trailingSlash: "ignore",

  build: {
    format: "directory",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    markdoc(),
    ...(process.env.SKIP_KEYSTATIC ? [] : [keystatic()]),
  ],
});

