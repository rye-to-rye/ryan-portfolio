import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static SPA build -> dist/ (deployable to any static host, e.g. Vercel)
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
