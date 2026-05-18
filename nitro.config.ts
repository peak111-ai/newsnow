import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  preset: 'cloudflare-pages',
  srcDir: 'server',
  compatibilityDate: '2024-11-28',
  output: {
    dir: 'dist/output',
    publicDir: 'dist/output/public'
  },
  serverDir: 'dist/output/server',
  cloudflare: {
    pagesFunctionRoutes: true
  }
})
