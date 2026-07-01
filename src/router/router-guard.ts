import type { RouteLocationNormalized } from 'vue-router'
import { useAuthorization } from '@/composables/authorization'
import { ROUTES } from '@/config'
import router from '@/router'

const WHITE_LIST = [ROUTES.LOGIN]

/**
 * 路由前置守卫：登录鉴权
 * vue-router 4+ 推荐通过返回值控制导航（返回 true/undefined 放行，返回路由对象跳转）
 */
router.beforeEach(async (to) => {
  const token = useAuthorization()

  // 已登录：访问登录页则跳转首页，其余放行
  if (token.value)
    return to.path === ROUTES.LOGIN ? { path: ROUTES.HOME } : true

  // 未登录：白名单放行，其余跳转登录页并携带重定向地址
  if (WHITE_LIST.includes(to.path as typeof WHITE_LIST[number]))
    return true

  return { path: ROUTES.LOGIN, query: { redirect: to.fullPath } }
})

/**
 * 路由后置守卫：设置页面标题
 */
router.afterEach((to: RouteLocationNormalized) => {
  const title = to.meta?.title as string
  if (title)
    document.title = title
})
