import type { MenuData, MenuDataItem } from '@/layouts/basic-layout/typing'
import { isUrl } from '@v-c/utils'
import router from '@/router'

// 递归映射菜单数据
function buildMenuDataMap(menuData: MenuData, menuDataMap: Map<string, MenuDataItem>, matched: MenuDataItem[] = []) {
  menuData.forEach((item) => {
    menuDataMap.set(item.path, { ...item, matched })
    if (item.children?.length)
      buildMenuDataMap(item.children, menuDataMap, [...matched, item])
  })
}

export const useLayoutMenu = defineStore('layout-menu', () => {
  const userStore = useUserStore()
  const menuDataMap = reactive(new Map<string, MenuDataItem>())
  const selectedKeys = ref<string[]>([])
  const openKeys = ref<string[]>([])

  // 更新菜单状态
  const updateMenuState = () => {
    const route = router.currentRoute.value
    const menu = menuDataMap.get(route.path)

    if (!menu)
      return

    // 设置选中的菜单项
    selectedKeys.value = menu.parentKeys?.length
      ? menu.parentKeys
      : [menu.path]

    // 设置展开的菜单项
    if (menu.matched) {
      const newOpenKeys = menu.matched.map(item => item.path)
      openKeys.value = [...new Set([...openKeys.value, ...newOpenKeys])]
    }
  }

  // 处理选中菜单
  const handleSelectedKeys = (keys: string[]) => {
    const path = keys[0]
    // 外部链接不设置为激活状态
    if (!isUrl(path))
      selectedKeys.value = keys
  }

  // 处理展开菜单
  const handleOpenKeys = (keys: string[]) => {
    openKeys.value = keys
  }

  // 监听菜单数据变化
  watch(
    () => userStore.menuData,
    (menuData) => {
      menuDataMap.clear()
      buildMenuDataMap(menuData, menuDataMap)
      updateMenuState()
    },
    { immediate: true, flush: 'post' },
  )

  // 监听路由变化
  watch(
    () => router.currentRoute.value,
    (route) => {
      if (route.path !== selectedKeys.value[0]) {
        // 只更新选中状态，不更新展开状态
        const menu = menuDataMap.get(route.path)
        if (menu) {
          selectedKeys.value = menu.parentKeys?.length
            ? menu.parentKeys
            : [menu.path]
        }
      }
    },
  )

  return {
    selectedKeys,
    openKeys,
    handleSelectedKeys,
    handleOpenKeys,
  }
})
