import { ref } from "vue"
import { defineStore } from "pinia"
export const useNewsStore = defineStore(
  "news",
  () => {
    // 用来收藏新闻
    const newsLikeArr = ref([])
    const collectNews = (id) => {
      // 检查是否已经存在
      if (!newsLikeArr.value.includes(id)) {
        newsLikeArr.value.push(id)
      }
    }
    const deleteNews = (id) => {
      newsLikeArr.value = newsLikeArr.value.filter((item) => item !== id)
    }
    return { newsLikeArr, collectNews, deleteNews }
  },
  { persist: true }
)
