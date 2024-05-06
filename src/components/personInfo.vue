<template>
  <div class="container">
    <div class="container-top">
      <div class="profile">
        <img class="profile-image" src="http://localhost:5173/src/assets/avatar.png" alt="Profile image placeholder" />
        <div class="user-info">
          <h2 class="username">用户名:{{ olderInfo.username }}</h2>
          <h2 class="email">邮箱:{{ olderInfo.email }}</h2>
          <p class="user-description" @click="updateInfo">修改个人信息</p>
          <i class="iconfont icon-xiaohu" @click="quit">退出登录</i>
        </div>
      </div>
    </div>
    <!-- <div class="navigation">收藏 点赞</div> -->
    <div class="navigation">
      <div class="nav-item" @click="toggleFavorite" :class="{ active: isFavorite }">
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
    <div class="likenews" v-if="isFavorite">
      <div v-for="news in favoriteNews" :key="news.id" class="news-item">
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
    <el-dialog v-model="dialogFormVisible" title="修改个人信息" width="500">
      <el-form>
        <el-form-item label="新用户名" :label-width="formLabelWidth">
          <el-input v-model="username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新邮箱" :label-width="formLabelWidth">
          <el-input v-model="email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confrimUpdate">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useLikeNewsService } from "@/api/news"
import { useRouter } from 'vue-router'
import { useFavoriteNewsService } from "@/api/news"
import { ref, onMounted } from "vue"
import { useUserInfoService, useUpdateInfoService } from '@/api/user'
let isFavorite = ref(false)
let isLike = ref(false)
// 点赞新闻列表
let likeNews = ref([])
// 收藏新闻列表
let favoriteNews = ref([])
// 点击改变颜色  改变内容
const toggleFavorite = async () => {
  // 展示收藏
  // 改变颜色
  isFavorite.value = true
  isLike.value = false
  const {
    data: { data },
  } = await useFavoriteNewsService()
  favoriteNews.value = data
  console.log(favoriteNews.value)
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
const router = useRouter()
// 退出登录
const quit = () => {
  if (confirm('确认要退出吗？')) {
    // 移除存储在localStorage中的token
    localStorage.removeItem('token')
    // 跳转到登录页面
    router.push('/login')
  }

}
const olderInfo = ref({ username: null, email: null, oldusername: null })

const formLabelWidth = '140px'

// 加载个人信息
const getInfo = async () => {
  const { data: { data } } = await useUserInfoService()
  olderInfo.value.oldusername = data[0].username
  olderInfo.value.username = data[0].username
  olderInfo.value.email = data[0].email
}
onMounted(() => {

  getInfo()
})
// 修改框
const dialogFormVisible = ref(false)
// 新的个人信息
const username = ref(null)
const email = ref(null)
// 修改个人信息
const updateInfo = () => {
  dialogFormVisible.value = true
}
const confrimUpdate = async () => {
  const data = {
    username: username.value,
    email: email.value,
    oldusername: olderInfo.value.oldusername
  }
  await useUpdateInfoService(data)
  // 关闭修改框
  dialogFormVisible.value = false
  getInfo()
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
  width: 80px;
  height: 80px;
}

.container .container-top .profile .user-info .username,
.email {
  font-size: 1.25rem;
  font-weight: 500;
}

.container .container-top .profile .user-info .user-description {
  color: #6b7280;
  cursor: pointer;
}

.container .container-top .profile .user-info .iconfont {
  font-size: larger;
  position: absolute;
  top: 435px;
  left: 1065px;
  cursor: pointer;
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
