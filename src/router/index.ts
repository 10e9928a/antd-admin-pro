import { createRouter, createWebHistory } from 'vue-router'
import staticRoutes from './static-routes'

/**
 * 创建路由实例
 */
const router = createRouter({
  routes: staticRoutes,
  history: createWebHistory(import.meta.env.VITE_APP_BASE),
  scrollBehavior: () => ({ top: 0 }),
})

export default router
