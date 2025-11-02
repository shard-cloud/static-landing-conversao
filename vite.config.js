import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 80,
  },
  preview: {
    port: 80,
    host: "0.0.0.0",
  },
});
