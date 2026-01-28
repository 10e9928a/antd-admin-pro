/**
 * API 接口类型定义
 */

// 用户相关类型
export interface UserInfo {
  id: string
  username: string
  nickname: string
  avatar: string
  email: string
  roles: string[]
}

export interface LoginParams {
  username: string
  password: string
}

export interface MobileLoginParams {
  mobile: string
  code: string
}

export interface SendCodeParams {
  mobile: string
}

export interface LoginResponse {
  token: string
  userInfo: UserInfo
}

export interface SendCodeResponse {
  message: string
}
