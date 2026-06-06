## Introduction

Containerizing a Vite + React application with Docker provides reproducible builds and consistent deployment across environments. This guide covers the complete setup from development to production.

## Multi-Stage Docker Build

A multi-stage Docker build separates the build environment from the runtime environment. The first stage installs dependencies and runs the build; the second stage copies only the built artifacts, resulting in a smaller final image.

### Build Stage

The build stage uses a Node.js image, installs production dependencies with `npm ci`, and runs `npm run build` to generate the static output in the `dist/` directory.

### Serve Stage

The serve stage uses a lightweight web server to serve the static files. For production, configure caching headers: aggressive caching for hashed assets (JS/CSS) and no-cache for HTML to support SPA routing.

## Docker Compose

Docker Compose simplifies local development with a single `docker compose up -d` command. Map container port 80 to a host port and configure restart policies for reliability.

## Conclusion

Containerizing a Vite + React application with Docker multi-stage builds produces efficient, production-ready deployments. The approach scales from local development to production with minimal changes.
