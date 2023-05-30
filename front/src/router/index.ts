import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/legal',
      name: 'legal',
      component: () => import('../views/LegalView.vue'),
    },
    {
      path: '/stream',
      name: 'stream',
      component: () => import('../views/StreamView.vue'),
    },
    {
      path: '/hyperloglog',
      name: 'hyperloglog',
      component: () => import('../views/HyperLogLogView.vue'),
    },
  ],
})

export default router
