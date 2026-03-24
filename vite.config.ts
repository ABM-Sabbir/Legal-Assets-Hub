import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: '/legal-assets-hub/', 
    
    plugins: [
      react(), 
      tailwindcss()
    ],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      port: 3000,
      open: true,
    },

    build: {
      target: 'esnext',
      minify: isProduction ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'], 
          },
        },
      },
    },
  };
});
