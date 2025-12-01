import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // URLs de los microservicios según el entorno
  const baseURL = mode === 'production' ? 'http://44.213.57.93' : 'http://localhost';
  
  return {
    plugins: [react()],
    base: "./",
    server: {
      proxy: {
        '/api/v1/auth': `${baseURL}:8082/`,
        '/api/v1/users': `${baseURL}:8082/`, 
        '/api/v1/productos': `${baseURL}:8080/`,
        '/api/v1/categorias': `${baseURL}:8080/`,
        '/api/v1/inventarios': `${baseURL}:8080/`,
        '/api/v1/ventas': `${baseURL}:8083/`,
        '/api/v1/reports': `${baseURL}:8084/`
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
  };
});