// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// Pages kept out of search: they also carry a robots noindex tag.
// Keep this list in sync with `noindex` props (see src/components/seo/SEO.astro).
const NOINDEX_PATHS = ["/guide/", "/hero-drafts/", "/plant-finder/"];

// https://astro.build/config
export default defineConfig({
  site: "https://sherwoodnurseries.ca",

  // Nunito is downloaded at build time and served from this site (no
  // Google Fonts request chain). <Font> in Layout.astro preloads it.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Nunito",
      cssVariable: "--font-nunito",
      weights: ["400 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-rounded", "system-ui", "sans-serif"],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((path) => new URL(page).pathname === path),
    }),
  ],
});
