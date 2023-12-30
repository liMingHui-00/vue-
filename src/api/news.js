import request from "@/utils/request"
// 首页加载的新闻
export const userLayoutNewsService = () => {
  return request.get("/homenews")
}
// 首页的热搜榜
export const useRankListService = () => {
  return request.get("/ranklist")
}
