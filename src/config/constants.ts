/**
 * 全局常量配置
 */

// 存储键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const

// 路由常量
export const ROUTES = {
  LOGIN: '/login',
  HOME: '/dashboard',
  REDIRECT: '/redirect',
} as const

// HTTP 状态码
export const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const

// 请求配置
export const REQUEST_CONFIG = {
  TIMEOUT: 60000,
  ERROR_DURATION: 3000,
} as const

// 多标签配置
export const MULTI_TAB_CONFIG = {
  MIN_TAB_COUNT: 1,
  REFRESH_DELAY: 800,
} as const
