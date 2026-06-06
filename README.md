# ATM Blog

A clean, wiki-inspired blog built with React 19, Vite 6, and Tailwind CSS v4.

## Features

- **Home** — featured article spotlight with introduction box
- **Articles** — full article listing with search, tags, and read time
- **Timeline** — chronological timeline grouped by year, with scroll-triggered fade-in animations
- **Article Detail** — full content view with Markdown rendering, Back navigation, and SEO meta tags
- **Websites** — curated external links collection
- **Dark Mode** — toggleable dark theme, system-preference-aware, persisted in localStorage, with full dark styling
- **Responsive** — desktop sidebar & right sidebar, tablet top nav, mobile slide-out menu
- **Code Splitting** — per-page lazy loading with React.lazy + Suspense
- **SEO** — per-page `<title>` and `<meta>` via react-helmet-async, with Open Graph tags on article detail
- **Accessibility** — skip-to-content link, `aria-current` on navigation, `aria-label` on interactive elements, `prefers-reduced-motion` support
- **Typography** — Playfair Display (headings), Inter (body), JetBrains Mono (code/monospace)
- **Markdown Content** — articles stored as Markdown files and rendered with react-markdown, no `dangerouslySetInnerHTML`
- **Smooth transitions** — cross-view fade animation, IntersectionObserver-based scroll reveals
- **Error Boundary** — per-app error boundary prevents total whiteout on component crash

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker

```bash
# Build and run
docker compose up -d --build

# Visit http://localhost:8080
```

### VPS Deployment

```bash
# 1. Clone the repo
git clone https://github.com/superherocheng/ATMBlog.git
cd ATMBlog

# 2. Build
npm install && npm run build

# 3. Serve with Node
npx serve dist -l 3000

# With PM2 for process management:
npm install -g pm2
pm2 start "npx serve dist -l 3000" --name atmblog
```

The build output (`dist/`) is a set of static files. Serve them with any HTTP server.

## Tech Stack

- **React 19** — component-based UI, with lazy-loaded page chunks
- **Vite 6** — fast dev server and optimized production builds
- **Tailwind CSS v4** — utility-first CSS with custom wiki theme
- **React Router** — declarative routing with URL-based navigation and deep linking
- **React Markdown** — safe Markdown rendering with remark-gfm
- **react-helmet-async** — per-page SEO and meta tags
