import { ref } from "vue"
import { defineStore } from "pinia"
export const useNewsStore = defineStore(
  "news",
  () => {
    // 用来收藏新闻
    const newsFavoriteArr = ref([])
    const collectNews = (id) => {
      // 检查是否已经存在
      if (!newsFavoriteArr.value.includes(id)) {
        newsFavoriteArr.value.push(id)
      }
    }
    const deleteNews = (id) => {
      newsFavoriteArr.value = newsFavoriteArr.value.filter(
        (item) => item !== id
      )
    }
    return { newsFavoriteArr, collectNews, deleteNews }
  },
  { persist: true }
)
