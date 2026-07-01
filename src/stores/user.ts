import type { RouteRecordRaw } from 'vue-router'
import type { MenuData } from '@/layouts/basic-layout/typing'
import { message } from 'ant-design-vue/es'
import { apiGetUserInfo, apiLogin, apiLogout, apiMobileLogin, apiSendCode } from '@/api'
import { useAuthorization } from '@/composables/authorization'
import { STORAGE_KEYS } from '@/config'
import router from '@/router'
import { storage } from '@/utils'

// 类型定义
interface UserInfo {
  id: string
  avatar: string
  nickname: string
  email: string
  roles: string[]
}

interface LoginResult {
  success: boolean
  data?: any
  message?: string
}

export const useUserStore = defineStore('user', () => {
  // 状态
  const menuData = shallowRef<MenuData>([])
  const userInfo = reactive<UserInfo>({
    id: '',
    avatar: '',
    nickname: '',
    email: '',
    roles: [],
  })

  // 计算属性
  const avatar = computed(() => userInfo.avatar)
  const nickname = computed(() => userInfo.nickname)
  const isLoggedIn = computed(() => !!userInfo.id)

  // 通用登录处理函数
  const handleLoginResponse = async (response: any): Promise<LoginResult> => {
    if (response.code === 200) {
      const { token, userInfo: responseUserInfo } = response.data

      if (token) {
        const authorization = useAuthorization()
        authorization.value = token
      }

      if (responseUserInfo) {
        Object.assign(userInfo, responseUserInfo)
        storage.set(STORAGE_KEYS.USER, responseUserInfo)
      }

      message.success('登录成功')
      return { success: true, data: response.data }
    }

    const errorMsg = response.msg || '登录失败'
    message.error(errorMsg)
    return { success: false, message: errorMsg }
  }

  // 通用错误处理
  const handleError = (error: any, defaultMsg: string): LoginResult => {
    const errorMsg = error?.response?.data?.msg || defaultMsg
    message.error(errorMsg)
    return { success: false, message: errorMsg }
  }

  // 账号密码登录
  const login = async (loginData: { username: string, password: string }): Promise<LoginResult> => {
    try {
      const response = await apiLogin(loginData)
      return handleLoginResponse(response)
    }
    catch (error: any) {
      return handleError(error, '登录失败，请稍后重试')
    }
  }

  // 手机号登录
  const mobileLogin = async (loginData: { mobile: string, code: string }): Promise<LoginResult> => {
    try {
      const response = await apiMobileLogin(loginData)
      return handleLoginResponse(response)
    }
    catch (error: any) {
      return handleError(error, '登录失败，请稍后重试')
    }
  }

  // 发送验证码
  const sendCode = async (mobile: string): Promise<LoginResult> => {
    try {
      const response = await apiSendCode({ mobile })
      if (response.code === 200) {
        message.success(response.data?.message || '验证码发送成功')
        return { success: true }
      }
      const errorMsg = response.msg || '验证码发送失败'
      message.error(errorMsg)
      return { success: false, message: errorMsg }
    }
    catch (error: any) {
      return handleError(error, '验证码发送失败，请稍后重试')
    }
  }

  // 获取用户信息
  const getUserInfo = async (): Promise<any> => {
    const response = await apiGetUserInfo()
    if (response.code === 200 && response.data) {
      const data = response.data
      Object.assign(userInfo, {
        id: data.id,
        avatar: data.avatar || '',
        nickname: data.nickname || data.username,
        email: data.email || '',
        roles: data.roles || [],
      })
      storage.set(STORAGE_KEYS.USER, userInfo)
      return data
    }
    throw new Error(response.msg || '获取用户信息失败')
  }

  // 清除用户数据
  const clearUserData = () => {
    Object.assign(userInfo, {
      id: '',
      avatar: '',
      nickname: '',
      email: '',
      roles: [],
    })
    const authorization = useAuthorization()
    authorization.value = null
    storage.remove(STORAGE_KEYS.USER)
  }

  // 退出登录
  const logout = async () => {
    try {
      await apiLogout()
      message.success('退出成功')
    }
    catch {
      // 静默处理登出错误
    }
    finally {
      clearUserData()
    }
  }

  // 将路由转换为菜单数据
  const transformRouteToMenu = (routes: RouteRecordRaw[]): MenuData => {
    const menus: MenuData = []

    routes.forEach((route) => {
      // 过滤掉不需要显示在菜单中的路由
      if (route.meta?.hideInMenu || route.path === '/' || route.path === '/login' || route.path === '/common' || route.path.includes(':pathMatch'))
        return

      const menuItem: any = {
        path: route.path,
        name: route.name as string,
        title: route.meta?.title as string,
        icon: route.meta?.icon as string,
      }

      // 处理子路由
      if (route.children && route.children.length > 0) {
        const children = transformRouteToMenu(route.children)
        if (children.length > 0)
          menuItem.children = children
      }

      // 如果有 keepAlive 配置，添加到菜单项
      if (route.meta?.keepAlive)
        menuItem.keepAlive = true

      menus.push(menuItem)
    })

    return menus
  }

  // 初始化菜单数据
  const initMenuData = () => {
    // 从路由配置中获取顶级路由
    const topLevelRoutes = router.options.routes.filter(
      route => route.meta?.title && !route.meta?.hideInMenu && route.path !== '/' && route.path !== '/login' && route.path !== '/common' && !route.path.includes(':pathMatch'),
    )

    menuData.value = transformRouteToMenu(topLevelRoutes)
  }

  // 初始化用户信息
  const initUserInfo = () => {
    const savedUser = storage.get(STORAGE_KEYS.USER)
    if (savedUser)
      Object.assign(userInfo, savedUser)
  }

  // 初始化
  initMenuData()
  initUserInfo()

  return {
    menuData,
    userInfo,
    avatar,
    nickname,
    isLoggedIn,
    login,
    mobileLogin,
    sendCode,
    logout,
    getUserInfo,
  }
})
