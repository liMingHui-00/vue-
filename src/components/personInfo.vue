<template>
  <div class="container">
    <div class="container-top">
      <div class="profile">
        <img
          class="profile-image"
          src="https://placehold.co/64"
          alt="Profile image placeholder"
        />
        <div class="user-info">
          <h2 class="username">用户名</h2>
          <p class="user-description">用户简介或其他信息</p>
        </div>
      </div>
    </div>
    <!-- <div class="navigation">收藏 点赞</div> -->
    <div class="navigation">
      <div
        class="nav-item"
        @click="toggleFavorite"
        :class="{ active: isFavorite }"
      >
        收藏
      </div>
      <div class="nav-item" @click="toggleLike" :class="{ active: isLike }">
        点赞
      </div>
    </div>
    <!-- 点赞 -->
    <div class="likenews" v-if="isLike">
      <div v-for="news in likeNews" :key="news.id" class="news-item">
        <router-link :to="'/news/' + news.url">
          <div class="news-text">
            <div class="news-text-title">
              {{ news.title }}
            </div>
            <div class="news-text-other">
              <span>{{ news.type }}</span>
              <span>{{ news.time }}</span>
              <span>{{ news.comment }}评论</span>
            </div>
          </div>
          <div class="news-image">
            <img :src="news.image" alt="" />
          </div>
        </router-link>
      </div>
    </div>
    <!-- 收藏 -->
  </div>
</template>

<script setup>
import { useLikeNewsService } from "@/api/news"
let isFavorite = ref(false)
let isLike = ref(false)
// 点赞新闻列表
let likeNews = ref([])
// 点击改变颜色  改变内容
const toggleFavorite = () => {
  // 展示收藏
  // 改变颜色
  isFavorite.value = true
  isLike.value = false
}
const toggleLike = async () => {
  // 展示点赞
  // 改变颜色
  isFavorite.value = false
  isLike.value = true
  const {
    data: { data },
  } = await useLikeNewsService()
  likeNews.value = data
  console.log(likeNews.value)
}
</script>

<style scoped>
.container {
  border: 1px solid #000;
  max-width: 900px;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.container .container-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container .container-top .profile {
  display: flex;
  align-items: center;
}
.container .container-top .profile .profile-image {
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  margin-right: 1rem;
}
.container .container-top .profile .user-info .username {
  font-size: 1.25rem;
  font-weight: 600;
}
.container .container-top .profile .user-info .user-description {
  color: #6b7280;
}
.container .navigation {
  display: flex;
  justify-content: space-around;
}
.container .navigation .nav-item {
  font-size: 16px;
  font-weight: 400;
  color: #909090;
  cursor: pointer;
}
.container .navigation .nav-item.active {
  color: #000;
}
.container .navigation .nav-item:hover {
  color: aqua;
}

.news-item {
  display: flex;
  /* 您可以在这里为每个新闻项添加额外的样式 */
  margin-bottom: 10px;
  justify-content: space-between;
  border: 1px solid #000;
  border-radius: 10px;
  /* 添加一些底部间距 */
}

.news-item a {
  width: 100%;
  text-decoration: none;
  /* 移除下划线 */
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
