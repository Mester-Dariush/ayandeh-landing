import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetDownloader = () => {
  return {
    name: 'asset-downloader',
    buildStart() {
      try {
        execSync('node scripts/download-assets.mjs', { stdio: 'inherit' });
      } catch (error) {
        console.error('Failed to download assets.');
      }
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      assetDownloader(),
      react()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});