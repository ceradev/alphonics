import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
<<<<<<< HEAD
=======
  vite: {
    logLevel: "info",
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },

  pages: {
    "/": {
      component: () => import("./src/pages/index.astro"),
    },
    "/welcome": {
      component: () => import("./src/pages/welcome.astro"),
    },
    "/about": {
      component: () => import("./src/pages/about.astro"),
    },
  },
>>>>>>> 77fa5c57e6574c300eea20befee0e2d73851d697
  integrations: [
    react(),
    tailwind(),

    AstroPWA({
      mode: "development",
      base: "/welcome",
      scope: "/",
      includeAssets: ["favicon.svg"],
      registerType: "autoUpdate",
      manifest: {
        name: "Alphonics",
        short_name: "Alphonics",
        theme_color: "#b81414",
        display: "standalone",
        background_color: "#666666",
        description:
          "Alphonics es más que una aplicación de música; es tu espacio personal para explorar, descubrir y crear sonidos únicos.",
        icons: [
          {
<<<<<<< HEAD
            src: "/icon-192x192.png",
=======
            src: "/android-chrome-192x192.png",
>>>>>>> 77fa5c57e6574c300eea20befee0e2d73851d697
            sizes: "192x192",
            type: "image/png",
          },
          {
<<<<<<< HEAD
            src: "/icon-512x512.png",
=======
            src: "/android-chrome-512x512.png",
>>>>>>> 77fa5c57e6574c300eea20befee0e2d73851d697
            sizes: "512x512",
            type: "image/png",
          },
          {
<<<<<<< HEAD
            src: "/icon-512x512.png",
=======
            src: "/android-chrome-512x512.png",
>>>>>>> 77fa5c57e6574c300eea20befee0e2d73851d697
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
});
