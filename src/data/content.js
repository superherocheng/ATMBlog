// Article bodies as Markdown, loaded via Vite import.meta.glob
// Each file src/content/article-{id}.md maps to article {id}
// This module provides a synchronous lookup map after initial resolution.

const mdModules = import.meta.glob('/src/content/*.md', { query: '?raw', import: 'default' });

export async function getArticleBody(id) {
  const getter = mdModules[`/src/content/article-${id}.md`];
  if (!getter) return null;
  return await getter();
}
