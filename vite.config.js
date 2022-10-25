import { defineConfig } from "vite";

export default defineConfig({
  root: 'src',
  base: '/',
  server: {
    port: 3000,
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  }
})