<template>
  <div>
    <!-- 侧边栏 -->
    <div class="social-stats">
      <div class="stat">
        <div class="icon thumbs-up">
          <!-- 点赞 -->
          <i
            class="iconfont icon-dianzan"
            @click.once="changeColor()"
            ref="dianzanEle"
          ></i>
        </div>
        <div class="number">{{ likeCount }}</div>
      </div>
      <div class="stat">
        <div class="icon user">
          <!-- 评论 -->
          <i class="iconfont icon-duihua" @click="moveCommentSection()"></i>
        </div>
        <div class="number">{{ commentCount }}</div>
      </div>
      <div class="stat">
        <div class="icon star">
          <!-- 收藏 -->
          <i
            class="iconfont icon-xingxing"
            ref="shoucang"
            @click="collectNew"
          ></i>
        </div>
        <div class="like">收藏</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router"
const route = useRoute()
import { useNewsStore } from "@/store/news"
const newsStore = useNewsStore()
// 点赞数
import { generateRandomInter } from "@/mock/likeNum"
let likeCount = ref(generateRandomInter())
// 评论数
let commentCount = ref(generateRandomInter())
const dianzanEle = ref(null)
const shoucang = ref(null)
// 点击改变颜色
function changeColor() {
  dianzanEle.value.style.color = "red"
  dianzanEle.value.style.fontSize = "30px"
  likeCount.value++
}
// 点击达到批评区
function moveCommentSection() {
  // 获取当前滚动条的位置
  const currentScrollY = window.scrollY
  // 计算滚动后的位置
  const scrollTo = currentScrollY + 500
  // 使用滚动动画滚动到新的位置
  window.scrollTo({
    top: scrollTo,
    behavior: "smooth",
  })
}
// 收藏新闻
function collectNew() {
  if (shoucang.value.style.color === "red") {
    shoucang.value.style.color = "#222"
    newsStore.deleteNews(route.params.id)
    console.log("删除", newsStore.newsFavoriteArr)
  } else {
    shoucang.value.style.color = "red"
    // 把它收藏到store中
    newsStore.collectNews(route.params.id)
    console.log("收藏", newsStore.newsFavoriteArr)
  }
}
</script>

<style lang="scss" scoped>
.social-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  .stat {
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    .icon {
      margin-bottom: 8px;
      &.thumbs-up {
        color: #222;
        cursor: pointer;
      }
      &.user {
        color: #222;
        cursor: pointer;
      }
      &.star {
        color: #222;
        cursor: pointer;
      }
      i {
        font-size: 24px;
      }
    }
    .number {
      font-size: 20px;
      color: #333333;
    }
  }
}
</style>
