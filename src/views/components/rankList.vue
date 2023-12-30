<template>
  <div>
    热搜榜
  </div>
</template>

<script setup>
import { useRankListService } from '@/api/news'
import { onMounted } from 'vue'
onMounted(async () => {
  const res = await useRankListService()
  console.log(res)
})

</script>

