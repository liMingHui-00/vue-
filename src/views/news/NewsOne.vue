<template>
  <div class="news-container">
    <main class="news-main">
      <!-- 使用条件渲染，只有在 news 数据加载完成后才渲染内容 -->
      <div v-if="news">
        <div class="news-article">
          <h1 class="headline">{{ news.title }}</h1>
          <div class="meta-data">
            <span class="author">{{ news.author }}</span>
            <span class="publish-date">{{ news.time }}</span>
          </div>
          <div class="intro">
            {{ news.content }}
          </div>
          <div class="main-image">
            <!-- Placeholder for main article image -->
            <div class="image-placeholder">
              <img :src="news.image" alt="" />
            </div>
          </div>
          <div class="sidebar">
            <div class="author-info">
              <img :src="news.authorImg" alt="Author" class="author-image" />
              <div class="info">
                <div class="name">{{ news.author }}</div>
                <button class="follow-button" @click="likeAuthor(news.author)" ref="likeauthor">
                  {{ followAuthor }}
                </button>
              </div>
            </div>
            <!-- Placeholder for related articles -->
            <div class="related-articles">
              <!-- Articles would go here -->
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- 可以添加加载中的提示 -->
        <p>Loading...</p>
      </div>
    </main>

    <aside class="news-aside">
      <!--  侧边栏  点赞  评论  收藏 -->
      <sidebar></sidebar>
    </aside>
    <footer>
      <!-- 评论 -->
      <comments :msg="msg"></comments>
    </footer>
  </div>
</template>
<!-- 点击收藏后，把数据存储到数据库，然后调用数据库 -->
<script setup>
import { useRoute } from "vue-router"
import comments from "@/views/components/comments.vue"
import { useNewsDetailServer } from "@/api/news"
const route = useRoute()
const news = ref(null)
const likeauthor = ref(null)
const followAuthor = computed(() => {
  const followedAuthors = JSON.parse(
    localStorage.getItem("followedAuthors") || "[]"
  )
  return followedAuthors.includes(news.value.author) ? "已关注" : "关注"
})
// 评论列表
const msg = ref([])
// 定义异步请求函数
const fetchNewsDetail = async () => {
  const response = await useNewsDetailServer(route.params.id)
  news.value = response.data
  msg.value = news.value.comment
}
// 点击关注
const likeAuthor = (author) => {
  //从 localStorage 获取当前列表
  let followedAuthors = JSON.parse(
    localStorage.getItem("followedAuthors") || "[]"
  )
  if (!followedAuthors.includes(author)) {
    // 如果不在列表中，请将其添加到列表中，并标记为“已关注”
    followedAuthors.push(author)
    localStorage.setItem("followedAuthors", JSON.stringify(followedAuthors))
    ElMessage({ message: "关注成功", type: "success" })
    // Update the button to reflect the new state
    likeauthor.value.innerHTML = "已关注"
  } else {
    // If the author is already in the list, remove them and mark as "关注"
    followedAuthors = followedAuthors.filter((item) => item !== author)
    localStorage.setItem("followedAuthors", JSON.stringify(followedAuthors))
    ElMessage({ message: "取消关注", type: "error" })
    // Update the button to reflect the new state
    likeauthor.value.innerHTML = "关注"
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

.news-main {
  background: $background-white;
  padding: 1rem;
  border-radius: 0.375rem;
}

.news-aside {
  position: sticky;
  top: 4rem;
  background: $background-white;
  padding: 1rem;
  border: 1px solid $border-color;
  border-radius: 0.375rem;
  height: fit-content;
}

.news-article {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: auto;
  font-family: "Open Sans", sans-serif;
  color: #333;

  .headline {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .meta-data {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 20px;

    .author {
      color: #555;
    }

    .publish-date {
      color: #999;
    }
  }

  .intro {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .main-image {
    .image-placeholder {
      width: 100%;
      height: 100%;
      background-color: #eee;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .sidebar {
    margin-top: 30px;

    .author-info {
      display: flex;
      position: absolute;
      top: 385px;
      left: 880px;
      align-items: center;
      margin-bottom: 20px;

      .author-image {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }

      .info {
        .name {
          font-weight: bold;
        }

        .verification {
          font-size: 12px;
        }

        .follow-button {
          background-color: #f00;
          color: #fff;
          border: none;
          padding: 5px 10px;
          margin-top: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
