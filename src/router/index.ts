import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthView/AuthView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

export default router