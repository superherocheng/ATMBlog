# ─── Stage 1: Build ────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js ./
COPY src/ src/

RUN npm run build

# ─── Stage 2: Serve with Nginx ────────────────────────────
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN { \
    echo 'server {'; \
    echo '    listen 80;'; \
    echo '    server_name _;'; \
    echo '    root /usr/share/nginx/html;'; \
    echo '    index index.html;'; \
    echo '    '; \
    echo '    # Gzip compression'; \
    echo '    gzip on;'; \
    echo '    gzip_vary on;'; \
    echo '    gzip_proxied any;'; \
    echo '    gzip_comp_level 5;'; \
    echo '    gzip_min_length 256;'; \
    echo '    gzip_types'; \
    echo '        text/plain'; \
    echo '        text/css'; \
    echo '        application/json'; \
    echo '        application/javascript'; \
    echo '        text/xml;'; \
    echo '    '; \
    echo '    # SPA fallback - no cache for HTML'; \
    echo '    location / {'; \
    echo '        try_files $uri $uri/ /index.html;'; \
    echo '        expires -1;'; \
    echo '        add_header Cache-Control "no-store, no-cache, must-revalidate";'; \
    echo '    }'; \
    echo '    '; \
    echo '    # JS/CSS - cache forever (hash-based filenames from Vite)'; \
    echo '    location /assets/ {'; \
    echo '        expires 1y;'; \
    echo '        add_header Cache-Control "public, immutable";'; \
    echo '    }'; \
    echo '}'; \
    } > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]