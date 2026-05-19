import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/upload.php': 'http://localhost/Proyecto_menu_digital_burguermax',
    },
  },
})
