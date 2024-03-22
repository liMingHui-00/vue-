<template>
  <navbar v-if="$route.path !== '/login'"></navbar>
  <router-view></router-view>
</template>

<script setup></script>
