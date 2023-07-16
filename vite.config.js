import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [join(__dirname, '/src/assets/icons/svg')],
      // 指定symbolId格式，就是svg.use使用的href
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  server: {
    port: 8999,
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true // 是否跨域
      }
    }
  }
})
