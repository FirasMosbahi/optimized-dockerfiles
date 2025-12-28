# -------------------------------------------------------
# 1) Build Angular SSR (browser + server)
# -------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# -------------------------------------------------------
# 2) Runtime: Node for SSR + Nginx for static assets
# -------------------------------------------------------

# Base image containing Nginx AND Node (Alpine)
FROM node:20-alpine AS runtime
RUN apk add --no-cache nginx

WORKDIR /app

# Copy SSR server bundle
COPY --from=builder /app/dist/angular/server /app/server

# Copy static browser files to Nginx root
COPY --from=builder /app/dist/angular/browser /usr/share/nginx/html

# Copy Nginx config
COPY nginx-config/app.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost/ || exit 1

# Start Nginx + Node
CMD nginx && node /app/server/main.server.mjs