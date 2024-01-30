<template>
  <div class="content">
    <h3 class="title">
      <span class="titleLeft">
        <i class="iconfont icon-huomiao"></i> 热搜榜
      </span>
      <span class="titleRight" @click="updateHotSearch">
        <i class="iconfont icon-gengxin"></i> 换一换
      </span>
    </h3>
    <div class="container">
      <!-- <div class="rank-item" v-for="(item, index) in rankList" :key="item.id">
        <div class="rank-number" :class="getRankClass(index)">
          {{ index + 1 }}
        </div>
        <div class="rank-content">
          <span class="item-title">
            {{ item.title }}
          </span>
        </div>
      </div> -->
      <router-link
        :to="'/news/' + item.url"
        class="rank-item"
        v-for="(item, index) in rankList"
        :key="item.id"
      >
        <div class="rank-number" :class="getRankClass(index)">
          {{ index + 1 }}
        </div>
        <div class="rank-content">
          <span class="item-title">
            {{ item.title }}
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRankListService, useUpdateListServe } from "@/api/news"

const rankList = ref([])

onMounted(async () => {
  const res = await useRankListService()
  rankList.value = res.data
})
// 点击更新排行榜
const updateHotSearch = async () => {
  const { data } = await useUpdateListServe()
  rankList.value = data
}

const getRankClass = (index) => {
  if (index === 0) {
    return "red-strong"
  } else if (index === 1) {
    return "red-medium"
  } else if (index === 2) {
    return "red-light"
  } else {
    return "" // 其他排名没有特别的样式
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/hotSearchNum.scss"; // Assuming this is an SCSS file now
.content {
  width: 450px;
  .title {
    display: flex;
    justify-content: space-between;

    &Left,
    &Right {
      font-size: larger;
      cursor: pointer;
      .iconfont {
        font-size: larger;
        color: red;
      }
    }
  }

  .rank-item {
    color: #222;
    text-decoration: none;
    display: flex;
    height: 50px;
    align-items: center;

    .rank-number {
      width: 30px;
      text-align: left;
      font-weight: bold;
    }

    .rank-content {
      flex-grow: 1;

      .item-title {
        font-weight: bold;
      }
    }
  }
}
</style>
