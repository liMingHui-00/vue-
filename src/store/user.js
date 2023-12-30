import { ref } from "vue"
import { defineStore } from "pinia"
export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref("")
    const setToken = (nowToken) => {
      token.value = nowToken
    }
    return { token, setToken }
  },
  { persist: true }
)
