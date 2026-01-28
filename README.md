# Antd Admin Pro 平台

基于 Vue 3 + Ant Design Vue 4 + TypeScript 构建的现代化后台管理系统。

## ✨ 特性

- 🚀 **最新技术栈**：使用 Vue 3、Vite 4、TypeScript 等前沿技术
- 🎨 **Ant Design Vue**：基于 Ant Design Vue 4.x 组件库
- 📦 **状态管理**：使用 Pinia 进行状态管理
- 🔧 **自动导入**：自动导入组件和 Composition API
- 🎯 **TypeScript**：完整的 TypeScript 支持
- 🌈 **UnoCSS**：原子化 CSS 引擎
- 🔨 **Mock 数据**：内置 Mock 数据支持
- 📱 **响应式**：支持多端适配

## 📦 技术栈

- **框架**：Vue 3.4+
- **构建工具**：Vite 4.3+
- **UI 组件库**：Ant Design Vue 4.2+
- **状态管理**：Pinia 2.1+
- **路由**：Vue Router 4.4+
- **HTTP 请求**：Axios 1.7+
- **CSS 引擎**：UnoCSS 0.51+
- **开发语言**：TypeScript 5.0+
- **包管理器**：pnpm 9.5+

## 📁 项目结构

```
antdv_pro/
├── src/
│   ├── api/              # API 接口
│   ├── assets/           # 静态资源
│   ├── components/       # 通用组件
│   ├── composables/      # 组合式函数
│   ├── config/           # 配置文件
│   ├── layouts/          # 布局组件
│   ├── pages/            # 页面组件
│   ├── router/           # 路由配置
│   ├── stores/           # 状态管理
│   ├── utils/            # 工具函数
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── mock/                 # Mock 数据
├── public/               # 公共资源
├── types/                # 类型声明
├── deploy/               # 部署配置
└── dist/                 # 构建产物

```

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 9.5

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:6678

### 构建生产版本

```bash
pnpm build
```

### 预览构建产物

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

## 🔧 配置说明

### 开发服务器配置

- 默认端口：6678
- 配置文件：`vite.config.ts`

### 路由配置

路由配置位于 `src/router/` 目录：
- `index.ts` - 路由实例
- `static-routes.ts` - 静态路由配置
- `router-guard.ts` - 路由守卫

### 状态管理

使用 Pinia 进行状态管理，Store 文件位于 `src/stores/` 目录：
- `app.ts` - 应用配置
- `user.ts` - 用户信息
- `layout-menu.ts` - 菜单管理
- `multi-tab.ts` - 多标签页管理

## 📝 开发规范

- 使用 ESLint 进行代码规范检查
- 使用 TypeScript 进行类型检查
- 组件和 API 自动导入，无需手动 import
- 使用 Composition API 编写组件

## 📄 License

MIT
