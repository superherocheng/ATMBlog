export const navLinks = [
  { label: '首页', view: 'home', path: '/' },
  { label: '文章', view: 'articles', path: '/articles' },
  { label: '时间线', view: 'timeline', path: '/timeline' },
  { label: '资源', view: 'websites', path: '/websites' },
];

export const articles = [
  {
    id: 1,
    slug: 'claude-code-installation-guide',
    title: 'Claude Code 安装与配置完全指南',
    excerpt: '从零开始，5分钟上手终端原生 AI 编程助手。包含 Node.js 安装、CLAUDE.md 配置、API Key 设置以及高阶配置技巧，让你快速进入 AI 编程世界。',
    date: '2026-06-14',
    readTime: '8 min read',
    tag: 'AI工具',
  },
  {
    id: 2,
    slug: 'trae-ide-usage-experience',
    title: 'TRAE 使用心得：AI IDE 的新选择',
    excerpt: '3个月深度使用 TRAE 的真实体验报告。从 VS Code + Copilot 迁移过来的全面对比，三大杀手锏功能解析，以及 Agent / Edit / Chat 三种模式的实战技巧。',
    date: '2026-06-14',
    readTime: '10 min read',
    tag: 'AI工具',
  },
  {
    id: 3,
    slug: 'claude-code-work-modes-and-prompts',
    title: 'Claude Code 多种工作模式与高阶 Prompt 技巧',
    excerpt: '从"能用"到"好用"的进阶指南。深入解析自由对话、命令模式、Agent 自主模式三种工作方式，配合结构化 Prompt 工程让 AI 编程效率提升 3-5 倍。',
    date: '2026-06-14',
    readTime: '12 min read',
    tag: 'AI工具',
  },
];

export const timelineEvents = [
  { date: '2025-03', event: '开始学习量化交易与掘金量化平台，接触QMT，尝试A股策略开发' },
  { date: '2025-06', event: '完成首个多因子选股策略，在掘金平台进行回测验证' },
  { date: '2025-09', event: '深入学习BARRA多因子模型与风险归因体系' },
  { date: '2025-12', event: '初步完成12个低BARRA因子库的构建与回测' },
  { date: '2026-01', event: '接触 Claude Code，开始探索终端原生 AI 编程体验' },
  { date: '2026-02', event: '购买 Coding Plan，系统学习 VibeCoding 开发范式' },
  { date: '2026-03', event: '从 VS Code 迁移到 TRAE，体验 AI IDE 全流程开发' },
  { date: '2026-04', event: '深度使用 Claude Code Agent 模式，完成多个项目重构' },
  { date: '2026-05', event: '总结 Claude Code 高阶 Prompt 技巧，工作效率提升 3-5 倍' },
  { date: '2026-06', event: 'ATM Blog 改版上线，记录 AI 编程工具探索与技术实践' },
];

export const websitesData = [
  { id: 1, name: 'TRAE', description: '国产 AI IDE，支持 Agent / Edit / Chat 三种模式，深度集成多模型，中文理解能力出色。', url: 'https://www.trae.ai', tech: 'AI', status: 'Active' },
  { id: 2, name: 'Claude Code', description: 'Anthropic 推出的终端原生 AI 编程助手，支持全仓库上下文理解和自动命令执行。', url: 'https://docs.anthropic.com/en/docs/claude-code', tech: 'AI', status: 'Active' },
  { id: 3, name: 'GitHub Copilot', description: '全球最流行的 AI 编程助手，深度集成 VS Code，支持代码补全和 Chat。', url: 'https://github.com/features/copilot', tech: 'AI', status: 'Active' },
  { id: 4, name: 'Cursor', description: 'AI-first 代码编辑器，内置多模型支持，主打 Agent 模式和 Composer 功能。', url: 'https://cursor.sh', tech: 'AI', status: 'Active' },
  { id: 5, name: 'DeepSeek', description: '高性能大语言模型，提供 V4 系列 API，支持复杂代码生成与推理。', url: 'https://deepseek.com', tech: 'AI', status: 'Active' },
  { id: 6, name: '掘金量化', description: '专业的量化交易平台，支持多市场、多策略的回测与实盘。', url: 'https://www.myquant.cn', tech: 'Python', status: 'Active' },
];
