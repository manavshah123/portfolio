import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';

// Adds the Umami analytics script to production builds once VITE_UMAMI_WEBSITE_ID is set (see .env.example).
function umami(websiteId, isBuild) {
  return {
    name: 'umami',
    transformIndexHtml() {
      if (!websiteId || !isBuild) return [];
      return [{
        tag: 'script',
        attrs: { defer: true, src: 'https://cloud.umami.is/script.js', 'data-website-id': websiteId },
        injectTo: 'head',
      }];
    },
  };
}

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [react(), umami(env.VITE_UMAMI_WEBSITE_ID, command === 'build')],
    base: './',
    // 5173 is taken by the mail-task-sync Docker container; fail loudly instead of drifting to another port.
    server: { port: 5180, strictPort: true },
    // Lets the prerendered timeline draw ongoing projects up to the build date.
    define: {
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
      // Hides the "Download resume" button until the PDF is actually in public/.
      __HAS_RESUME__: fs.existsSync('public/Manav-Shah-Resume.pdf'),
    },
  };
});
