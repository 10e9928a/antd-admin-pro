<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()

const currentTime = ref('')

// 更新当前时间
const updateTime = () => {
  currentTime.value = new Date().toLocaleString()
}

// 刷新用户信息
const refreshUserInfo = async () => {
  try {
    await userStore.getUserInfo()
  }
  catch (error) {
    console.error('刷新用户信息失败:', error)
  }
}

// 退出登录
const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
}

// 初始化
onMounted(() => {
  updateTime()
  // 每秒更新时间
  setInterval(updateTime, 1000)
})
</script>

<template>
  <div p-4 mb-18 b-rd-6px class="bg-#fff">
    <h2 mb-4>
      欢迎使用后台管理系统
    </h2>

    <a-card title="用户信息" mb-4>
      <a-descriptions :column="2">
        <a-descriptions-item label="用户ID">
          {{ userStore.userInfo.id || '未登录' }}
        </a-descriptions-item>
        <a-descriptions-item label="用户名">
          {{ userStore.userInfo.nickname || '未登录' }}
        </a-descriptions-item>
        <a-descriptions-item label="邮箱">
          {{ userStore.userInfo.email || '未设置' }}
        </a-descriptions-item>
        <a-descriptions-item label="角色">
          {{ userStore.userInfo.roles?.join(', ') || '无' }}
        </a-descriptions-item>
      </a-descriptions>

      <div mt-4>
        <a-avatar :size="64" :src="userStore.userInfo.avatar" />
        <span ml-4>{{ userStore.userInfo.nickname || '用户' }}</span>
      </div>
    </a-card>

    <a-card title="系统功能">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-statistic title="登录状态" :value="userStore.isLoggedIn ? '已登录' : '未登录'" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="菜单数量" :value="userStore.menuData.length" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="当前时间" :value="currentTime" />
        </a-col>
      </a-row>

      <div mt-4>
        <a-space>
          <a-button type="primary" @click="refreshUserInfo">
            刷新用户信息
          </a-button>
          <a-button @click="handleLogout">
            退出登录
          </a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<style lang="less" scoped>

</style>
