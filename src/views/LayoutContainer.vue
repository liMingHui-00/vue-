<template>
  <!-- 内容区 -->
  <div>
    <div class="container">
      <div class="left">
        <!-- 左边的一个一个的新闻 -->
        <div v-for="news in Layout_news" :key="news.id" class="news-item">
          <div class="news-text">
            {{ news.title }}
          </div>
          <div class="news-image">
            <!-- <img :src="news.image" alt=""> -->
          </div>

        </div>
      </div>
      <div class="right">
        <!-- 右边的热搜榜 -->
        <ranklist></ranklist>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { userLayoutNewsService } from '@/api/news'
import ranklist from '@/views/components/rankList.vue'
// 存储首页加载的新闻
const Layout_news = ref([])

// 滑动加载
const loadMoreNews = async () => {
  const res = await userLayoutNewsService()
  console.log(res)
  Layout_news.value.push(...res.data)
}

const checkScroll = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrolled = window.scrollY
  if (scrolled >= scrollableHeight - 10) { // 10是距离底部的偏移量，可以根据需要调整
    loadMoreNews()
  }
}

onMounted(async () => {
  await loadMoreNews()
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style  scoped>
.container {
  background-color: aquamarine;
  display: flex;
  /* 启用 flex 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  width: 100%;
  /* 容器宽度为100% */
  max-width: 1200px;
  /* 最大宽度，可根据需求调整 */
  margin: 0 auto;
  /* 水平居中 */
}

.left,
.right {
  border: 1px solid #000;
  flex: 1;
  /* 左右两侧各占一半空间 */
  padding: 20px;
  /* 内边距，可根据需求调整 */
  text-align: center;
  /* 内容居中 */
}
</style>