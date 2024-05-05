// 注册
import request from "@/utils/request"
export const userRegisterService = ({ username, email, password }) => {
  return request.post("/register", { username, email, password })
}
// 登录
export const userLoginService = ({ username, password }) => {
  return request.post("/login", { username, password })
}
// 获取用户信息
export const useUserInfoService = () => {
  return request.get("/getuserinfo")
}
// 修改用户信息
export const useUpdateInfoService = (data) => {
  return request.post("/updateuserinfo", data)
}
