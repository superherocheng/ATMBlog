# ATM Blog

A clean, wiki-inspired blog built with React and Tailwind CSS — zero build step, runs entirely in the browser.

## Preview

![Screenshot](https://raw.githubusercontent.com/superherocheng/ATMBlog/main/screenshot.png)

## Features

- **Home** — featured article spotlight
- **Articles** — full article listing with tags and read time
- **Timeline** — chronological view of all posts
- **Websites** — curated external links collection
- **Article Detail** — full content view with back navigation
- **Responsive** — desktop sidebar, tablet top nav, mobile slide-out menu
- **Smooth transitions** — cross-view fade animation

## Quick Start

### Local Preview

Open `index.html` directly in your browser, or use any static file server:

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .
```

### Docker

```bash
# Build and run
docker compose up -d

# Visit http://localhost:8080
```

### VPS Deployment

```bash
# 1. Clone the repo
git clone https://github.com/superherocheng/ATMBlog.git
cd ATMBlog

# 2. Start the container
docker compose up -d --build

# 3. (Optional) Use a reverse proxy like Caddy or Nginx for HTTPS
```

For production, put the container behind a reverse proxy that handles TLS termination. Example Caddyfile:

```
yourdomain.com {
    reverse_proxy localhost:8080
}
```

## Tech Stack

- **React 18** — component-based UI, rendered via CDN with Babel standalone
- **Tailwind CSS** — utility-first styling via CDN
- **HTML5** — single-page, no build step
- **Nginx** (Docker) — static file serving with gzip and caching
