/**
 * 本地存储工具类
 * 统一管理 localStorage 操作，提供类型安全的存储接口
 */

// 存储错误处理
function handleStorageError(operation: string, key: string, error: any) {
  console.error(`Storage ${operation} error for key "${key}":`, error)
  return null
}

export const storage = {
  /**
   * 设置存储项
   * @param key 存储键
   * @param value 存储值（会自动序列化为 JSON）
   */
  set: <T = any>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    }
    catch (error) {
      handleStorageError('set', key, error)
    }
  },

  /**
   * 获取存储项
   * @param key 存储键
   * @returns 存储值（自动反序列化），不存在则返回 null
   */
  get: <T = any>(key: string): T | null => {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    }
    catch (error) {
      return handleStorageError('get', key, error)
    }
  },

  /**
   * 移除存储项
   * @param key 存储键
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    }
    catch (error) {
      handleStorageError('remove', key, error)
    }
  },

  /**
   * 清空所有存储项
   */
  clear: (): void => {
    try {
      localStorage.clear()
    }
    catch (error) {
      console.error('Storage clear error:', error)
    }
  },

  /**
   * 检查存储项是否存在
   * @param key 存储键
   */
  has: (key: string): boolean => {
    return localStorage.getItem(key) !== null
  },
}
