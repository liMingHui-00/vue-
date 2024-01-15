<template>
  <!-- 内容区 -->
  <div>
    <div class="container">
      <div class="left">
        <!-- 左边的一个一个的新闻 -->
        <div v-for="news in Layout_news" :key="news.id" class="news-item">
          <a href="">
            <div class="news-text">
              <!-- 新闻的标题 -->
              <div class="news-text-title">
                {{ news.title }}
              </div>
              <!-- 新闻的来源及时间 -->
              <div class="news-text-other">
                <span>{{ news.type }}</span>
                <span>{{ news.time }}</span>
              </div>
            </div>
            <div class="news-image">
              <!-- 图片，我需要在后端 -->
              <img :src="news.image" alt="">
            </div>
          </a>
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
  display: flex;
  /* 使用Flexbox布局 */
  justify-content: space-between;
  /* 在项目之间添加空间 */
}

.left {
  flex: 0 0 70%;
  border: 1px solid #000;
  /* 左侧部分占据75%的宽度 */
  /* 为了保证内容靠左显示，可以添加对齐样式 */
  text-align: left;
  margin: 10px 20px;
}

.right {
  flex: 0 0 25%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #000;
  /* 右侧部分占据25%的宽度 */
}

.news-item {
  display: flex;
  /* 您可以在这里为每个新闻项添加额外的样式 */
  margin-bottom: 10px;
  justify-content: space-between;
  border: 1px solid #000;
  /* 添加一些底部间距 */
}

.news-item a {
  width: 100%;
  text-decoration: none;
  /* 移除下划线 */
  color: inherit;
  /* 继承父元素的字体颜色 */
  display: block;
  /* 使a标签占据整个.news-item */
  display: flex;
  /* 使a标签也成为flex容器 */
  justify-content: space-between;
  /* 保持内部元素之间的间隔 */
  text-decoration: none;
  color: inherit;
}


.news-text {
  width: 100%;
  flex: 1;
  padding-right: 10px;
}

.news-text-title {
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  word-break: break-all;
  align-items: center;
  color: #222;
  cursor: pointer;
  margin-bottom: 10px;
}

/* 新闻的时间与来源 */
.news-text-other {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 14px;
  line-height: 20px;
  padding-top: 30px;
  color: #999;
}

.news-image img {
  width: 100px;
  /* 图片宽度自适应容器 */
  height: 100px;
  /* 高度自动，保持图片比例 */
}
</style>