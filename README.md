# ATM Blog

个人量化研究与技术实践的记录博客，基于 React 19 + Vite 6 + Tailwind CSS v4 构建。

## 内容

记录在 AI 编程工具、开发工作流、量化交易与技术实践等领域的探索。

- **Claude Code 安装与配置完全指南** — 从零开始上手终端原生 AI 编程助手
- **TRAE 使用心得：AI IDE 的新选择** — 从 VS Code + Copilot 迁移过来的真实体验
- **Claude Code 多种工作模式与高阶 Prompt 技巧** — 从基础使用进阶到结构化 Prompt 和自动化工作流
- **A股 AI/半导体 投研报告系列**（7/10–7/29 持续更新，已 11 篇）— 每日基于 Tushare 量价/财报金标准 × 5 簇并行 Web 核查 Workflow × 桌面卖方研报交叉验证的 A 股 AI 产业链投研报告；核心方法论：用区间视角（自前期高点回撤）判低估 vs 泡沫，产业链利好 ≠ 选股时点 ≠ 拥挤度 ≠ 流动性分流；暴跌先辨「杀估值不杀业绩」（PE 压缩 vs 业绩崩塌，前者给低 PEG 标的送买点）；管理层回购/增持 > 卖方纸面目标价（现价跌破分析师共识最低 = 极强低估锚）；反弹看分化（宽基涨 vs 科创50 逆势创新低 = 去杠杆未竟、反弹非反转），去伪存真四色分化（研究支持用途，不构成买卖指令）
- **美股宏观速评系列**（7/29 起）— 美联储议息日 / 重要财报的多渠道交叉验证分析；核心方法论：一手官网数据（FOMC 声明 / 财报页）为准、媒体聚合交叉印证，严格区分「事实 / 口径 / 传言」（如「微软减 capex」实为「维持指引不再上调」的误读），并辨别「仅 SEP 会议才有新点阵图」等技术细节以免被标题党误导（研究支持用途，不构成投资建议）

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
| 部署 | Docker / `serve` / PM2 |

## 视觉设计

「素净纸感 + 赤陶」——浅色暖纸画布（`#FAF9F6`）配墨色文字，**唯一彩色点缀为赤陶 `#B45309`**，只用在分类标签、链接、强调与阅读进度条上，绝不铺大面积。深色模式为暖炭灰伴侣（`#14130F` + 提亮赤陶 `#D97706`）。字体纯无衬线（Inter + Noto Sans SC），层级靠字号与字重；卡片用发丝边框取代阴影，留白克制。全部设计 token 集中在 `src/index.css` 的 `@theme` 块，JSX 走 Tailwind `brand`/`accent` 工具类引用。

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

镜像采用两阶段构建：`node:22-alpine` 编译 `dist/`，再用轻量级静态服务器 [`serve`](https://github.com/vercel/serve) 在 8080 端口托管，并启用 SPA 回退（客户端路由回退到 `index.html`）。根目录 `docker-compose.yml` 统一管理服务：

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
