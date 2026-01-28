<script setup lang="ts">
import { EnvironmentOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons-vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 模拟用户详细信息
const userDetails = computed(() => ({
  avatar: userInfo.value.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  nickname: userInfo.value.nickname || '未设置昵称',
  email: userInfo.value.email || '未设置邮箱',
  phone: '138****8888',
  address: '浙江省杭州市西湖区',
  joinDate: '2023-01-15',
  lastLogin: '2024-11-06 10:30:00',
  roles: userInfo.value.roles || ['用户'],
}))
</script>

<template>
  <div class="account-center">
    <a-row :gutter="24">
      <!-- 用户基本信息卡片 -->
      <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
        <a-card class="user-info-card">
          <div class="user-avatar-section">
            <a-avatar :size="120" :src="userDetails.avatar" class="user-avatar">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <h2 class="user-name">
              {{ userDetails.nickname }}
            </h2>
            <p class="user-roles">
              <a-tag v-for="role in userDetails.roles" :key="role" color="blue">
                {{ role }}
              </a-tag>
            </p>
          </div>
        </a-card>
      </a-col>

      <!-- 详细信息 -->
      <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
        <a-card title="个人信息" class="user-details-card">
          <a-descriptions :column="{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }">
            <a-descriptions-item label="用户昵称">
              <UserOutlined class="info-icon" />
              {{ userDetails.nickname }}
            </a-descriptions-item>
            <a-descriptions-item label="邮箱地址">
              <MailOutlined class="info-icon" />
              {{ userDetails.email }}
            </a-descriptions-item>
            <a-descriptions-item label="手机号码">
              <PhoneOutlined class="info-icon" />
              {{ userDetails.phone }}
            </a-descriptions-item>
            <a-descriptions-item label="所在地区">
              <EnvironmentOutlined class="info-icon" />
              {{ userDetails.address }}
            </a-descriptions-item>
            <a-descriptions-item label="注册时间">
              {{ userDetails.joinDate }}
            </a-descriptions-item>
            <a-descriptions-item label="最后登录">
              {{ userDetails.lastLogin }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>

        <!-- 统计信息 -->
        <a-card title="使用统计" class="stats-card" style="margin-top: 24px;">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-statistic title="登录次数" :value="156" />
            </a-col>
            <a-col :span="8">
              <a-statistic title="文章数量" :value="23" />
            </a-col>
            <a-col :span="8">
              <a-statistic title="收藏数量" :value="45" />
            </a-col>
          </a-row>
        </a-card>

        <!-- 最近活动 -->
        <a-card title="最近活动" class="activity-card" style="margin-top: 24px;">
          <a-timeline>
            <a-timeline-item color="green">
              <p>2024-11-06 10:30</p>
              <p>登录系统</p>
            </a-timeline-item>
            <a-timeline-item color="blue">
              <p>2024-11-05 15:20</p>
              <p>修改了个人资料</p>
            </a-timeline-item>
            <a-timeline-item color="red">
              <p>2024-11-04 09:15</p>
              <p>更新了头像</p>
            </a-timeline-item>
            <a-timeline-item>
              <p>2024-11-03 14:30</p>
              <p>发布了一篇文章</p>
            </a-timeline-item>
          </a-timeline>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
.account-center {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 64px);
}

.user-info-card {
  .user-avatar-section {
    text-align: center;
    padding: 20px 0;

    .user-avatar {
      margin-bottom: 16px;
    }

    .user-name {
      margin: 16px 0 8px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }

    .user-roles {
      margin-bottom: 24px;
    }

    .edit-btn {
      width: 120px;
    }
  }
}

.user-details-card,
.stats-card,
.activity-card {
  .info-icon {
    margin-right: 8px;
    color: #1890ff;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .account-center {
    padding: 16px;
  }
}
</style>
