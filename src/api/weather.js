import request from "@/utils/request"
export const useWeatherServer = () => {
  return request.get(
    "http://apis.juhe.cn/simpleWeather/query?city=郑州&key=26d9a20c025454feb09b4c5e88d03f1c"
  )
}
