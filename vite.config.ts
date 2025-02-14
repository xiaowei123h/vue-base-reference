import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "node:path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import SvgComponent from "unplugin-svg-component/vite"

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const { VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd())
  return {
    // 开发或打包时用到的公共基础路径
    base: VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      // 自动生成 SvgIcon 组件和 SVG 雪碧图
      SvgComponent({
        iconDir: [resolve(__dirname, "src/assets/icons")],
        preserveColor: resolve(__dirname, "src/assets/icons/preserve-color"),
        dts: true,
        dtsDir: resolve(__dirname, "types/auto")
      }),
      // 自动按需导入 API
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        dts: "types/auto/auto-imports.d.ts"
      }),
      // 自动按需导入组件
      Components({
        dts: "types/auto/components.d.ts"
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5173,
      // 反向代理
      proxy: {
        '/dev-api': {
          // 服务器地址本地或线上
          target: 'http://localhost:8080',
          // 是否允许跨域
          changeOrigin: true
        }
      }
    }
  }
})
