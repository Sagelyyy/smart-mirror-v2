import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WeatherResponse } from '../types/WeatherResponse'

export const useWeatherStore = defineStore('weather', () => {
  const weatherData = ref<WeatherResponse>()

  const getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=42.7654&lon=-71.4676&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=imperial`,
    )
    weatherData.value = await response.json()
  }

  return { weatherData, getWeather }
})
