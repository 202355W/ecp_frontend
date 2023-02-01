import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import addjob from '../views/addjob.vue'
import reviewjob from '../views/reviewjob.vue'
import successjob from '../views/successjob.vue'

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
    path:'/addjob',
    component: addjob,
  },
  {
    path:'/reviewjob',
    component: reviewjob,
  },
  {
    path:'/successjob',
    component: successjob,
  }
]

// https://vitejs.dev/guide/env-and-mode.html
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
