import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/react':{ ///react가 들어오면
        target: 'http://localhost:8080', //~8080으로 받겠다
        changeOrigin: true,
        rewrite: path => path.replace(/^\/react/,'')
      }
    }
  }
})
