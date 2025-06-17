import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        global: 'window', // 👈 Define `global`
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080', // Spring Boot backend
                changeOrigin: true,
                secure: false,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
