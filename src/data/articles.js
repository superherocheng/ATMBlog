export const navLinks = [
  { label: 'Home', view: 'home', path: '/' },
  { label: 'Articles', view: 'articles', path: '/articles' },
  { label: 'Timeline', view: 'timeline', path: '/timeline' },
  { label: 'Websites', view: 'websites', path: '/websites' },
];

export const articles = [
  {
    id: 1,
    slug: 'rolling-window-robustness-verification',
    title: '滚动窗口稳健性验证报告',
    excerpt: '基于 Ensemble 策略的7轮滚动验证——对 ILLIQ_20 + alpha002 + MOM_60 + alpha051 四因子组合在中证500上的稳健性进行系统性检验，平均年化超额139%。',
    date: '2026-06-05',
    readTime: '8 min read',
    tag: '量化',
  },
  {
    id: 2,
    slug: 'improved-backtest-optimization-r7',
    title: '改进回测优化报告——R7夺冠之路',
    excerpt: '10轮系统性参数优化，将换手率从69.5x降至10.7x（-85%），同时保持29.23%年化超额与1.55信息比率的冠军策略深度解析。',
    date: '2026-06-06',
    readTime: '10 min read',
    tag: '量化',
  },
  {
    id: 3,
    slug: 'low-barra-factor-deep-dive',
    title: '12个低BARRA相关系列因子深度解析',
    excerpt: '与BARRA五大风格因子线性无关的截面Alpha因子库——从RSRS修正斜率到恐慌贪婪情绪因子，12个原创因子的设计哲学、数学推导与实盘应用。',
    date: '2026-06-06',
    readTime: '15 min read',
    tag: '量化',
  },
];

export const timelineEvents = [
  { date: '2025-03', event: '开始学习量化交易与掘金量化平台，接触QMT，尝试A股策略开发' },
  { date: '2025-06', event: '完成首个多因子选股策略，在掘金平台进行回测验证' },
  { date: '2025-09', event: '深入学习BARRA多因子模型与风险归因体系' },
  { date: '2025-12', event: '初步完成12个低BARRA因子库的构建与回测' },
  { date: '2026-01', event: '开始尝试期货量化交易，学习使用OpenClaw平台' },
  { date: '2026-02', event: '购买Coding Plan，系统学习VibeCoding开发范式' },
  { date: '2026-03', event: '开始使用Claude Code / CodeWhale进行AI辅助编程' },
  { date: '2026-04', event: '使用GLM 5.1和DeepSeek V4大模型API构建量化策略' },
  { date: '2026-05', event: '完成10轮回测优化，R7策略换手率降至10.7x' },
  { date: '2026-06', event: 'ATM Blog上线，记录量化探索与技术实践' },
];

export const websitesData = [
  { id: 1, name: '掘金量化', description: '专业的量化交易平台，支持多市场、多策略的回测与实盘。', url: 'https://www.myquant.cn', tech: 'Python', status: 'Active' },
  { id: 2, name: 'QMT', description: '迅投QMT量化交易系统，支持A股、期货等多品种策略执行。', url: 'https://www.xtquant.com', tech: 'C++/Python', status: 'Active' },
  { id: 3, name: 'OpenClaw', description: '开源CTA期货量化交易框架，支持多周期多品种组合策略。', url: 'https://github.com/openclaw', tech: 'Python', status: 'Active' },
  { id: 4, name: 'CodeWhale', description: 'AI编码代理平台，支持DeepSeek、GLM等多模型协同开发。', url: 'https://codewhale.ai', tech: 'AI', status: 'Active' },
  { id: 5, name: 'DeepSeek', description: '高性能大语言模型，提供V4系列API，支持复杂代码生成与推理。', url: 'https://deepseek.com', tech: 'AI', status: 'Active' },
  { id: 6, name: 'GLM 5.1', description: '智谱AI最新大语言模型，在量化策略生成与金融NLP领域表现优异。', url: 'https://zhipu.ai', tech: 'AI', status: 'Active' },
];
