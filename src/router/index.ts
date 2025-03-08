import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UploadView from '../views/UploadView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/upload',
    name: 'Upload',
    component: UploadView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
