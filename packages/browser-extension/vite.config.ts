import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: "dist",
    assetsDir: ".",
    rollupOptions: {
      input: {
        index: "./index.html",
        background: "./src/background.ts",
        content: "./src/content.ts",
        "browser-polyfill":
          "./node_modules/webextension-polyfill/dist/browser-polyfill.min.js",
      },
      output: {
        entryFileNames: `[name].js`,
      },
    },
    target: "esnext",
  },
});
