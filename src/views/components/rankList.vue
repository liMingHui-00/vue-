<template>
  <div>
    <h3>
      热搜榜

    </h3>
    <div v-for="item in rankList" :key="item.id">
      <span>
        {{ item.title }}

      </span>
      <img :src="item.image" alt="">
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

</script>

