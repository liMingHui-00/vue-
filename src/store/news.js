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
    // 用来点赞新闻的
    const newsLikeArr = ref([])
    const thumbsNews = (id) => {
      // 检查是否存在
      if (!newsLikeArr.value.includes(id)) {
        newsLikeArr.value.push(id)
      }
    }
    const deleteNewsLike = (id) => {
      newsLikeArr.value = newsLikeArr.value.filter((item) => item !== id)
    }

    return {
      newsFavoriteArr,
      collectNews,
      deleteNews,
      newsLikeArr,
      thumbsNews,
      deleteNewsLike,
    }
  },
  { persist: true }
)
