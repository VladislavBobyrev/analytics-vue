import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView/HomeView.vue'
import store from '@/store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthView/AuthView.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) =>
{
  // узнаем из мета нужна ли регистрация для страницы
  const requireAuth = to.meta.auth

  // если пользователь зарегестрирован то перейдем на следующую страницу
  if (requireAuth && store.getters['auth/isAuthenticated'])
  {
    next()
  }
  // если пользователь не зарегестрирован и прешел по прямой ссылке без регистрации
  // то перейдем на страница регистрации
  else if (requireAuth && !store.getters['auth/isAuthenticated'])
  {
    next('/auth')
  }
  // если в lockalStarage есть ключ то перейдем на следующую страницу
  else
  {
    next()
  }
})
export default router