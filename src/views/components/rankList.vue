<template>
  <div>
    <h3 class="title">
      <span class="titleLeft"><i class="iconfont  icon-huomiao"></i> 热搜榜</span>
      <span class="titleRight" @click="updataHotSearch"><i class="iconfont  icon-gengxin"></i> 换一换</span>
    </h3>
    <div class="container" v-for="(item, index) in rankList" :key="item.id">
      <!-- 热搜的每一项 -->
      <div class="rank-item">
        <div class="rank-number" :class="getRankClass(index)">
          {{ index + 1 }}
        </div>

        <!-- 内容 -->
        <div class="rank-content">
          <!--todo 点击跳转 -->
          <span class="title">
            {{ item.title }}
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRankListService } from '@/api/news'

import { onMounted, ref } from 'vue'
const rankList = ref([])

onMounted(async () => {
  const res = await useRankListService()
  rankList.value = res.data
})
// 点击换一换更新热搜
const updataHotSearch = () => {
  console.log('更新热搜')
}
// 前三个的颜色不同
const getRankClass = (index) => {
  if (index === 0) {
    return 'red-strong'
  } else if (index === 1) {
    return 'red-medium'
  } else if (index === 2) {
    return 'red-light'
  } else {
    return '' // 其他排名没有特别的样式
  }
}
</script>
<style scoped>
@import url('@/assets/hotSearchNum.css');

.title {
  display: flex;
  justify-content: space-between;
}

.titleLeft {
  font-size: larger;
}

.iconfont {
  font-size: larger;
  color: red;
}

.titleRight {
  font-size: larger;
}

.rank-item {
  border: 1px solid #000;
  display: flex;
  height: 50px;
  align-items: center;
}

/* 排名数字的样式 */
.rank-number {
  width: 30px;
  text-align: left;
  font-weight: bold;
}

/* 内容 */
.rank-content {
  flex-grow: 1;
}

/* 标题 */
.title {
  font-weight: bold;
}
</style>

