import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚡️ Cambia "Delivery_TiempoReal_V2" por el nombre EXACTO de tu repo en GitHub
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES
    ? "/Delivery_TiempoReal_V2/"
    : "/",
})
