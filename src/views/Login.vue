<template>
  <!-- <router-view></router-view> -->
  <div class="container">
    <div class="form-container">
      <div class="form-header">
        <h2 class="form-title" v-if="showRegister">注册</h2>
        <h2 class="form-title" v-else>登录</h2>
      </div>
      <!-- Registration Form -->
      <form v-if="showRegister" @submit.prevent="register" class="form">
        <input v-model="registerForm.username" class="form-input" placeholder="Username">
        <input v-model="registerForm.email" class="form-input" placeholder="Email">
        <input v-model="registerForm.password" class="form-input" placeholder="Password" type="password">
        <button type="submit" class="form-button">注册</button>
        <p class="form-switch">已经有账号？ <button @click="toggleForm" class="form-switch-button">登录</button></p>
      </form>
      <!-- Login Form -->
      <form v-else @submit.prevent="login" class="form">
        <input v-model="loginForm.username" class="form-input" placeholder="Username">
        <input v-model="loginForm.password" class="form-input" placeholder="Password" type="password">
        <button type="submit" class="form-button">登录</button>
        <p class="form-switch">还没有账号？ <button @click="toggleForm" class="form-switch-button">注册</button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { userRegisterService, userLoginService } from '@/api/user'
import { useUserStore } from '@/store/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 创建一个变量记录是否是注册页面
let showRegister = ref(true)
const userStore = useUserStore()
let registerForm = ref({ username: '', email: '', password: '' })
let loginForm = ref({ username: '', password: '' })
async function register() {
  // 开启请求
  await userRegisterService(registerForm.value)
  console.log('注册成功')
  // 注册成功后把user存储在store中
  userStore.setToken(registerForm.value)
}

async function login() {
  await userLoginService(loginForm.value).then(response => {
    localStorage.setItem('token', response.data.token)
    console.log('登录成功')
    // 跳转
    router.push('/')
  })
    .catch(() => console.log('用户名或者密码无效'))
}
function toggleForm() {
  showRegister.value = !showRegister.value
}
</script>
<style scoped>
.container {
  padding: 100px;
  display: flex;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 1rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.form-button {
  width: 100%;
  padding: 0.5rem;
  background-color: #3490dc;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.form-switch {
  text-align: center;
  font-size: 0.875rem;
}

.form-switch-button {
  color: #3490dc;
  text-decoration: underline;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>