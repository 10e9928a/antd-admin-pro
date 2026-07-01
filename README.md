# Antd Admin Pro

基于 Vue 3 + Ant Design Vue 4 + TypeScript + Vite 的轻量后台管理平台模板，开箱即用，可作为中后台项目的起点。

## ✨ 特性

- 🚀 **最新技术栈**：Vue 3.5 / Vite 8 / TypeScript 6
- 🎨 **Ant Design Vue 4**：企业级 UI 组件库，支持暗色主题与主题色定制
- 📦 **Pinia** 状态管理 + **Vue Router 5** 路由
- 🔧 **自动导入**：组件与 Composition API 自动导入，无需手动 import
- 🔐 **登录鉴权**：内置基于 Token 的路由守卫与登录流程
- 🗂️ **多标签页**：支持标签页导航、刷新、关闭
- 🌈 **UnoCSS**：原子化 CSS 引擎
- 🔨 **Mock 数据**：内置 vite-plugin-mock，前端可独立联调

## 📦 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Vue 3.5 |
| 构建 | Vite 8 |
| UI | Ant Design Vue 4.2 |
| 状态管理 | Pinia 3 |
| 路由 | Vue Router 5 |
| 请求 | Axios 1.x |
| CSS | UnoCSS 66 |
| 语言 | TypeScript 6 |
| 代码规范 | ESLint 10 + @antfu/eslint-config |
| 包管理 | pnpm |

## 📁 项目结构

```
antd-admin-pro/
├── src/
│   ├── api/          # API 接口与类型
│   ├── assets/       # 静态资源与全局样式
│   ├── components/   # 通用组件
│   ├── composables/  # 组合式函数
│   ├── config/       # 常量与默认配置
│   ├── layouts/      # 布局（侧边栏 / 头部 / 多标签）
│   ├── pages/        # 页面
│   ├── router/       # 路由与鉴权守卫
│   ├── stores/       # Pinia 状态
│   ├── utils/        # 工具（请求 / 存储）
│   ├── App.vue
│   └── main.ts
├── mock/             # Mock 接口
├── public/           # 公共资源
├── types/            # 类型声明
└── deploy/           # 部署配置（nginx）
```

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器（默认 http://localhost:6678）
pnpm dev

# 构建生产版本
pnpm build

# 预览构建产物
pnpm preview

# 代码检查并修复
pnpm lint
```

## 🔐 默认账号（Mock）

| 登录方式 | 账号 | 密码 / 验证码 |
| --- | --- | --- |
| 账号密码 | `admin` | `admin123` |
| 账号密码 | `user` | `user123` |
| 手机号 | `13800138000` | `123456` |

## 🧩 关键约定

- **路由即菜单**：菜单由 `src/router/static-routes.ts` 中的路由自动生成，通过 `meta` 控制标题、图标、缓存、是否在菜单/页签中隐藏等。
- **鉴权**：`src/router/router-guard.ts` 基于 Token 做前置守卫，未登录访问受保护页面会重定向到登录页。
- **请求**：`src/utils/request.ts` 统一封装 Axios，含 Token 注入与统一错误处理；接口按模块放在 `src/api/modules/`。
- **环境变量**：见 `.env` / `.env.development` / `.env.production`，`VITE_APP_BASE_API` 为接口基础地址。

## 📄 License

MIT
