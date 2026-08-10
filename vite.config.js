import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'images/*.jpeg', 'images/*.png'],
      manifest: {
        name: 'Anniis Cuisine',
        short_name: 'Anniis',
        description: 'Cameroonian dishes, soul food and seafood, cooked with the flavors of love and memory.',
        theme_color: '#1b110d',
        background_color: '#1b110d',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
