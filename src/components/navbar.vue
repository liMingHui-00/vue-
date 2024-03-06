<template>
  <div>
    <video src="@/assets/bgvideo.mp4" muted="muted" autoplay="autoplay"></video>
    <!-- 导航条 -->
    <div class="header">
      <div class="box">
        <h1>
          <router-link to="/"> </router-link>
        </h1>
        <nav>
          <router-link to="/">首页</router-link>
          <router-link to="/recommend">推荐</router-link>
          <router-link to="/hot">热点</router-link>
        </nav>
      </div>
      <div class="box">
        <input
          class="text"
          type="text"
          placeholder="请输入关键词~~~"
          v-model="searchMsg"
          name="search"
        />
        <input class="button" type="button" value="搜索" @click="searchData" />
        <nav>
          <div v-if="loginSuccess">
            <el-button @click="$router.push('/login')">登录</el-button>
          </div>
          <div v-else class="my-avatar">
            <!-- 头像 -->
            <img src="@/assets/avatar.png" @click="$router.push('/person')" />
            <span class="my" @click="$router.push('/person')">我的</span>
          </div>
        </nav>
      </div>
      <div class="weather">
        <span class="city_weather"> city </span>
        <span class="weather_main">weather_main day1</span>
        <span class="weather_main">weather_main day2</span>
        <span class="weather_main">weather_main day3</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
// const route = useRoute()
// // 判断是否显示视频背景
// console.log(route.path)
// let show = ref(true)
// watch(
//   () => route.path,
//   (newPath) => {
//     show.value = newPath === "/"
//   },
//   {
//     immediate: true,
//   }
// )
// 搜索框的内容
let searchMsg = ref("")
// 判断是否登录
let loginSuccess = ref(true)
// 获取本地存储的数据，判断是否登录
const judgingLogin = () => {
  const storeToken = localStorage.getItem("token")
  if (storeToken) {
    loginSuccess.value = false
  }
}
//搜索新闻
const searchData = async () => {
  //!                                      老是忘记这个value
  router.push({
    path: "/search",
    query: {
      searchMsg: searchMsg.value,
    },
  })
}
// 天气
let city_weather = ref(null)
import axios from "axios"
onMounted(async () => {
  judgingLogin()
  city_weather = await axios.get("/api")
  console.log(city_weather)
})
</script>

<style scoped>
video {
  width: 100%;
  height: 370px;
  object-fit: cover;
  position: absolute;
  z-index: -9999;
}
.header {
  display: flex;
  align-items: center;
  height: 370px;
  /* background-color: #292c2f; */
  color: rgb(0, 0, 0);
}

.box {
  display: flex;
  align-items: center;
}

h1 {
  display: flex;
  align-items: center;
  font: normal 28px Cookie, Arial, Helvetica, sans-serif;
  padding: 0px 5px;
}

img {
  width: 60px;
  height: 60px;
  cursor: pointer;
}

nav {
  display: flex;
  align-items: center;
  /* margin: 0px 40px; */
  font: 46px Arial, Helvetica, sans-serif;
}

nav a {
  padding: 0 8px;
  width: 150px;
  text-decoration: none;
  /* color: #ffffff; */
  color: rgb(0, 0, 0);

  font-size: 46px;
  font-weight: normal;
  opacity: 0.9;
}

nav a:hover {
  opacity: 1;
}

.active {
  color: #608bd2;
  pointer-events: none;
  opacity: 1;
}

/*搜索框*/

.text {
  height: 62px;
  font-size: 44px;
  border: 1px solid #ccc;
  padding: 3px 16px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
}

.text:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}

.button {
  width: 60px;
  height: 64px;
  font-size: 22px;
  margin-right: 35px;
  border: 1px solid #608bd2;
  background-color: #608bd2;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.contents {
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  width: 1400px;
  height: 1400px;
  /*background-color: #f0f2f3;*/
}
.my-avatar {
  position: relative;
}
.my {
  position: absolute;
  top: 32px;
  right: -70px;
  cursor: pointer;
  font-size: 22px;
  width: 60px;
  height: 64px;
  display: block;
}
.weather {
  display: flex;
  width: 100px;
  position: absolute;
  top: 100;
  left: 1355px;
  height: 200px;
  border: 1px solid #000;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.city_weather {
  border: 1px solid #000;
}
.weather_main {
  border: 1px solid #000;
}
</style>
