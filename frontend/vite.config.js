import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // needed for Docker container
    port: 5173,
    strictPort: true,
    allowedHosts: ['abhedya.istenith.com'],
    proxy: {
      // Proxy API requests to your backend
      '/endpoint': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // rewrite: path => path.replace(/^\/endpoint/, '') // Uncomment if you need path rewriting
      }
    }
  }
});
