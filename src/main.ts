import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

// 样式导入
import 'ant-design-vue/dist/reset.css'
import 'uno.css'
import '@/assets/styles/reset.css'

// 路由守卫
import '@/router/router-guard'

/**
 * 应用初始化
 */
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
