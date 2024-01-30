import request from "@/utils/request"
// 首页加载的新闻
export const userLayoutNewsService = () => {
  return request.get("/homenews")
}
// 首页的热搜榜
export const useRankListService = () => {
  return request.get("/ranklist")
}
// 热搜榜的换一换
export const useUpdateListServe = () => {
  return request.get("/updatelist")
}
// 获取新闻的详情
export const useNewsDetails = (id) => {
  return request.get(`/news`, { params: { id } })
}
// 获取推荐页面的新闻
export const useRecommendedNewsServer = () => {
  return request.get("/recommend")
}
// 排行榜新闻点击跳转
export const useNewsDetailServer = (newsId) => {
  return request.get(`/news/${newsId}`)
}
