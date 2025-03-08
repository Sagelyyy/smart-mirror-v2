<script setup lang="ts">
import { usePhotoStore } from '@/stores/PhotoStore'
import { onMounted, onUnmounted, ref } from 'vue'

const photoStore = usePhotoStore()
let rotationInterval: number | null = null
const isTransitioning = ref(false)

const handlePhotoRotation = async () => {
  isTransitioning.value = true
  await photoStore.rotatePhoto()
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

onMounted(async () => {
  await photoStore.fetchRandomPhoto()
  rotationInterval = setInterval(handlePhotoRotation, 30000)
})

onUnmounted(() => {
  if (rotationInterval) clearInterval(rotationInterval)
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <Transition
      enter-active-class="transition-opacity duration-500 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-500 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="photoStore.photo && !isTransitioning" class="relative w-full h-full">
        <img
          :src="photoStore.photo.url"
          alt="Smart mirror photo"
          class="w-full h-full object-contain rounded-2xl"
          :class="{ 'opacity-0': isTransitioning }"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl pointer-events-none"
        ></div>
      </div>
      <div
        v-else-if="!photoStore.photo"
        class="flex items-center justify-center h-full text-gray-400 text-lg bg-black/30 backdrop-blur-md rounded-2xl p-8"
      >
        No photos available
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
