<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Temporal } from 'temporal-polyfill'
import { Heart } from 'lucide-vue-next'

const pastDate = Temporal.PlainDateTime.from('2016-01-15T17:00:00')
const now = ref(Temporal.Now.plainDateTimeISO())

function pluralize(value: number, singular: string, plural: string) {
  return `${value} ${value === 1 ? singular : plural}`
}

const formattedDuration = computed(() => {
  const duration = pastDate.until(now.value, { largestUnit: 'years' })
  return [
    pluralize(duration.years, 'year', 'years'),
    pluralize(duration.months, 'month', 'months'),
    pluralize(duration.days, 'day', 'days'),
    pluralize(duration.hours, 'hour', 'hours'),
    pluralize(duration.minutes, 'minute', 'minutes'),
    pluralize(duration.seconds, 'second', 'seconds'),
  ].join(', ')
})

const timeOfDay = computed(() => {
  const hour = now.value.hour
  if (hour >= 5 && hour < 12) return 'Morning'
  if (hour >= 12 && hour < 17) return 'Afternoon'
  if (hour >= 17 && hour < 21) return 'Evening'
  return 'Evening'
})

function updateTime() {
  setInterval(() => {
    now.value = Temporal.Now.plainDateTimeISO()
  }, 1000)
}

onMounted(() => {
  updateTime()
})
</script>

<template>
  <div class="bg-black/30 backdrop-blur-md rounded-2xl p-6 min-w-[250px] text-center relative">
    <h1 class="text-4xl font-bold text-white mb-4">Good {{ timeOfDay }} Babe!</h1>
    <div class="text-gray-300">
      <p class="text-lg mb-2">We have been together for</p>
      <div class="flex flex-col items-center gap-2">
        <div
          class="grid absolute top-1/2 left-1/8 opacity-20 scale-300 transform -translate-x-1/2 -translate-y-1/2"
        >
          <Heart class="animate-pulse row-[1] col-[1]" :size="48" color="pink" />
          <Heart
            :size="48"
            class="row-[1] col-[1] inline-flex animate-ping rounded-full opacity-75"
          />
          <Heart
            :size="48"
            class="row-[1] col-[1] inline-flex animate-ping rounded-full opacity-50"
            color="red"
          />
        </div>

        <p class="text-2xl font-medium text-pink-300">{{ formattedDuration }}</p>
      </div>
    </div>
  </div>
</template>
