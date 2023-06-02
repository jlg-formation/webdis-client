import { useWebdisStore } from '@/stores/webdis'
import { createRouter, createWebHashHistory } from 'vue-router'
import ConnectionView from '../views/ConnectionView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
  webdisStore.afterConnectRoute = '/'

  const publicRoutes = ['home', 'legal', 'connection']

  if (typeof to.name === 'string' && publicRoutes.includes(to.name)) {
    return
  }

  await webdisStore.checkConnection()

  if (!webdisStore.isConnected) {
    webdisStore.afterConnectRoute = to.fullPath
    return { name: 'connection' }
  }
})

export default router
