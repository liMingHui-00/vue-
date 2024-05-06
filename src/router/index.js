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
      path: "/search",
      component: () => import("@/views/Search.vue"),
    },
    {
      path: "/hot",
      component: () => import("@/views/Hot.vue"),
    },
    {
      path: "/recommend",
      component: () => import("@/views/Recommend.vue"),
    },
    {
      path: "/tiyu",
      component: () => import("@/views/Tiyu.vue"),
    },
  ],
})
router.beforeEach(async (to) => {
  const token = localStorage.getItem("token")
  // 游客可以查看首页内容
  if (to.path === "/" || to.path === "/login") {
    return true
  }
  // 如果没有token，，则拦截页面到登录
  if (!token) {
    return "/login"
  }
  return true
})
export default router
