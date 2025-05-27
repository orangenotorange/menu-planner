import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Use esbuild for minification instead of terser
    minify: 'esbuild',
    // Configure the client build
    rollupOptions: {
      input: './index.html'
    }
  },
  resolve: {
    alias: {
      // Map Node.js built-in modules to their node: prefixed versions
      assert: 'node:assert',
      buffer: 'node:buffer',
      events: 'node:events',
      fs: 'node:fs',
      module: 'node:module',
      path: 'node:path',
      process: 'node:process',
      stream: 'node:stream',
      util: 'node:util'
    }
  }
}) 