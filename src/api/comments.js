import request from "@/utils/request"
// 所有的评论
export const useGetCommentsService = () => {
  return request.get("/getcomments")
}
// 提交评论
export const useAddcommentService = ({ commentData }) => {
  return request.post("/addcomment", { text: commentData.text })
}
// 赞评论
export const useThumbcountService = ({ comment }) => {
  return request.post("/thumbcount", { commentId: comment.comment_id })
}
