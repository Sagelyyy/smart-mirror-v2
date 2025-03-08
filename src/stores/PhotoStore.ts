import { defineStore } from 'pinia'
import { ref } from 'vue'
import PocketBase from 'pocketbase'

const pb = new PocketBase(import.meta.env.VITE_POCKET_BASE_URL)

export const usePhotoStore = defineStore('photo', () => {
  const photo = ref()

  async function fetchRandomPhoto() {
    try {
      const records = await pb.collection('images').getList(1, 50, {
        sort: '-created',
      })

      if (records.items.length === 0) {
        photo.value = null
        return
      }

      const randomIndex = Math.floor(Math.random() * records.items.length)
      const randomPhoto = records.items[randomIndex]

      photo.value = {
        id: randomPhoto.id,
        url: pb.files.getURL(randomPhoto, randomPhoto.image),
        created: randomPhoto.created,
      }
    } catch (error) {
      console.error('Error fetching random photo:', error)
      photo.value = null
    }
  }

  async function rotatePhoto() {
    await fetchRandomPhoto()
  }

  return { photo, fetchRandomPhoto, rotatePhoto }
})
