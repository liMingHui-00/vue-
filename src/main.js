import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./router"

import App from "./App.vue"
// 仓库持久化
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
const pinia = createPinia()
const app = createApp(App)
app.use(router)
import mockData from "./mock/data" // 修改路径为您的实际路径
import Mock from "mockjs"
// 使用 Mock.js 拦截请求
Mock.mock("/api/currentTime", "get", {
  currentTime: mockData.currentTime,
})
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.mount("#app")
