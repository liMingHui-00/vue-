<template>
  <div class="weather-widget">
    <div class="header">
      <span class="location">{{ data.city }}</span>
      <span class="current-temperature">{{ data.realtime.temperature }}°C</span>
      <span class="settings-icon">⚙️</span>
    </div>
    <div class="date">{{ currentTime }}</div>
    <div class="weather-forecast">
      <div class="day-weather">
        <span class="day">今天({{ weekdays.today }})</span>
        <span class="weather-icon">🌙</span>
        <span class="temperature-range">{{ data.future[2].temperature }}</span>
      </div>
      <div class="day-weather">
        <span class="day">明天({{ weekdays.tomorrow }})</span>
        <span class="weather-icon">⛅️</span>
        <span class="temperature-range">{{ data.future[0].temperature }}</span>
      </div>
      <div class="day-weather">
        <span class="day">后天({{ weekdays.dayAfterTomorrow }})</span>
        <span class="weather-icon">🌧️</span>
        <span class="temperature-range">{{ data.future[1].temperature }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
// 当前的时间
const currentTime = new Date().toLocaleDateString('zh', { month: 'long', day: 'numeric' })

function getWeekdayOfTodayTomorrowDayAfter() {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  let today = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  let dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(today.getDate() + 2)

  let todayWeekday = weekdays[today.getDay()]
  let tomorrowWeekday = weekdays[tomorrow.getDay()]
  let dayAfterTomorrowWeekday = weekdays[dayAfterTomorrow.getDay()]

  return {
    today: todayWeekday,
    tomorrow: tomorrowWeekday,
    dayAfterTomorrow: dayAfterTomorrowWeekday
  }
}

const weekdays = getWeekdayOfTodayTomorrowDayAfter()
const data = ref(null)
onMounted(async () => {

  let res = await axios.get("/api")
  data.value = res.data.result
  // console.log(data.data?.result?.city)
})
</script>

<style lang="scss" scoped>
.weather-widget {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-family: 'Open Sans', sans-serif;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;

    .location {
      font-weight: bold;
    }

    .settings-icon {
      cursor: pointer;
    }
  }

  .date {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    text-align: center;
  }

  .weather-forecast {
    .day-weather {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .day {
        font-size: 16px;
      }

      .weather-icon {
        font-size: 24px;
      }

      .temperature-range {
        font-size: 16px;
      }
    }
  }
}
</style>
