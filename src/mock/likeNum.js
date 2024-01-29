import Mock from "mockjs"
// 生成点赞数
export const generateRandomInter = () => {
  return Mock.Random.integer(1, 100)
}
