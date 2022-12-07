import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Listings from '../views/Listings.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    // meta: { transition: 'slide-left' },
  },
  {
    path: '/listings',
    component: Listings,
    // meta: { transition: 'slide-left' },
  }
]

// https://vitejs.dev/guide/env-and-mode.html
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  
  routes,
})

export default router
