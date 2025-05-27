import { build } from 'vite'

// https://vitejs.dev/guide/api-javascript.html#build
await build({
  configFile: './vite.config.mjs',
  root: process.cwd(),
  build: {
    ssr: false,
    outDir: 'dist',
    emptyOutDir: true
  }
}) 