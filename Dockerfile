# ==============================================================================
# Stage 1: Build Stage (Node.js 22 Alpine)
# ==============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install security patches
RUN apk update && apk upgrade --no-cache

# Deterministic package install
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

# Copy application source & config
COPY tsconfig.json vitest.config.mts postcss.config.mjs next.config.ts next-env.d.ts ./
COPY src ./src
COPY public ./public

ENV NODE_ENV=production

# Compile static export to /app/out
RUN npm run build

# ==============================================================================
# Stage 2: Hardened Unprivileged Production Stage (Nginx Alpine)
# ==============================================================================
FROM nginxinc/nginx-unprivileged:alpine-slim AS runner

# Default unprivileged user UID 101 (nginx) is already active in base image
USER nginx

# Copy custom hardened Nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static export from builder
COPY --from=builder --chown=nginx:nginx /app/out /usr/share/nginx/html

# Expose unprivileged HTTP port
EXPOSE 8080

# Healthcheck to monitor web server liveness
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
