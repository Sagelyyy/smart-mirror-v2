<script setup lang="ts">
import { ref } from 'vue'
import PocketBase from 'pocketbase'

const pb = new PocketBase(import.meta.env.VITE_POCKET_BASE_URL)
const selectedFiles = ref<File[]>([])
const uploadStatus = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    selectedFiles.value = Array.from(input.files)
  }
}

const uploadFiles = async () => {
  if (!selectedFiles.value.length) return

  uploadStatus.value = 'Uploading...'

  try {
    for (const file of selectedFiles.value) {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('description', file.name)

      await pb.collection('images').create(formData)
    }

    uploadStatus.value = 'Upload successful!'
    selectedFiles.value = []
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  } catch (error) {
    console.error('Upload error:', error)
    uploadStatus.value = 'Upload failed. Please try again.'
  }
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}
</script>

<template>
  <div class="min-h-screen p-8 flex flex-col items-center justify-center gap-8 bg-black/90">
    <div
      class="flex flex-col items-center bg-black/30 backdrop-blur-md rounded-2xl p-8 gap-6 text-white"
    >
      <h1 class="text-3xl font-semibold">Upload Photos</h1>

      <div class="flex flex-col items-center gap-4">
        <input
          ref="fileInputRef"
          type="file"
          @change="onFileSelected"
          accept="image/*"
          multiple
          class="hidden"
        />

        <button
          @click="triggerFileInput"
          class="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
        >
          Select Photos
        </button>

        <div v-if="selectedFiles.length" class="text-center">
          <p class="text-gray-300">{{ selectedFiles.length }} file(s) selected</p>
        </div>

        <button
          @click="uploadFiles"
          :disabled="!selectedFiles.length"
          class="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl transition-colors duration-200"
        >
          Upload
        </button>

        <div
          v-if="uploadStatus"
          :class="{
            'text-green-400': uploadStatus.includes('successful'),
            'text-red-400': uploadStatus.includes('failed'),
            'text-gray-300': uploadStatus.includes('Uploading'),
          }"
          class="mt-2"
        >
          {{ uploadStatus }}
        </div>
      </div>
    </div>
  </div>
</template>
