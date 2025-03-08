<script setup lang="ts">
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode.vue'

const uploadUrl = ref('http://localhost:5173/upload')

onMounted(() => {
  uploadUrl.value = `http://${window.location.hostname}/upload`
})
</script>

<template>
  <div class="bg-black/30 backdrop-blur-md rounded-2xl p-6 text-white flex flex-col items-center">
    <QRCode :value="uploadUrl" :size="100" level="M" render-as="svg" />
    <p>Scan to upload photos</p>
  </div>
</template>
