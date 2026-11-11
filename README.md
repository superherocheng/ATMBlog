<div align="center">

# ATM Blog

**个人维基风格的技术博客 —— AI 编程工具 · 量化研究 · 产业链投研**

基于 React 19 + Vite 6 + Tailwind CSS v4 构建的纯静态站点

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-green)](#-license)

**[在线访问](https://home.gaodeqingchuda.icu/)** · [内容板块](#-内容板块) · [快速开始](#-快速开始) · [部署](#-部署)

</div>

---

## ✨ 特性

- 📱 **全端响应式** — 桌面侧边栏 / 平板顶栏 / 移动端抽屉菜单 + 固定顶栏，正文自动换行、表格横滚不溢出
- 🌗 **深色模式** — 开关切换 + 系统偏好检测，持久化到 localStorage
- 📖 **阅读体验** — 阅读进度条、面包屑导航、回到顶部、页面淡入过渡、时间线滚动动画
- 🔍 **搜索与筛选** — 文章模糊搜索 + 标签分类过滤
- ⚡ **性能** — 路由级代码分割 + 骨架屏过渡
- 🔎 **SEO** — 每页独立 `<title>` / `<meta>`，文章页 Open Graph 标签与结构化数据
- ♿ **可访问性** — 跳过链接、`aria-current`、`prefers-reduced-motion` 支持

## 📚 内容

- **A股 AI/半导体 投研报告系列**（7/10–11/11 持续更新，已 81 篇）— 每交易日盘后速评：Tushare 金标准 × 多源 web 核验，四色分档（🟢低估首选/🟡合理成长/🟠兑现已满/🔴泡沫避雷）+ 两融/主力资金分拣 + 承诺单纪律。核心方法论：好业绩≠好股票，只奖励"低 PE+业绩兑现+管理层背书"；公司风险与行业景气分开定价（NVDA 事件模板）；两日确认看链不看票；政策催化先拆"旧闻层级"（真正新增的事实 vs 一个月前已交易过的条款），管理层背书看已执行回购的成交均价而非回购价上限。

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 + Vite 6 |
| 样式 | Tailwind CSS v4（设计 token 集中在 `@theme` 块） |
| 路由 | React Router v7 |
| 动画 | Framer Motion 12 |
| Markdown | react-markdown + remark-gfm |
| SEO | react-helmet-async |
| 部署 | Docker（两阶段构建）· `serve` · PM2 |

## 📁 项目结构

```
ATMBlog/
├── public/               # 静态资源；serve.json（SPA 回退 + clean URLs）；AStockBenchmark.html
├── src/
│   ├── components/       # UI 组件（导航 / 深色模式 / 阅读进度 / 骨架屏 / 图片渐进加载…）
│   ├── content/          # 文章 Markdown 源文件（article-N.md）
│   ├── data/             # articles.js 文章注册表
│   ├── pages/            # 首页 / 文章列表 / 文章详情 / 时间线 / 404
│   └── index.css         # 设计 token（@theme 块）
├── ops/
│   └── visit-counter/    # 独立访问计数服务（Python stdlib，Caddy 反代）
├── Dockerfile            # 两阶段构建：node:22-alpine 编译 → serve 托管
└── docker-compose.yml
```

## 🚀 快速开始

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

## 🐳 Docker 部署

镜像采用两阶段构建：`node:22-alpine` 编译 `dist/`，再用轻量级静态服务器 [`serve`](https://github.com/vercel/serve) 在 **8080** 端口托管。SPA 回退与 clean URLs 由 `public/serve.json` 提供（构建时自动进入 `dist/`，serve 自动读取）：

- `/article/**`、`/articles`、`/timeline` → 重写到 `index.html`
- `/AStockBenchmark` → 直接解析到 `AStockBenchmark.html`

> ⚠️ **不要**给 `serve` 加 `-s` 参数 —— single 模式会把包括 `/AStockBenchmark` 在内的所有未知路径都重写成 SPA。

```bash
# 构建并运行
docker compose up -d --build

# 访问 http://localhost:8080
```

## 🌐 VPS 部署

```bash
# 1. 克隆仓库
git clone https://github.com/superherocheng/ATMBlog.git
cd ATMBlog

# 2. 构建（产物 dist/ 为纯静态文件，可用任何 HTTP 服务器托管）
npm install && npm run build

# 3. 启动服务（dist 内置 serve.json，自动提供 SPA 回退，无需 -s）
npx serve dist -l 3000
```

或使用 PM2 进程管理：

```bash
npm install -g pm2
pm2 start "npx serve dist -l 3000" --name atmblog
```

## 📝 内容板块

记录在 AI 编程工具、开发工作流、量化交易与产业链投研等领域的探索，目前包含以下系列：

| 系列 | 简介 |
|------|------|
| **A 股 AI/半导体投研报告**（79 篇 · 日更） | 每日产业链投研报告：Tushare 量价/财报金标准 × 多簇并行 Web 核查 × 卖方研报交叉验证 × 正文潮定价三规则（环比斜率/事件二分/打满型=一日重定价·下修承接·增量信息例外） × 预期差×消化时点（同日同质量可差三倍；已预告的负面看落地区间不看降幅） × 轮斩次序=公募加仓名单 × 目标价媒体二次加工验算 × 判据机械执行（线与结论一致；现金流季节性→累计净现比） × 广度反转识别（放量+涨跌中位数＞指数涨幅；政策底 vs AI 信用链出清的力量对撞） × 公募调仓镜像（减仓组反弹/加仓组续斩） × 两尺冲突裁决（--history 分布验证：E4 触发×读数<85=抛硬币、10/23·11/2 两个"被错过"买点至今全亏=闸门救了两次；85 闸门为唯一执行尺+明示设计代价） × 修复脉冲判别（三击事件级燃料+2 万亿天量≠反转确认，追高禁令不因长阳解除；闸门错过 +10%=代价首次实付记入台账，单次抽样不推翻分布） × 利空谣传双否认=最强澄清形态（公司与被冒名券商双否认→次日信息修复，但修复≠筹码出清完成、澄清日资金流是错杀与真弱的过滤器） × 产业链分拣（民主党横扫=AI capex 政治折价沿"需求地在哪"分拣：海外算力链被反手卖 vs 国产链被加买，流出前七/流入前十全池完全镜像） × 主力净额第四层纪律（方向预测三期连败→只写阈值不写倾向、档内排序不随单日流入上调、普涨日个股流入先打 β 折扣） × 触发器收盘口径显式化（竞价跌停 39.86 盘中擦过≠执行，触发器一律看收盘价；政治分母的定价是跳变不是线性外推——"若续跌>2%"类单一阈值对政治事件失准，改写情景分支） × 两融 T+1 口径（暴跌日"杠杆未撤"式结论必须等 T+1 数据落地，措辞上限="截至 T-1"） × 超卖反弹日的数据冲击折价（强非农被 SOX +4.2% 反弹日吸收、分母压力延后至 CPI 再定价——事件分支要区分"数据方向"与"市场位置"） |
| **A 股财报深度点评**（1 篇） | 三季报原文级拆解：单季拆账（经营现金流/应收/存货）× 超预期分层判定 × 定价双剧本预演 × 金油共振背景板；首篇工业富联 Q3——利润超预期、现金流踩线 |
| **宏观简报**（17 篇） | FOMC 议息、重要财报与中美宏观数据的多渠道交叉验证，跨机构研报综读与传导链拼图；九份研报全景（AI 收入-债务信用分层 / 中期选举三线时钟 / 利率市场化下银行息差与理财行为重构）；2027 中美展望四报告综读（AI"慢即是快"与融资反噬 / 中国"六张网"1 万亿对冲地产出清 / 加息周期下人民币看升 6.12 的反利差定价）；**2027 年度策略五报告交叉验证**（申万 A股策略×行业比较×宏观 + 浙商 AI 产业链 + 长江因子日历：两段论时间表 / 高拥挤瓦解三口径下行空间 / 反向 DCF 反解 29-30 年隐含增速 / 供给放量 27Q1-Q2 / 因子月度风险偏好） |
| **有色金属/大宗商品**（3 篇） | 铜期货三市场与矿业龙头深度、小金属研报拆解、国内期货全品种动量扫描 |
| **量化研究专题**（1 篇） | 宽基 ETF 量价 × 份额全景实证（9 只 × 2005–2026 全历史），NW-HAC + 块自助 + FDR 多重检验；卖方研报的批判性量化审视 |
| **Claude Code 指南**（3 篇） | 安装配置完全指南、多种工作模式与高阶 Prompt 技巧、AI IDE（TRAE）迁移体验与结构化工作流 |

<details>
<summary><b>A 股投研方法论要点</b>（点击展开）</summary>

- **极端恐慌仪表盘** — 9 成分量价/情绪成分百分位合成 0–100 读数，双闸门 85/95 + 企稳确认 + 分批执行阶梯，治「过早抄底」（≥85 触发后 20 日胜率 82%）
- **区间视角** — 用「自前期高点的区间回撤」判低估 vs 泡沫，而非单日涨跌
- **headline 扣非验证** — 业绩预增% 须剔除投资收益/公允价值变动等非经常性注水，市场按扣非定价
- **传闻三态核查** — 供应链/政策传闻须交叉验证当事方回应：确认 / 否认 / 「不评论」，第三态最危险
- **数据卫生** — 披露日历以交易所预约 API 为准、成交额口径显式标注、单一机构观点查新旧与完整上下文

> ⚠️ 所有投研内容仅为个人研究记录，不构成任何投资建议。

</details>

## 🎨 视觉设计

「素净纸感 + 赤陶」——浅色暖纸画布（`#FAF9F6`）配墨色文字，唯一彩色点缀为赤陶 `#B45309`，只用在分类标签、链接、强调与阅读进度条上，绝不铺大面积。深色模式为暖炭灰伴侣（`#14130F` + 提亮赤陶 `#D97706`）。字体纯无衬线（Inter + Noto Sans SC），层级靠字号与字重；卡片用发丝边框取代阴影，留白克制。全部设计 token 集中在 `src/index.css` 的 `@theme` 块，JSX 走 Tailwind `brand`/`accent` 工具类引用。

## 📄 License

[MIT](LICENSE)
