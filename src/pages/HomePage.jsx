import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { articles } from '../data/articles.js';
import ArticleCard from '../components/ArticleCard.jsx';

function HomePage() {
  const navigate = useNavigate();
  const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestArticles = sorted.slice(0, 6);
  const totalArticles = articles.length;
  const tags = [...new Set(articles.map(a => a.tag).filter(Boolean))];

  return (
    <>
      <Helmet>
        <title>ATM Blog — AI Tools & Development</title>
        <meta name="description" content="ATM Blog pairs quantitative trading with AI tooling — Claude Code for coding and DeepSeek-class models for reasoning — logging real workflows from strategy development to backtesting." />
        <link rel="canonical" href="https://gaodeqingchuda.icu/" />
        <meta property="og:title" content="ATM Blog — AI Tools & Development" />
        <meta property="og:description" content="Quant trading meets AI coding: Claude Code, DeepSeek, and the workflows behind strategy development." />
        <meta property="og:url" content="https://gaodeqingchuda.icu/" />
        <meta name="twitter:title" content="ATM Blog — AI Tools & Development" />
        <meta name="twitter:description" content="Quant trading meets AI coding: Claude Code, DeepSeek, and the workflows behind strategy development." />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero / intro */}
        <div className="mb-10">
          <div className="intro-box border border-hair dark:border-[#2E2B23] p-8 sm:p-10 mb-10 bg-white dark:bg-[#1C1A14]">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand dark:text-brand-light mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-brand" />
              ATM Blog
              <span className="h-px w-8 bg-brand/30" />
              量化交易 · AI 编程笔记
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-[1.05] tracking-tight">
                  AI 编程与量化交易实践
                </h1>
                <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl">
                  以量化交易为主线，用 Claude Code 写代码、用 DeepSeek 等大模型做推理，记录从策略开发到回测落地的真实工作流。重点不是炫技，而是把每一步变成可以复用的方法。
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <button
                  onClick={() => navigate('/articles')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-brand text-white hover:bg-brand-dark transition-colors rounded-lg"
                >
                  阅读最新文章
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </button>
                <div className="text-xs text-gray-500 dark:text-gray-400 lg:text-right leading-relaxed">
                  <span className="block">{totalArticles} 篇文章</span>
                  <span className="block">{tags.length} 个主题标签</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Articles */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold border-b border-wiki-border dark:border-gray-700 pb-2 flex-1">
              最新文章
            </h2>
            <button
              onClick={() => navigate('/articles')}
              className="text-sm text-brand hover:text-brand-dark dark:hover:text-brand-light ml-4 cursor-pointer font-medium transition-colors inline-flex items-center gap-1"
            >
              查看全部
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
