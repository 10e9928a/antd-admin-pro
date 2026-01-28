import type {
  LoginParams,
  LoginResponse,
  MobileLoginParams,
  SendCodeParams,
  SendCodeResponse,
  UserInfo,
} from '../types'
import { useGet, usePost } from '@/utils/request'

/**
 * 用户相关 API
 */

/**
 * 获取用户信息
 */
export function apiGetUserInfo() {
  return useGet<UserInfo>('/user/info')
}

/**
 * 账号密码登录
 */
export function apiLogin(data: LoginParams) {
  return usePost<LoginResponse>('/auth/login', data)
}

/**
 * 手机号登录
 */
export function apiMobileLogin(data: MobileLoginParams) {
  return usePost<LoginResponse>('/auth/mobile-login', data)
}

/**
 * 发送验证码
 */
export function apiSendCode(data: SendCodeParams) {
  return usePost<SendCodeResponse>('/auth/send-code', data)
}

/**
 * 退出登录
 */
export function apiLogout() {
  return usePost('/auth/logout')
}
