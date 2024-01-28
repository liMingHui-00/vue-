import Mock from "mockjs"

// 自定义函数，生成在指定日期范围内的随机日期
const generateLimitedTimeData = () => {
  // 构建日期范围
  const startDate = new Date("2023-12-31").getTime()
  const endDate = new Date("2024-02-14").getTime()

  // 生成一个介于startDate和endDate之间的随机时间戳
  const randomTime = Mock.Random.integer(startDate, endDate)
  const randomDate = new Date(randomTime)

  // 格式化生成的日期
  const year = randomDate.getFullYear()
  const month = randomDate.getMonth() + 1
  const day = randomDate.getDate()
  const hour = randomDate.getHours()
  const minute = randomDate.getMinutes()
  const second = randomDate.getSeconds()

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`

  return formattedDate
}
export default generateLimitedTimeData
