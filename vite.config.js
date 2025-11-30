import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      '/api/v1/auth': 'http://localhost:8082/',
      '/api/v1/users': 'http://localhost:8082/', 
      '/api/v1/productos': 'http://localhost:8080/',
      '/api/v1/categorias': 'http://localhost:8080/',
      '/api/v1/inventarios': 'http://localhost:8080/',
      '/api/v1/ventas': 'http://localhost:8081/',
      '/api/v1/reports': 'http://localhost:8083/'
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});