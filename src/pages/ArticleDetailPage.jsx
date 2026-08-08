import { useState, useEffect, useMemo, Children } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { articles } from '../data/articles.js';
import { getArticleBody } from '../data/content.js';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReadingProgress from '../components/ReadingProgress.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import ProgressiveImage from '../components/ProgressiveImage.jsx';
import { useScrollSpy } from '../hooks/useScrollSpy.js';

// 目录 (Table of Contents) rail. When true, the in-article TOC shows (mobile
// dropdown + desktop sidebar holding 目录 and 相关文章) with the 820px-body /
// 240px-rail two-column layout. Flip to false to hide it — the article body
// then fills the full content width (better for wide tables) and 相关文章
// shows in a bottom strip instead.
const SHOW_TOC = true;

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

// The <header> above already renders article.title + article.excerpt, so the
// markdown body must NOT re-emit its own leading H1 / excerpt blockquote —
// otherwise the title and subtitle each show twice (and the page has two <h1>s).
// Strip a single leading "# title" plus the contiguous "> excerpt" blockquote
// that immediately follows it. Bodies with no leading H1 (e.g. article-32) pass
// through unchanged. A blockquote that is NOT right under the H1 (like the
// 速评 bar-chart legend deeper in the body) is left intact.
function stripFrontMatter(md) {
  if (!md) return md;
  const lines = md.split('\n');
  let i = 0;
  if (!/^#\s+/.test(lines[i] || '')) return md;   // no leading H1 → nothing to strip
  i += 1;
  const swallow = () => { while (lines[i] !== undefined && lines[i].trim() === '') i += 1; };
  swallow();
  if (/^>/.test(lines[i] || '')) {                // strip the excerpt blockquote run
    while (lines[i] !== undefined && /^>/.test(lines[i])) i += 1;
    swallow();
  }
  if (/^(-{3}|\*{3}|_{3})\s*$/.test(lines[i] || '')) {  // drop the --- that often separates
    i += 1;                                             // front matter from the body
    swallow();
  }
  return lines.slice(i).join('\n');
}

// Split front-matter-stripped markdown into sections at top-level `## ` headings
// (fence-aware: a `## ` inside a ``` code block is never treated as a split point).
// Returns [{ title: null, body }, { title, body }, …]: the first entry, when the
// body has lead content before any `## `, has title === null. Each later entry is
// one `## section` with its body = everything until the next `## `.
function splitSections(md) {
  if (!md) return [];
  const lines = md.split('\n');
  const out = [];
  const lead = [];
  let cur = null;
  let inFence = false;
  let fence = '';
  const flush = () => {
    if (cur) {
      out.push({ title: cur.title, body: cur.body.join('\n').replace(/^\n+/, '') });
      cur = null;
    }
  };
  for (const line of lines) {
    const m = /^\s*(`{3,}|~{3,})/.exec(line);
    if (m) {
      if (!inFence) { inFence = true; fence = m[1][0]; }
      else if (line.trim().startsWith(fence)) { inFence = false; fence = ''; }
    }
    if (!inFence && /^##\s+\S/.test(line)) {
      flush();
      cur = { title: line.replace(/^##\s+/, '').trim(), body: [] };
    } else if (cur) {
      cur.body.push(line);
    } else {
      lead.push(line);
    }
  }
  flush();
  if (lead.length && lead.join('').trim()) out.unshift({ title: null, body: lead.join('\n') });
  return out;
}

// Titles that are pure appendix → default-collapsed (reader expands if wanted).
const COLLAPSE_BY_DEFAULT = /方法论|数据说明|附[:：]|信息来源|来源与说明/;

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

// One `## section` rendered with a clickable header (toggle collapse) and the
// markdown body below. `id` is pre-computed so TOC anchors match by construction.
// `highlight` marks it as the key-takeaway section (核心结论) for card styling.
// Untitled lead content (title === null) renders plain, with no toggle.
function ArticleSection({ section, id, open, onToggle, highlight, components }) {
  if (section.title === null) {
    if (!section.body.trim()) return null;
    return (
      <div className="article-section-intro">
        <Markdown remarkPlugins={[remarkGfm]} components={components}>{section.body}</Markdown>
      </div>
    );
  }
  return (
    <section className={`article-section${highlight ? ' takeaway-card' : ''}`}>
      <div
        className="section-head"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      >
        <h2 id={id}>{section.title}</h2>
        <span className="section-chevron" aria-hidden="true">{open ? '▾' : '▸'}</span>
      </div>
      <div className="section-body" hidden={!open}>
        <Markdown remarkPlugins={[remarkGfm]} components={components}>{section.body}</Markdown>
      </div>
    </section>
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
  const [collapsed, setCollapsed] = useState(() => new Set());
  const relatedArticles = articles
    .filter((item) => item.id !== article?.id && item.tag === article?.tag)
    .slice(0, 3);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getArticleBody(articleId).then((body) => {
      if (!cancelled) {
        setBodyMarkdown(body ? stripFrontMatter(body) : body);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [articleId]);

  // Split the body into `## ` sections (fence-aware) and derive the TOC headings
  // + deduped anchor ids from them directly, so ids match the rendered <h2>s by
  // construction (no DOM query needed).
  const sections = useMemo(() => splitSections(bodyMarkdown), [bodyMarkdown]);
  const { headings, sectionIds, takeawayIdx } = useMemo(() => {
    const seen = new Map();
    const headings = [];
    const sectionIds = sections.map(() => null);
    let takeawayIdx = -1;
    sections.forEach((sec, i) => {
      if (sec.title === null) return;
      const base = slugify(sec.title);
      const n = (seen.get(base) || 0) + 1;
      seen.set(base, n);
      const id = n === 1 ? base : `${base}-${n}`;
      sectionIds[i] = id;
      headings.push({ id, text: sec.title, label: `PART ${headings.length + 1}: ${stripLeadingNumeral(sec.title)}`, sectionIndex: i });
      if (takeawayIdx === -1 && /结论/.test(sec.title)) takeawayIdx = i;
    });
    return { headings, sectionIds, takeawayIdx };
  }, [sections]);

  // Default-collapse pure-appendix sections (方法论/数据说明/附…). Re-runs per article.
  useEffect(() => {
    const init = new Set();
    sections.forEach((s, i) => { if (s.title && COLLAPSE_BY_DEFAULT.test(s.title)) init.add(i); });
    setCollapsed(init);
  }, [sections]);

  const toggleSection = (i) => setCollapsed((prev) => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  const activeId = useScrollSpy(headings.map((h) => h.id));

  const jumpTo = (heading) => {
    setCollapsed((prev) => { const next = new Set(prev); next.delete(heading.sectionIndex); return next; });
    setTocOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById(heading.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  // First bold line of the takeaway section — shown as a sticky "本期要点" sidebar card.
  const takeaway = useMemo(() => {
    if (takeawayIdx < 0) return null;
    const body = sections[takeawayIdx].body;
    const bold = body.match(/\*\*([^*\n>]{4,90})\*\*/);
    if (bold) return bold[1].trim();
    const plain = body.replace(/[#>*`]/g, '').replace(/\s+/g, ' ').trim();
    return plain.slice(0, 90) || null;
  }, [sections, takeawayIdx]);

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
    tr: ({ children }) => {
      // Tag rows carrying a tier emoji (🟢🟡🟠🔴) so CSS can paint a left
      // accent — turns the 速评 recommendation tables into scannable tier bands.
      const map = { '🟢': 'g', '🟡': 'y', '🟠': 'o', '🔴': 'r' };
      const text = flattenText(children);
      const tier = Object.keys(map).find((e) => text.includes(e));
      return <tr data-tier={tier ? map[tier] : undefined}>{children}</tr>;
    },
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

  // Shared TOC item list (mobile dropdown + desktop rail), with scroll-spy active
  // highlight and smooth-scroll-on-click that also expands a collapsed target.
  const renderTocItems = () => headings.length > 0 ? (
    <ul className="space-y-1.5 text-sm">
      {headings.map((h) => (
        <li key={h.id}>
          <button
            type="button"
            onClick={() => jumpTo(h)}
            className={`toc-link block w-full text-left transition-colors ${activeId === h.id ? 'toc-active' : 'text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-brand-light'}`}
          >
            {h.label}
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-xs text-gray-500 dark:text-gray-400">这篇文章暂时没有可提取的二级标题。</p>
  );

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
        <link rel="canonical" href={`https://home.gaodeqingchuda.icu/article/${article.id}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://home.gaodeqingchuda.icu/article/${article.id}`} />
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
            "@id": `https://home.gaodeqingchuda.icu/article/${article.id}`
          }
        })}</script>
      </Helmet>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: '文章', path: '/articles' },
            { label: article.title },
          ]}
        />

        {SHOW_TOC && (
          <>
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
            {renderTocItems()}
          </div>
        )}
          </>
        )}

        {/* Align title/excerpt with the body+TOC grid below: 820 body + 40 gap
            + 240 toc = 1100, centered the same way, instead of spanning full
            container width. xl-only (the 2-col grid only exists at xl); gated
            on SHOW_TOC since body is full-width when the TOC is hidden. */}
        <header className={`mb-8${SHOW_TOC ? ' xl:max-w-[1100px] xl:mx-auto' : ''}`}>
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
        <div className={SHOW_TOC ? 'grid gap-10 xl:grid-cols-[minmax(0,820px)_240px] xl:justify-center print:block' : 'w-full'}>
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
              <div className="article-body">
                {sections.map((sec, i) => (
                  <ArticleSection
                    key={i}
                    section={sec}
                    id={sectionIds[i]}
                    open={!collapsed.has(i)}
                    onToggle={() => toggleSection(i)}
                    highlight={i === takeawayIdx}
                    components={markdownComponents}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 text-sm">文章正文暂不可用。</div>
            )}
          </div>

          {SHOW_TOC && (
          <aside className="hidden xl:block print:hidden">
            <div className="article-support-panel sticky top-4 w-60 space-y-6 self-start">
              {takeaway && (
                <div className="border border-brand/30 dark:border-brand-light/30 bg-brand-subtle/70 dark:bg-brand/10 p-4 shadow-card">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand dark:text-brand-light mb-2">本期要点</h2>
                  <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{takeaway}</p>
                </div>
              )}

              <div className="border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#1C1A14] p-4 shadow-card">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">目录</h2>
                {renderTocItems()}
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
          )}
        </div>

        {!SHOW_TOC && relatedArticles.length > 0 && (
          <div className="mt-10 border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#1C1A14] p-5 shadow-card">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">相关文章</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedArticles.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/article/${item.id}`)}
                  className="block w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand-light transition-colors leading-relaxed border border-gray-100 dark:border-gray-800 p-3 hover:border-brand/30"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        )}

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
