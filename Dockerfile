# ─── Stage 1: Build ────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js ./
COPY src/ src/
COPY public/ public/

RUN npm run build

# ─── Stage 2: Serve ────────────────────────────────────────
# Lightweight static file server with SPA fallback (no Nginx).
FROM node:22-alpine AS runner

WORKDIR /app

RUN npm install -g serve@14

COPY --from=builder /app/dist ./dist

EXPOSE 8080

# `-s` enables single-page-app mode (rewrites unknown routes to index.html)
CMD ["serve", "-s", "dist", "-l", "8080"]
