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
        content: "./src/content/index.ts",
      },
      output: {
        entryFileNames: `[name].js`,
      },
    },
    target: "esnext",
  },
});
