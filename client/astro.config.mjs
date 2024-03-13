import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";

export default defineConfig({
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

            src: "/icon-192x192.png",

            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",

            src: "/android-chrome-512x512.png",
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
