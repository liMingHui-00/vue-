// 随机头像
import Mock from "mockjs"

// 创建一个函数，生成随机头像
export const generateRandomAvatar = () => {
  // 定义图像大小
  const size = "40 x 40"
  // 定义背景颜色和前景颜色，这里使用随机颜色
  const background = Mock.Random.color()
  const foreground = Mock.Random.color()
  // 定义文本，这里使用一个随机字母
  const text = Mock.Random.character("upper")

  // 生成图像
  return Mock.Random.image(size, background, foreground, text)
}
