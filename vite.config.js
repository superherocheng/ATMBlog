import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { articles } from './src/data/articles.js';

// Emit /sitemap.xml at build time from src/data/articles.js, so new posts show
// up automatically with no hand-maintenance. `articles` is already the
// non-hidden set, so hidden IMAGE2 posts are excluded. No public/sitemap.xml
// (the plugin is the single source); dev doesn't need one.
function sitemapPlugin() {
  const DOMAIN = 'https://home.gaodeqingchuda.icu';
  return {
    name: 'atmblog-sitemap',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const routes = [
        { loc: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
        { loc: '/articles', lastmod: today, changefreq: 'weekly', priority: '0.9' },
        { loc: '/timeline', lastmod: today, changefreq: 'monthly', priority: '0.6' },
        ...articles.map((a) => ({
          loc: `/article/${a.id}`,
          lastmod: a.date,
          changefreq: 'monthly',
          priority: '0.8',
        })),
      ];
      const body = routes
        .map(
          (r) =>
            `  <url>\n    <loc>${DOMAIN}${r.loc}</loc>\n    <lastmod>${r.lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
        )
        .join('\n');
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          markdown: ['react-markdown', 'remark-gfm'],
        },
      },
    },
  },
});
