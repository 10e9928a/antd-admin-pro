import type { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layouts/index.vue')

export default [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    component: () => import('@/pages/common/login.vue'),
    meta: {
      title: '登录',
      hideInTab: true, // 不在多页签中显示
    },
  },
  {
    path: '/dashboard',
    name: 'rootPath',
    component: Layout,
    meta: {
      title: 'Dashboard',
      icon: 'DashboardOutlined',
    },
    redirect: '/dashboard/index',
    children: [
      {
        path: '/dashboard/index',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/account',
    name: 'account',
    component: Layout,
    meta: {
      title: 'Account',
      icon: 'UserOutlined',
    },
    redirect: '/account/center',
    children: [
      {
        path: '/account/center',
        name: 'AccountCenter',
        component: () => import('@/pages/account/index.vue'),
        meta: {
          title: 'AccountCenter',
        },
      },
    ],
  },
  {
    path: '/common',
    name: 'LayoutBasicRedirect',
    component: Layout,
    redirect: '/redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: () => import('@/pages/common/redirect.vue'),
        meta: {
          hideInTab: true, // 不在多页签中显示
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/exception/error.vue'),
    meta: {
      title: '404',
      hideInTab: true, // 不在多页签中显示
    },
  },
] as RouteRecordRaw[]
