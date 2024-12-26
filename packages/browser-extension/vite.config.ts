import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    outDir: "dist",
    assetsDir: ".",
    rollupOptions: {
      input: {
        index: "./index.html",
        background: "./src/background.ts",
        content: "./src/content.ts",
      },
      output: {
        entryFileNames: `[name].js`,
      },
    },
  },
});
