FROM nginx:alpine

# Copy static site to nginx html directory
COPY index.html /usr/share/nginx/html/index.html

# Custom nginx config for SPA and caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
