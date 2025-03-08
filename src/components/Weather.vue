<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useWeatherStore } from '@/stores/WeatherStore'
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  CloudLightning,
  Thermometer,
  MapPin,
} from 'lucide-vue-next'

const weatherStore = useWeatherStore()
let weatherInterval: number

onMounted(() => {
  weatherStore.getWeather()
  weatherInterval = setInterval(() => {
    weatherStore.getWeather()
  }, 5 * 60 * 1000) // 5 minutes in milliseconds
})

onUnmounted(() => {
  if (weatherInterval) {
    clearInterval(weatherInterval)
  }
})

const getWeatherIcon = (weatherCode: string) => {
  const code = weatherCode.toLowerCase()
  if (code.includes('clear')) return Sun
  if (code.includes('rain') || code.includes('drizzle')) return CloudRain
  if (code.includes('snow')) return CloudSnow
  if (code.includes('thunder')) return CloudLightning
  return Cloud
}
</script>

<template>
  <div
    v-if="weatherStore.weatherData"
    class="backdrop-blur-md rounded-2xl p-6 text-white min-w-[250px]"
  >
    <div class="flex items-center gap-2 mb-4 text-lg">
      <MapPin class="w-5 h-5" />
      <span>{{ weatherStore.weatherData.name }}</span>
    </div>

    <div class="flex items-center gap-4 mb-4">
      <component
        :is="getWeatherIcon(weatherStore.weatherData.weather[0].main)"
        class="text-white"
        :size="48"
      />
      <div class="flex flex-col gap-2">
        <span class="text-5xl font-bold leading-none"
          >{{ Math.round(weatherStore.weatherData.main.temp) }}°</span
        >
        <div class="flex items-center gap-2 text-sm opacity-90">
          <Thermometer class="w-4 h-4" />
          <span>Feels like {{ Math.round(weatherStore.weatherData.main.feels_like) }}°</span>
        </div>
      </div>
    </div>

    <p class="capitalize opacity-90 m-0">{{ weatherStore.weatherData.weather[0].description }}</p>
  </div>
</template>
