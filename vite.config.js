import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Sito utente GitHub Pages (andreagioiaa.github.io) → servito dalla root.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'motion';
          if (id.includes('node_modules/react')) return 'react';
        }
      }
    }
  }
});
