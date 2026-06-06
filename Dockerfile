# ─── Stage 1: Build ────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js ./
COPY src/ src/

RUN npm run build

# ─── Stage 2: Serve with Vite preview ─────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN npm install --omit=dev && npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
