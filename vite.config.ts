import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@font', replacement: resolve(__dirname, 'src/assets/fonts') },
      {
        find: '@service',
        replacement: resolve(__dirname, 'src/app/services'),
      },
      { find: '@style', replacement: resolve(__dirname, 'src/assets/styles') },
    ],
  },
})
