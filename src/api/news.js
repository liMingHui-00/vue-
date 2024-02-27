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
  return request.get("/news")
}
// 排行榜新闻点击跳转
export const useNewsDetailServer = (newsId) => {
  return request.get(`/news/${newsId}`)
}
// 个人新闻
// 1是点赞   2是收藏   0是都不是
// 点赞新闻
export const useLikeNewsService = () => {
  return request.get("/likenews")
}
// 收藏新闻
export const useFavoriteNewsService = () => {
  return request.get("/favoritenews")
}
// 通过按钮把新闻设置为点赞
export const useLikeNewsButtonServer = (newsid) => {
  return request.post("/setlikenews", { newsid })
}
// 通过按钮把新闻设置为收藏
export const useFavoriteNewsButtonServer = (newsid) => {
  return request.post("/setfavoritenews", { newsid })
}
// 搜索新闻
export const useSearchDataServer = (searchmsg) => {
  return request.get("/search", { params: { searchmsg } })
}
// 热点新闻
export const useHotNewsServer = () => {
  return request.get("/hot")
}
