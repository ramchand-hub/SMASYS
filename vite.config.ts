import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Tailwind is processed via PostCSS (postcss.config.cjs)
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
