import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

const baseSrc = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig(({ command }) => ({
  base: '/',

  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
      dts: 'types/auto-imports.d.ts',
      dirs: ['src/stores', 'src/composables'],
      eslintrc: {
        enabled: true,
        filepath: 'types/.eslintrc-auto-import.json',
      },
    }),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true })],
      dts: 'types/components.d.ts',
      dirs: ['src/components'],
    }),
    Unocss(),
    viteMockServe({
      mockPath: 'mock',
      enable: command === 'serve',
      watchFiles: true,
    }),
  ],

  resolve: {
    alias: {
      '@': baseSrc,
      '~': baseSrc,
    },
  },

  build: {
    chunkSizeWarningLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules'))
            return
          if (id.includes('ant-design-vue') || id.includes('@ant-design'))
            return 'antd'
          return 'vendor'
        },
      },
    },
  },

  server: {
    port: 6678,
  },
}))
