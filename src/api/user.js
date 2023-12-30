// 注册
import request from "@/utils/request"
export const userRegisterService = ({ username, email, password }) => {
  return request.post("/register", { username, email, password })
}
// 登录
export const userLoginService = ({ username, password }) => {
  return request.post("/login", { username, password })
}
