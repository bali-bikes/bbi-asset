// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/bbi-asset/', // <--- Ganti dengan nama repo kamu
  plugins: [vue()]
})
