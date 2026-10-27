import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/portfolio/', // Replace 'portfolio' if your GitHub repo has a different name
  plugins: [
    react(),
    tailwindcss(),
  ],
})