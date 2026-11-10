# ==============================================================================
# BugFence Web - Hardened Production Nginx Image
# Serves pre-compiled static export (/app/out) on port 8080.
# Run `npm run build` prior to `docker compose up -d --build`.
# ==============================================================================
FROM nginxinc/nginx-unprivileged:alpine-slim

# Default unprivileged user UID 101 (nginx) is active in base image
USER nginx

# Copy custom hardened Nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Copy statically exported website files
COPY --chown=nginx:nginx out /usr/share/nginx/html

# Expose unprivileged HTTP port
EXPOSE 8080

# Healthcheck to monitor web server liveness
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
