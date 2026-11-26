import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, statSync } from 'node:fs';

// Installer presenti in public/downloads al momento della build: le schede dei progetti
// mostrano il pulsante di download solo per i file che esistono davvero.
const INSTALLER = /\.(exe|msi|apk)$/i;
function listDownloads() {
  try {
    return readdirSync('public/downloads')
      .filter(f => INSTALLER.test(f))
      .map(f => ({ file: f, size: statSync(`public/downloads/${f}`).size }));
  } catch {
    return [];
  }
}

// Sito utente GitHub Pages (andreagioiaa.github.io) → servito dalla root.
export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    __DOWNLOADS__: JSON.stringify(listDownloads())
  },
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
