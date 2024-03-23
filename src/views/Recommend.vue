<template>
  <div class="container">
    <!-- 新闻部分 -->
    <div v-if="newsData.length > 0" class="news-section">
      <!-- 替换为实际新闻项目 -->
      <router-link :to="'/news/' + news.url" class="news-item" v-for="news in newsData" :key="news.id">
        <div class="news-details">
          <h2 class="news-title">{{ news.title }}</h2>
          <div class="news-meta">
            {{ generateRandomInter() }}次阅读 | {{ news.time }}
          </div>
        </div>
        <img :src="news.image" :alt="news.title" class="news-image" />
      </router-link>
    </div>
    <p v-else>
      暂无关注者 赶快去关注吧~~~
    </p>

    <!-- 用于登录和排名的边栏 -->
    <div class="sidebar">
      <!-- 排名组 -->
      <div class="rankings">
        <RankList></RankList>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRecommendedNewsServe } from "@/api/news"
import RankList from "./components/rankList.vue"
import { generateRandomInter } from "@/mock/likeNum"
let newsData = ref([])

onMounted(async () => {
  const { data } = await useRecommendedNewsServe()
  console.log(data)
  newsData.value = data
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;

  // Define your container styles here
  .news-section,
  p {
    flex-grow: 1;

    // Define your news section styles here
    .news-item {
      // Define your news item styles here
      text-decoration: none;
      color: #222;
      display: flex;

      .news-image {
        // Define your news image styles here
        width: 300px;
        height: 300px;
      }

      .news-details {
        // Define your news details styles here
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-wrap: wrap;
        position: relative;

        .news-title {
          // Define your news title styles here
          text-align: center;
          width: 100%;
        }

        .news-meta {
          // Define your news meta styles here
          position: absolute;
          top: 250px;
          left: 350px;
        }
      }
    }
  }

  .sidebar {
    // Define your sidebar styles here

    .rankings {
      // Define your rankings section styles here
      // position: fixed;
      flex: 0 0 25%;
      margin: 10px;
      padding: 10px;
      border: 1px solid #000;
      /* 右侧部分占据25%的宽度 */
      // top: 400px;
      // right: 10px;
    }
  }
}

p {
  text-align: center;
  font-size: large;
}
</style>
