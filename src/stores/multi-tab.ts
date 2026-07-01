import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { message } from 'ant-design-vue/es'
import { MULTI_TAB_CONFIG } from '@/config'
import router from '@/router'

export interface MultiTabItem {
  path: string
  fullPath: string
  title: string
  name?: string
  icon?: string
  affix?: boolean
  loading?: boolean
}

const { REFRESH_DELAY, MIN_TAB_COUNT } = MULTI_TAB_CONFIG

export const useMultiTab = defineStore('multi-tab', () => {
  // 状态
  const list = ref<MultiTabItem[]>([])
  const activeKey = shallowRef<string>()
  const refreshItem = ref<MultiTabItem | null>(null)

  // 检查路由是否应该添加到标签页
  const shouldAddRoute = (route: RouteLocationNormalizedLoaded): boolean => {
    return !!(
      route
      && !route.path.startsWith('/redirect')
      && !route.meta?.hideInTab
    )
  }

  // 创建标签项
  const createTabItem = (route: RouteLocationNormalizedLoaded): MultiTabItem => ({
    path: route.path,
    fullPath: route.fullPath,
    title: route.meta.title as string,
    name: route.name as string,
    icon: route.meta.icon as string,
    affix: route.meta.affix as boolean,
  })

  // 完成刷新
  const finishRefresh = () => {
    if (refreshItem.value) {
      setTimeout(() => {
        if (refreshItem.value) {
          refreshItem.value.loading = false
          refreshItem.value = null
        }
      }, REFRESH_DELAY)
    }
  }

  // 添加标签
  const addItem = (route: RouteLocationNormalizedLoaded) => {
    if (!shouldAddRoute(route))
      return

    finishRefresh()

    if (list.value.some(item => item.fullPath === route.fullPath))
      return

    list.value.push(createTabItem(route))
  }

  // 关闭标签
  const close = (key: string) => {
    if (list.value.length <= MIN_TAB_COUNT) {
      message.error('不能关闭最后一个标签页')
      return
    }

    const index = list.value.findIndex(item => item.fullPath === key)
    if (index < 0) {
      message.error('当前页签不存在无法关闭')
      return
    }

    const item = list.value[index]
    if (item.fullPath === activeKey.value) {
      const newItem = index === 0 ? list.value[index + 1] : list.value[index - 1]
      activeKey.value = newItem.fullPath
      router.push(newItem.fullPath)
    }

    list.value = list.value.filter(item => item.fullPath !== key)
  }

  // 刷新标签
  const refresh = (key: string) => {
    const item = list.value.find(item => item.fullPath === key)
    if (item) {
      item.loading = true
      refreshItem.value = item
      router.replace(`/redirect/${encodeURIComponent(item.fullPath)}`)
    }
  }

  // 切换标签
  const switchTab = (key: string) => {
    router.push(key)
  }

  // 监听路由变化
  watch(
    () => router.currentRoute.value,
    (route) => {
      if (route.fullPath === activeKey.value)
        return
      activeKey.value = route.fullPath
      addItem(route)
    },
    { immediate: true },
  )

  return {
    list,
    activeKey,
    close,
    refresh,
    switchTab,
  }
})
