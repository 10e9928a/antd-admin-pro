import type { RouteLocationNormalized } from 'vue-router'
import router from '@/router'

/**
 * 路由前置守卫
 */
router.beforeEach(async (_to, _from, next) => {
  // 可扩展权限验证等逻辑
  next()
})

/**
 * 路由后置守卫
 */
router.afterEach((to: RouteLocationNormalized) => {
  // 设置页面标题
  const title = to.meta?.title as string
  if (title)
    document.title = title
})
