# ATM Blog

个人量化研究与技术实践的记录博客，基于 React 19 + Vite 6 + Tailwind CSS v4 构建。

## 内容

记录在量化交易、多因子选股、CTA 期货策略、AI 辅助编程等领域的探索与实践。

- **滚动窗口稳健性验证** — Ensemble 策略在7个滚动窗口上的稳健性检验，平均年化超额 139%
- **改进回测优化报告** — 10轮系统性参数优化，换手率从 69.5x 降至 10.7x
- **低BARRA因子深度解析** — 12个与BARRA风格因子线性无关的截面Alpha因子库

## 特性

- **移动端顶部栏固定** — 手机端顶部导航栏 `fixed` 定位，滚动时始终可见，不遮挡内容
- **深色模式** — 开关式切换，支持系统偏好检测，持久化到 localStorage
- **响应式布局** — 桌面侧边栏（lg）、平板顶栏（md）、移动端全屏抽屉菜单
- **移动端显示优化** — 文章正文自动换行/断词，表格横向滚动、代码块和图片适配屏幕宽度，防止溢出
- **平滑页面过渡** — 仅内容区域淡入切换，导航栏保持不动，无夸张动画
- **阅读进度条** — 文章详情页顶部纯色进度指示，跟随滚动实时更新
- **面包屑导航** — 文章详情页的层级定位
- **回到顶部按钮** — 滚动超过 400px 后浮出
- **代码分割** — 每个页面懒加载 + 骨架屏过渡
- **SEO** — 每页独立的 `<title>` 和 `<meta>`，文章页 Open Graph 标签
- **可访问性** — 跳过链接、`aria-current`、`aria-label`、`prefers-reduced-motion` 支持
- **搜索与筛选** — 文章模糊搜索 + 标签分类过滤，支持按标签筛选
- **时间线** — 按年份分组的事件卡片，滚动触发淡入动画

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 + Vite 6 |
| 样式 | Tailwind CSS v4 |
| 路由 | React Router v7 |
| 动画 | Framer Motion 12 |
| Markdown | react-markdown + remark-gfm |
| SEO | react-helmet-async |
| 部署 | Docker / Nginx / PM2 |

## Quick Start

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

### Docker 部署（推荐）

根目录 `docker-compose.yml` 统一管理所有服务：

```bash
# 从 docker-app 根目录构建并运行
cd ..
docker compose up -d --build atmblog

# 或构建并运行所有服务
docker compose up -d --build

# 访问 http://localhost:8080
```

### 独立 Docker 部署

```bash
# 进入 atmblog 目录单独构建
cd atmblog
docker compose up -d --build

# 访问 http://localhost:8080
```

### VPS 部署

```bash
# 1. 克隆仓库
git clone https://github.com/superherocheng/ATMBlog.git
cd ATMBlog

# 2. 构建
npm install && npm run build

# 3. 启动服务（使用 Node）
npx serve dist -l 3000

# 或使用 PM2 进程管理
npm install -g pm2
pm2 start "npx serve dist -l 3000" --name atmblog
```

构建产物 `dist/` 为纯静态文件，可使用任何 HTTP 服务器托管。

## License

MIT
