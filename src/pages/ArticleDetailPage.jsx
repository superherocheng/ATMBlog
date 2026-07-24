import { useState, useEffect, useMemo, useRef, Children } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { articles } from '../data/articles.js';
import { getArticleBody } from '../data/content.js';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReadingProgress from '../components/ReadingProgress.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import ProgressiveImage from '../components/ProgressiveImage.jsx';

function flattenText(children) {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      if (child?.props?.children) return flattenText(child.props.children);
      return '';
    })
    .join('');
}

function slugify(text) {
  return String(text).toLowerCase().replace(/[^\w一-龥]+/g, '-').replace(/^-+|-+$/g, '');
}

// Drop a leading section numeral (「一、」「〇、」「五、」「1.」…) so the TOC label
// doesn't read "PART 2: 一、行情复盘" — PART N already carries the ordering.
function stripLeadingNumeral(text) {
  return text.replace(/^[0-9〇一二三四五六七八九十百]+[、.．]\s*/, '');
}

// ponytail: module-scoped so its identity is stable; avoids remounting every
// code block (and losing copy state) on each parent re-render.
function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  // react-markdown v10 wraps block code as <pre><code>; the <pre> override below
  // hands us the inner <code> element as children. Read text/lang off it.
  const codeEl = Children.toArray(children)[0];
  const className = codeEl?.props?.className || '';
  const code = flattenText(codeEl?.props?.children).replace(/\n$/, '');
  const language = className.match(/language-([a-z0-9+-]+)/i)?.[1] || 'code';

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for non-HTTPS or older browsers
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="code-block">
      <span className="code-language">{language}</span>
      <button type="button" onClick={handleCopy} className="code-copy-btn">
        {copied ? '已复制' : '复制'}
      </button>
      <pre className={className}>{children}</pre>
    </div>
  );
}

function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const articleId = Number(id);
  const article = articles.find((a) => a.id === articleId);
  const [bodyMarkdown, setBodyMarkdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [tocOpen, setTocOpen] = useState(false);
  const [headings, setHeadings] = useState([]);
  const articleBodyRef = useRef(null);
  const relatedArticles = articles
    .filter((item) => item.id !== article?.id && item.tag === article?.tag)
    .slice(0, 3);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getArticleBody(articleId).then((body) => {
      if (!cancelled) {
        setBodyMarkdown(body);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [articleId]);

  // Build the TOC from the rendered DOM: h2 only (big sections), not h3 — h3
  // subsections (1.1/1.2) made the TOC unusably long. Can't pick up ``` fenced
  // block lines as fake headings, ids are derived from real (rendered) text, and
  // duplicates get -2/-3 suffixes so both the TOC keys and anchor targets stay
  // unique. Label is "PART N: <title>" with the leading numeral stripped.
  useEffect(() => {
    if (loading || !bodyMarkdown) { setHeadings([]); return; }
    const root = articleBodyRef.current;
    if (!root) return;
    const seen = new Map();
    const items = Array.from(root.querySelectorAll('h2')).map((el, i) => {
      const text = (el.textContent || '').trim();
      const base = slugify(text);
      const n = (seen.get(base) || 0) + 1;
      seen.set(base, n);
      const id = n === 1 ? base : `${base}-${n}`;
      el.id = id;
      return { text, id, label: `PART ${i + 1}: ${stripLeadingNumeral(text)}` };
    });
    setHeadings(items);
  }, [loading, bodyMarkdown]);

  const markdownComponents = useMemo(() => ({
    // h2/h3 intentionally not overridden: react-markdown renders them plainly and
    // the TOC effect below assigns their ids (deduped), so the sidebar TOC anchors
    // always match the real headings.
    h1: ({ children }) => <h1 id={slugify(flattenText(children))}>{children}</h1>,
    h4: ({ children }) => <h4 id={slugify(flattenText(children))}>{children}</h4>,
    p: ({ children }) => <p>{children}</p>,
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    table: ({ children }) => <div className="table-wrap"><table>{children}</table></div>,
    thead: ({ children }) => <thead>{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => <th>{children}</th>,
    td: ({ children }) => <td>{children}</td>,
    img: ({ src, alt }) => (
      <figure className="article-figure">
        <button type="button" className="article-image-btn" onClick={() => setImagePreview({ src, alt })}>
          <ProgressiveImage src={src} alt={alt || ''} />
        </button>
        {alt ? <figcaption>{alt}</figcaption> : null}
      </figure>
    ),
    a: ({ href, children }) => (
      <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noreferrer noopener' : undefined}>
        {children}
      </a>
    ),
    // react-markdown v10 dropped the `inline` prop, so block/inline split is done
    // by structure: fenced code is wrapped in <pre> -> CodeBlock; bare <code> is inline.
    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
    code: ({ className, children }) => <code className={className}>{children}</code>,
  }), []);

  if (!article) {
    return (
      <>
        <Helmet>
          <title>ATM Blog — Not Found</title>
        </Helmet>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => { if (window.history.length > 1) navigate(-1); else navigate('/articles'); }} className="text-sm text-wiki-blue hover:underline mb-6 inline-flex items-center gap-1 cursor-pointer">
            &larr; Back
          </button>
          <div className="text-center py-16">
            <h1 className="font-display text-3xl font-bold mb-4">Article not found</h1>
            <p className="text-gray-500 mb-6 text-sm">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/articles')}
              className="border border-wiki-black dark:border-gray-500 px-5 py-2.5 text-sm hover:bg-wiki-black hover:text-white dark:hover:bg-gray-600 transition-colors"
            >
              Browse articles
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ReadingProgress />
      <Helmet>
        <title>{article.title} — ATM Blog</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://gaodeqingchuda.icu/article/${article.id}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://gaodeqingchuda.icu/article/${article.id}`} />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "description": article.excerpt,
          "datePublished": article.date,
          "dateModified": article.lastModified || article.date,
          "author": { "@type": "Person", "name": "ATM Blog" },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://gaodeqingchuda.icu/article/${article.id}`
          }
        })}</script>
      </Helmet>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: '文章', path: '/articles' },
            { label: article.title },
          ]}
        />

        <div className="xl:hidden mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setTocOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-[#1C1A14]/90 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 shadow-sm"
            aria-expanded={tocOpen}
            aria-controls="mobile-article-toc"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4h12M2 8h12M2 12h8" />
            </svg>
            目录
          </button>
          <span className="text-xs text-gray-500 dark:text-gray-400">{headings.length} 个章节</span>
        </div>

        {tocOpen && (
          <div id="mobile-article-toc" className="xl:hidden mb-6 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#1C1A14] p-4 shadow-card">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">目录</h2>
            {headings.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      onClick={() => setTocOpen(false)}
                      className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors"
                    >
                      {heading.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">这篇文章暂时没有可提取的二级标题。</p>
            )}
          </div>
        )}

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-brand dark:text-brand-light bg-brand-subtle dark:bg-brand/10 px-2.5 py-1">
              文章详情
            </span>
            {article.tag && (
              <span className="border border-wiki-border dark:border-gray-600 px-2.5 py-1 text-xs font-medium text-brand dark:text-brand-light">
                {article.tag}
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl font-bold mb-3 leading-tight tracking-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            {article.readTime && <span>{article.readTime}</span>}
            {article.date && <span>{article.date}</span>}
          </div>
          {article.excerpt && (
            <p className="mt-5 text-gray-600 dark:text-gray-400 leading-relaxed border-l-2 border-brand pl-4">
              {article.excerpt}
            </p>
          )}
        </header>
        <div className="grid gap-10 xl:grid-cols-[minmax(0,820px)_240px] xl:justify-center">
          <div className="min-w-0">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-5/6" />
                <div className="skeleton h-4 w-4/6" />
                <div className="skeleton h-4 w-full mt-6" />
                <div className="skeleton h-4 w-3/4" />
              </div>
            ) : bodyMarkdown ? (
              <div className="article-body" ref={articleBodyRef}>
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {bodyMarkdown}
                </Markdown>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 text-sm">文章正文暂不可用。</div>
            )}
          </div>

          <aside className="hidden xl:block">
            <div className="article-support-panel sticky top-4 w-60 space-y-6 self-start">
              <div className="border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#1C1A14] p-4 shadow-card">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">目录</h2>
                {headings.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors"
                        >
                          {heading.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400">这篇文章暂时没有可提取的二级标题。</p>
                )}
              </div>

              {relatedArticles.length > 0 && (
                <div className="border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#1C1A14] p-4 shadow-card">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">相关文章</h2>
                  <div className="space-y-2">
                    {relatedArticles.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => navigate(`/article/${item.id}`)}
                        className="block w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors leading-relaxed"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Bottom navigation */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate('/articles')}
            className="inline-flex items-center gap-1.5 text-sm text-brand hover:text-brand-dark dark:hover:text-brand-light transition-colors font-medium"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 12l-4-4 4-4" />
            </svg>
            返回文章列表
          </button>
        </div>
      </div>
      {imagePreview && (
        <button
          type="button"
          className="image-lightbox"
          onClick={() => setImagePreview(null)}
          aria-label="Close image preview"
        >
          <img src={imagePreview.src} alt={imagePreview.alt || ''} />
        </button>
      )}
    </>
  );
}

export default ArticleDetailPage;
