<script setup lang="ts">
import { LogoutOutlined, UserOutlined } from '@ant-design/icons-vue'

const userStore = useUserStore()
const router = useRouter()
const { avatar, nickname } = storeToRefs(userStore)
async function handleClick({ key }: any) {
  if (key === 'logout') {
    try {
      await userStore.logout()
    }
    finally {
      router.push({
        path: '/login',
      })
    }
  }
  else if (key === 'center') {
    router.push('/account/center')
  }
}
</script>

<template>
  <a-dropdown>
    <span hover="bg-[var(--hover-color)]" flex items-center h-48px px-12px cursor-pointer class="transition-all-300">
      <a-avatar :src="avatar" mr-8px size="small" />
      <span class="anticon">{{ nickname }}</span>
    </span>
    <template #overlay>
      <a-menu @click="handleClick">
        <a-menu-item key="center">
          <template #icon>
            <UserOutlined />
          </template>
          个人中心
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout">
          <template #icon>
            <LogoutOutlined />
          </template>
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
