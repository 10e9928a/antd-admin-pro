import Qs from 'qs'
import axios from 'axios'
import { notification } from 'ant-design-vue/es'
import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import router from '@/router'
import { STORAGE_AUTHORIZE_KEY, useAuthorization } from '@/composables/authorization'
import { HTTP_STATUS, REQUEST_CONFIG, ROUTES } from '@/config'

/**
 * 统一响应数据结构
 */
export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
  records?: any
  staffname?: string
}

const { TIMEOUT, ERROR_DURATION } = REQUEST_CONFIG

// 创建 axios 实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
  timeout: TIMEOUT,
  paramsSerializer: params => Qs.stringify(params, { indices: false }),
})

/**
 * 请求拦截器
 */
const requestHandler = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token = useAuthorization()
  if (token.value)
    config.headers.set(STORAGE_AUTHORIZE_KEY, token.value)

  return config
}

/**
 * 响应拦截器 - 成功处理
 */
const responseHandler = (response: AxiosResponse): any => {
  const { data } = response

  // 检查业务状态码，如果是权限相关错误，跳转登录页
  if (data && typeof data === 'object' && 'code' in data) {
    // 401 或其他表示未授权/登录过期的业务状态码
    if (data.code === 401 || data.code === 403) {
      handleUnauthorized(data, '登录已过期')
      return Promise.reject(new Error(data.msg || '未授权'))
    }
  }

  return data
}

/**
 * 处理未授权错误
 */
const handleUnauthorized = (data: ResponseBody, statusText: string) => {
  notification.error({
    message: '未授权',
    description: data?.msg || statusText || '登录已过期，请重新登录',
    duration: ERROR_DURATION,
  })

  const token = useAuthorization()
  token.value = null

  router.replace({
    path: ROUTES.LOGIN,
    query: {
      redirect: router.currentRoute.value.path,
    },
  })
}

/**
 * 响应拦截器 - 错误处理
 */
const errorHandler = (error: AxiosError<ResponseBody>): Promise<never> => {
  if (error.response) {
    const { data, status, statusText } = error.response

    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        // 401 未授权 - 跳转登录页
        handleUnauthorized(data, statusText)
        break
      case HTTP_STATUS.FORBIDDEN:
        // 403 禁止访问 - 也跳转登录页（可能是token过期或无权限）
        handleUnauthorized(data, statusText || '访问被拒绝，请重新登录')
        break
      case HTTP_STATUS.SERVER_ERROR:
        // 服务器错误提示
        notification.error({
          message: '服务器错误',
          description: data?.msg || statusText || '服务器开小差了，请稍后再试',
          duration: ERROR_DURATION,
        })
        break
      default:
        // 其他错误处理
        if (data?.msg) {
          notification.error({
            message: '请求失败',
            description: data.msg,
            duration: ERROR_DURATION,
          })
        }
        break
    }
  }
  else if (error.request) {
    // 请求已发出但没有收到响应
    notification.error({
      message: '网络错误',
      description: '网络连接失败，请检查您的网络设置',
      duration: ERROR_DURATION,
    })
  }

  return Promise.reject(error)
}

// 注册拦截器
instance.interceptors.request.use(requestHandler)
instance.interceptors.response.use(responseHandler, errorHandler)

export default instance

/**
 * GET 请求
 */
export const useGet = <R = any, T = any>(
  url: string,
  params?: T,
  config?: AxiosRequestConfig,
): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    params,
    method: 'GET',
    ...config,
  })
}

/**
 * POST 请求
 */
export const usePost = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    data,
    method: 'POST',
    ...config,
  })
}

/**
 * PUT 请求
 */
export const usePut = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    data,
    method: 'PUT',
    ...config,
  })
}

/**
 * DELETE 请求
 */
export const useDelete = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    data,
    method: 'DELETE',
    ...config,
  })
}
