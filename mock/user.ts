import type { MockMethod } from 'vite-plugin-mock'

// 模拟用户数据
const users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    nickname: '管理员',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    email: 'admin@example.com',
    roles: ['admin'],
    token: 'admin-token-123456',
  },
  {
    id: '2',
    username: 'user',
    password: 'user123',
    nickname: '普通用户',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    email: 'user@example.com',
    roles: ['user'],
    token: 'user-token-123456',
  },
]

// 存储当前登录的token
let currentTokens: string[] = []

export default [
  // 登录接口
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body

      // 查找用户
      const user = users.find(u => u.username === username && u.password === password)

      if (!user) {
        return {
          code: 401,
          msg: '用户名或密码错误',
          data: null,
        }
      }

      // 添加token到当前登录列表
      if (!currentTokens.includes(user.token))
        currentTokens.push(user.token)

      return {
        code: 200,
        msg: '登录成功',
        data: {
          token: user.token,
          userInfo: {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            avatar: user.avatar,
            email: user.email,
            roles: user.roles,
          },
        },
      }
    },
  },

  // 获取用户信息接口
  {
    url: '/api/user/info',
    method: 'get',
    response: ({ headers }) => {
      const token = headers.authorization

      if (!token || !currentTokens.includes(token)) {
        return {
          code: 401,
          msg: '未授权，请重新登录',
          data: null,
        }
      }

      // 根据token查找用户
      const user = users.find(u => u.token === token)

      if (!user) {
        return {
          code: 401,
          msg: '用户信息不存在',
          data: null,
        }
      }

      return {
        code: 200,
        msg: '获取成功',
        data: {
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          email: user.email,
          roles: user.roles,
        },
      }
    },
  },

  // 退出登录接口
  {
    url: '/api/auth/logout',
    method: 'post',
    response: ({ headers }) => {
      const token = headers.authorization

      if (token) {
        // 从当前登录列表中移除token
        currentTokens = currentTokens.filter(t => t !== token)
      }

      return {
        code: 200,
        msg: '退出成功',
        data: null,
      }
    },
  },

  // 手机号登录接口（模拟）
  {
    url: '/api/auth/mobile-login',
    method: 'post',
    response: ({ body }) => {
      const { mobile, code } = body

      // 简单验证手机号和验证码
      if (mobile === '13800138000' && code === '123456') {
        const user = users[0] // 默认返回管理员用户

        if (!currentTokens.includes(user.token))
          currentTokens.push(user.token)

        return {
          code: 200,
          msg: '登录成功',
          data: {
            token: user.token,
            userInfo: {
              id: user.id,
              username: user.username,
              nickname: user.nickname,
              avatar: user.avatar,
              email: user.email,
              roles: user.roles,
            },
          },
        }
      }

      return {
        code: 401,
        msg: '手机号或验证码错误',
        data: null,
      }
    },
  },

  // 发送验证码接口（模拟）
  {
    url: '/api/auth/send-code',
    method: 'post',
    response: ({ body }) => {
      const { mobile } = body

      // 简单验证手机号格式
      if (!/^1[3-9]\d{9}$/.test(mobile)) {
        return {
          code: 400,
          msg: '手机号格式不正确',
          data: null,
        }
      }

      return {
        code: 200,
        msg: '验证码发送成功',
        data: {
          message: '验证码已发送到您的手机，请注意查收（测试验证码：123456）',
        },
      }
    },
  },
] as MockMethod[]
