# ATM Blog

A clean, wiki-inspired blog built with plain HTML and Tailwind CSS.

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

- **HTML5** — single-page, no build step
- **Tailwind CSS** — via CDN
- **Nginx** (Docker) — static file serving with gzip and caching
