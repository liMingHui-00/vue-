import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./router"

import App from "./App.vue"
// 仓库持久化
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
const pinia = createPinia()
const app = createApp(App)
app.use(router)

app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.mount("#app")
