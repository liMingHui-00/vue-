import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "@/store/user"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //无#

  routes: [
    {
      path: "/login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/",
      component: () => import("@/views/LayoutContainer.vue"),
      children: [],
    },

    {
      path: "/hot",
      component: () => import("@/views/Hot.vue"),
    },
    {
      path: "/recommend",
      component: () => import("@/views/Recommend.vue"),
    },
  ],
}) // 登录拦截
router.beforeEach(async (to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== "/login") {
    console.log(userStore.token)
    return "/login"
  }
  return true
})

export default router
