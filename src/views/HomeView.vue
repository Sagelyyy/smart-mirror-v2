<script setup lang="ts">
import Weather from '../components/Weather.vue'
import Greeting from '../components/Greeting.vue'
import Time from '../components/Time.vue'
import Photo from '../components/Photo.vue'
import QrCode from '../components/QrCode.vue'
</script>

<template>
  <div class="absolute top-0 left-0">
    <QrCode />
  </div>
  <div class="min-h-screen p-8 flex flex-col items-center justify-center gap-8 bg-black/90">
    <Greeting />
    <div
      class="flex items-center bg-black/30 justify-center backdrop-blur-md rounded-2xl p-6 gap-8"
    >
      <Weather />
      <Time />
    </div>
    <Photo />
  </div>
</template>
