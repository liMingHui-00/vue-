<template>
  <!-- <comments></comments> -->
  <navbar></navbar>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue"
import axios from "axios"
onMounted(async () => {
  const res = await axios.get("/api")
  console.log(res.data)
})
</script>
