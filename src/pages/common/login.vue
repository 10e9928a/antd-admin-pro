<script setup lang="ts">
import { AlipayCircleFilled, LockOutlined, MobileOutlined, TaobaoCircleFilled, UserOutlined, WeiboCircleFilled } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue/es'

const router = useRouter()
const userStore = useUserStore()

const loginModel = reactive({
  username: 'admin',
  password: 'admin123',
  mobile: '13800138000',
  code: '',
  type: 'account',
  remember: true,
})
const formRef = shallowRef()
const codeLoading = shallowRef(false)
const resetCounter = 60
const submitLoading = shallowRef(false)
const errorAlert = shallowRef(false)

const { counter, pause, reset, resume, isActive } = useInterval(1000, {
  controls: true,
  immediate: false,
  callback(count) {
    if (count) {
      if (count === resetCounter)
        pause()
    }
  },
})

const getCode = async () => {
  codeLoading.value = true
  try {
    await formRef.value.validate(['mobile'])

    const result = await userStore.sendCode(loginModel.mobile)

    if (result.success) {
      reset()
      resume()
      message.success('验证码已发送')
    }

    codeLoading.value = false
  }
  catch (error) {
    codeLoading.value = false
  }
}

const submit = async () => {
  submitLoading.value = true
  errorAlert.value = false
  try {
    await formRef.value?.validate()

    let result
    if (loginModel.type === 'account') {
      // 账号密码登录
      result = await userStore.login({
        username: loginModel.username,
        password: loginModel.password,
      })
    }
    else {
      // 手机号登录
      result = await userStore.mobileLogin({
        mobile: loginModel.mobile,
        code: loginModel.code,
      })
    }

    if (result.success) {
      // 登录成功，跳转到首页
      setTimeout(() => {
        router.push('/')
      }, 500)
    }

    submitLoading.value = false
  }
  catch (e) {
    errorAlert.value = true
    submitLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-content flex-center">
      <div class="ant-pro-form-login-main rounded">
        <!-- 登录头部 -->
        <div class="flex-between h-15 px-4 mb-[2px]">
          <div class="flex items-center">
            <span class="ant-pro-form-login-logo">
              <!-- <img w-full h-full object-cover src="/logo.svg" alt="logo"> -->
            </span>
            <span class="ant-pro-form-login-title">
              Admin Pro
            </span>
            <!-- <span class="ant-pro-form-login-desc">
              Ant Design Vue Pro
            </span> -->
          </div>
        </div>
        <a-divider m-0 />
        <!-- 登录主体 -->
        <div class="box-border flex min-h-[520px]">
          <!-- 登录框左侧 -->
          <div class="ant-pro-form-login-main-left min-h-[520px] flex-center bg-[var(--bg-color-container)]">
            <div class="login-illustration">
              <div class="login-welcome-text">
                欢迎使用
              </div>
              <div class="login-welcome-title">
                Admin Pro
              </div>
              <div class="login-welcome-desc">
                开箱即用的中后台前端解决方案
              </div>
            </div>
          </div>
          <a-divider m-0 type="vertical" class="ant-pro-login-divider min-h-[520px]" />
          <!-- 登录框右侧 -->
          <div class="ant-pro-form-login-main-right px-5 w-[335px] flex-center flex-col">
            <div class="text-center py-6 text-2xl font-semibold">
              用户登录
            </div>
            <a-form ref="formRef" :model="loginModel">
              <a-tabs v-model:active-key="loginModel.type" centered>
                <a-tab-pane key="account" tab="账户密码登录" />
                <a-tab-pane key="mobile" tab="手机号登录" />
              </a-tabs>
              <!-- 判断是否存在error -->
              <a-alert
                v-if="errorAlert && loginModel.type === 'account'"
                mb-24px
                message="账户或密码错误"
                type="error"
                show-icon
              />
              <a-alert
                v-if="errorAlert && loginModel.type === 'mobile'"
                mb-24px
                message="手机号或验证码错误"
                type="error"
                show-icon
              />
              <template v-if="loginModel.type === 'account'">
                <a-form-item name="username" :rules="[{ required: true, message: '用户名不能为空' }]">
                  <a-input
                    v-model:value="loginModel.username"
                    allow-clear
                    autocomplete="off"
                    placeholder="用户名：admin or user"
                    size="large"
                    @press-enter="submit"
                  >
                    <template #prefix>
                      <UserOutlined />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item name="password" :rules="[{ required: true, message: '密码不能为空' }]">
                  <a-input-password
                    v-model:value="loginModel.password"
                    allow-clear
                    placeholder="密码：admin123"
                    size="large"
                    @press-enter="submit"
                  >
                    <template #prefix>
                      <LockOutlined />
                    </template>
                  </a-input-password>
                </a-form-item>
              </template>
              <template v-if="loginModel.type === 'mobile'">
                <a-form-item
                  name="mobile"
                  :rules="[
                    { required: true, message: '手机号不能为空' },
                    {
                      pattern: /^(86)?1([38][0-9]|4[579]|5[0-35-9]|6[6]|7[0135678]|9[89])[0-9]{8}$/,
                      message: '手机号格式不正确',
                    },
                  ]"
                >
                  <a-input
                    v-model:value="loginModel.mobile"
                    allow-clear
                    placeholder="请输入手机号！"
                    size="large"
                    @press-enter="submit"
                  >
                    <template #prefix>
                      <MobileOutlined />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item name="code" :rules="[{ required: true, message: '验证码不能为空' }]">
                  <a-input
                    v-model:value="loginModel.code"
                    allow-clear
                    placeholder="请输入验证码！"
                    size="large"
                    @press-enter="submit"
                  >
                    <template #prefix>
                      <LockOutlined />
                    </template>
                    <template #suffix>
                      <a-button
                        :loading="codeLoading"
                        :disabled="isActive"
                        type="link"
                        size="small"
                        class="code-btn"
                        @click="getCode"
                      >
                        <template v-if="!isActive">
                          获取验证码
                        </template>
                        <template v-else>
                          {{ resetCounter - counter }}s
                        </template>
                      </a-button>
                    </template>
                  </a-input>
                </a-form-item>
              </template>
              <div class="mb-24px flex-between">
                <a-checkbox v-model:checked="loginModel.remember">
                  记住我
                </a-checkbox>
                <a>忘记密码</a>
              </div>
              <a-button type="primary" block :loading="submitLoading" size="large" @click="submit">
                登录
              </a-button>
            </a-form>
            <a-divider>
              <span class="text-slate-500">其他登录方式</span>
            </a-divider>
            <div class="ant-pro-form-login-other">
              <AlipayCircleFilled class="icon" />
              <TaobaoCircleFilled class="icon" />
              <WeiboCircleFilled class="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: var(--bg-color-container);
}

.login-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ant-pro-form-login-title {
  color: var(--text-color);
  font-weight: 600;
  font-size: 33px;
  line-height: 1;
}

.ant-pro-form-login-logo {
  width: 44px;
  height: 44px;
  margin-right: 16px;
  vertical-align: top;
}

.ant-pro-form-login-desc {
  color: var(--text-color-1);
  font-size: 14px;
  margin-left: 16px;
}

.ant-pro-form-login-main {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: var(--bg-color-container);
}

.ant-pro-form-login-main-left {
  width: 700px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.login-illustration {
  text-align: center;
  color: white;
  z-index: 1;
  padding: 40px;
}

.login-welcome-text {
  font-size: 18px;
  margin-bottom: 16px;
  opacity: 0.9;
}

.login-welcome-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 24px;
}

.login-welcome-desc {
  font-size: 16px;
  opacity: 0.8;
}

.ant-pro-form-login-main-right {
  .ant-tabs-nav-list {
    margin: 0 auto;
    font-size: 16px;
  }

  .ant-pro-form-login-other {
    line-height: 22px;
    text-align: center;
  }

  :deep(.ant-form) {
    width: 100%;
  }

  :deep(.ant-form-item) {
    width: 100%;
  }

  :deep(.ant-input),
  :deep(.ant-input-password),
  :deep(.ant-input-affix-wrapper) {
    width: 100% !important;
  }
}

.icon {
  margin-left: 8px;
  color: var(--text-color-2);
  font-size: 24px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
}

.login-media(@width: 100%) {
  .ant-pro-form-login-main {
    width: @width;
  }
  .ant-pro-form-login-main-left {
    display: none;
  }
  .ant-pro-form-login-main-right {
    width: 100%;
  }
  .ant-pro-form-login-desc {
    display: none;
  }
}

@media (min-width: 992px) {
  .ant-pro-form-login-main-left {
    width: 700px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .ant-pro-login-divider {
    display: none;
  }
  .login-media(400px);
}

@media screen and (max-width: 767px) {
  .login-media(350px);

  .ant-pro-login-divider {
    display: none;
  }
}
</style>
