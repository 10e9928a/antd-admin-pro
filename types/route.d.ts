import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 菜单/页签标题
    title?: string
    // 菜单图标（@ant-design/icons-vue 组件名）
    icon?: string
    // 是否在菜单中隐藏
    hideInMenu?: boolean
    // 是否在多页签中隐藏
    hideInTab?: boolean
    // 隐藏菜单时点击可高亮的父级 key
    parentKeys?: string[]
    // 是否隐藏子菜单
    hideChildrenInMenu?: boolean
    // 是否缓存页面
    keepAlive?: boolean
    // 外链打开方式
    target?: '_blank' | '_self' | '_parent'
    // 是否固定页签（不可关闭）
    affix?: boolean
  }
}
