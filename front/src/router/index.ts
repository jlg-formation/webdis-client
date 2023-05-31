import { useWebdisStore } from '@/stores/webdis'
import { createRouter, createWebHistory } from 'vue-router'
import ConnectionView from '../views/ConnectionView.vue'
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
      path: '/connection',
      name: 'connection',
      component: ConnectionView,
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

router.beforeEach(async (to) => {
  const webdisStore = useWebdisStore()

  if (typeof to.name === 'string' && ['home', 'legal', 'connection'].includes(to.name)) {
    return
  }

  if (!webdisStore.isConnected) {
    webdisStore.afterConnectRoute = to.fullPath
    return { name: 'connection' }
  }
})

export default router
