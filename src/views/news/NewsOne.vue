<template>
  <div class="news-container">
    <header class="news-header">
      <!-- News meta will go here -->
    </header>

    <main class="news-main">
      <!-- 使用条件渲染，只有在 news 数据加载完成后才渲染内容 -->
      <div v-if="news">
        <h3>{{ news.title }}</h3>
        <span>{{ news.time }} {{ news.author }}</span>
        <img :src="news.image" alt="" />
        <p>{{ news.content }}</p>
      </div>
      <div v-else>
        <!-- 可以添加加载中的提示 -->
        <p>Loading...</p>
      </div>
    </main>

    <aside class="news-aside">
      <!-- 排行榜 -->
      <RankList></RankList>
    </aside>
    <footer>
      <!-- 评论 -->
      <Comments :msg="msg"></Comments>
    </footer>
  </div>
</template>

<script setup>
import axios from "axios"
import { useRoute } from "vue-router"
import RankList from "../components/rankList.vue"
import Comments from "../components/comments.vue"
const route = useRoute()
const news = ref(null)
// 评论列表
const msg = ref([])
// 定义异步请求函数
const fetchNewsDetail = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/news/${route.params.id}`
    )
    news.value = response.data
    msg.value = news.value.comment
  } catch (error) {
    console.error("Error fetching news:", error)
    // 在这里处理错误，例如显示错误消息给用户
  }
}

// 使用 onMounted 钩子
onMounted(() => {
  fetchNewsDetail()
})
</script>

<style lang="scss" scoped>
$primary-text: #1f2937;
$secondary-text: #4b5563;
$border-color: #e5e7eb;
$background-light: #f3f4f6;
$background-white: #ffffff;
$highlight-color: #ef4444;

.news-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  max-width: 1200px;
  margin: auto;
}

.news-header {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;

  .meta-item {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: $secondary-text;

    i {
      margin-right: 0.25rem;
    }
  }
}

.news-main {
  background: $background-white;
  padding: 1rem;
  border-radius: 0.375rem;

  .news-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: $primary-text;
  }

  .news-image {
    width: 100%;
    height: auto;
    margin-top: 1rem;
    border-radius: 0.375rem;
  }

  .news-content {
    font-size: 0.875rem;
    color: $primary-text;
    margin-top: 1rem;
  }
}

.news-aside {
  position: sticky;
  top: 4rem;
  background: $background-white;
  padding: 1rem;
  border: 1px solid $border-color;
  border-radius: 0.375rem;
  height: fit-content;

  .aside-title {
    font-size: 1rem;
    font-weight: bold;
    color: $highlight-color;
    margin-bottom: 1rem;
  }

  .aside-item {
    font-size: 0.875rem;
    color: $primary-text;
    margin-bottom: 0.75rem;
  }
}
</style>
