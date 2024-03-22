import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dirs: ["./src/**/*"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      //  可以通过配置来达到自动导入你想要导入的组件
      dirs: [
        "./src/components",
        "./src/views",
        "./src/mock",
        "./src/store",
        "./src/api",
        "./src/views/components",
      ],
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target:
          "https://apis.juhe.cn/simpleWeather/query?city=%E9%83%91%E5%B7%9E&key=26d9a20c025454feb09b4c5e88d03f1c",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
