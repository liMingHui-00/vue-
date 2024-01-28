import Mock from "mockjs"

// 自定义规则，生成随机中文名字
Mock.Random.extend({
  chineseName: function () {
    const firstNames = [
      "张",
      "王",
      "李",
      "赵",
      "陈",
      "刘",
      "周",
      "吴",
      "黄",
      "徐",
    ]
    const lastNames = [
      "伟",
      "芳",
      "娜",
      "秀英",
      "强",
      "洋",
      "勇",
      "军",
      "磊",
      "婷",
    ]
    const firstName = this.pick(firstNames)
    const lastName = this.pick(lastNames)
    return firstName + lastName
  },
})

// 创建一个函数，每次调用时生成新的随机中文名字
const generateRandomChineseName = () => {
  return Mock.Random.chineseName()
}

export { generateRandomChineseName }
