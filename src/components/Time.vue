<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Temporal } from 'temporal-polyfill'

const now = ref(Temporal.Now.plainDateTimeISO())

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return `${day}th`
  const lastDigit = day % 10
  if (lastDigit === 1) return `${day}st`
  if (lastDigit === 2) return `${day}nd`
  if (lastDigit === 3) return `${day}rd`
  return `${day}th`
}

const formattedDate = computed(() => {
  const day = getOrdinalSuffix(now.value.day)
  return (
    `${now.value.toLocaleString('en-US', { weekday: 'long' })}, ` +
    `${now.value.toLocaleString('en-US', { month: 'long' })} ${day} at ` +
    now.value.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  )
})

function updateTime() {
  setInterval(() => {
    now.value = Temporal.Now.plainDateTimeISO()
  }, 60000)
}

onMounted(() => {
  updateTime()
})
</script>

<template>
  <div class="backdrop-blur-md rounded-2xl p-6 min-w-[250px]">
    <p class="text-3xl font-medium text-gray-300 tracking-wide">{{ formattedDate }}</p>
  </div>
</template>
