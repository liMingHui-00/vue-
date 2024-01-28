const NewsOneRoutes = [
  {
    path: "/news/:id", // 动态段以冒号开始
    name: "NewsDetail",
    component: () => import("@/views/news/NewsOne.vue"),
    props: true, // 允许route.params直接设置为组件的props
  },
]

export default NewsOneRoutes
