// Article bodies as Markdown, loaded via Vite import.meta.glob
// Each file src/content/article-{id}.md maps to article {id}
// This module provides a synchronous lookup map after initial resolution.

const mdModules = import.meta.glob('/src/content/*.md', { query: '?raw', import: 'default', eager: true });

const bodyMap = {};

for (const [path, content] of Object.entries(mdModules)) {
  const match = path.match(/article-(\d+)\.md$/);
  if (match) {
    bodyMap[Number(match[1])] = content;
  }
}

export function getArticleBody(id) {
  return bodyMap[id] || null;
}

export function hasArticleBody(id) {
  return id in bodyMap;
}
