<script setup lang="ts">
import { MailOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons-vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
</script>

<template>
  <div class="account-center">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
        <a-card>
          <div class="user-info">
            <a-avatar :size="120" :src="userInfo.avatar">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <h2 class="user-name">
              {{ userInfo.nickname || '未设置昵称' }}
            </h2>
            <div class="user-roles">
              <a-tag v-for="role in userInfo.roles" :key="role" color="blue">
                {{ role }}
              </a-tag>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
        <a-card title="个人信息">
          <a-descriptions :column="{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }">
            <a-descriptions-item label="用户 ID">
              {{ userInfo.id || '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="用户昵称">
              <UserOutlined class="info-icon" />
              {{ userInfo.nickname || '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="邮箱地址">
              <MailOutlined class="info-icon" />
              {{ userInfo.email || '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="角色">
              <SafetyOutlined class="info-icon" />
              {{ userInfo.roles?.join(', ') || '-' }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
.account-center {
  padding: 24px;
}

.user-info {
  text-align: center;
  padding: 20px 0;

  .user-name {
    margin: 16px 0 8px;
    font-size: 20px;
    font-weight: 500;
  }
}

.info-icon {
  margin-right: 8px;
  color: var(--text-color-1);
}
</style>
