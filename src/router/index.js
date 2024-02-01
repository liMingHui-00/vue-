import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "@/store/user"
import NewsOneRoutes from "@/router/news"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //无#

  routes: [
    {
      path: "/login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/person",
      component: () => import("@/components/personInfo.vue"),
    },
    {
      path: "/",
      component: () => import("@/views/LayoutContainer.vue"),
      children: [...NewsOneRoutes],
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
})
router.beforeEach(async (to) => {
  const token = localStorage.getItem("token")
  // 如果没有token，或者去的页面不是登录页，则拦截页面到登录
  if (!token && to.path !== "/login") {
    return "/login"
  }
  return true
})
export default router
