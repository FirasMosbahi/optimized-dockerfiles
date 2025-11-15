# -------------------------------------------------------
#  Multi-Stage Build: Builder Stage
#    - Reduces final image size
#    - Removes dev dependencies
#    - Improves CI/CD caching
# -------------------------------------------------------
FROM node:20-alpine AS builder

# Use WORKDIR early (cached)
WORKDIR /app

# Layer Caching
# Copy only package* first so npm install is cached unless deps change
COPY package*.json ./

# Install dependencies (use ci for reproducibility)
RUN npm ci --include=dev

# Copy the rest of the source code (last layer → faster caching)
COPY . .

# Build the React/Vite app
RUN npm run build



# -------------------------------------------------------
#  Final Stage — Optimized Nginx Server
#    - Serves static files efficiently
#    - Small attack surface
#    - Production-grade caching
# -------------------------------------------------------
FROM nginx:1.27-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your optimized Nginx configuration
COPY nginx-config/app.conf /etc/nginx/conf.d/default.conf

# Copy only the optimized production build
COPY --from=builder /app/dist /usr/share/nginx/html

# -------------------------------------------------------
# Expose Ports Explicitly
# Helps readability & k8s ingress controllers
# -------------------------------------------------------
EXPOSE 80

# -------------------------------------------------------
# Add Healthcheck (for Docker + Kubernetes)
# Ensures container restart on failure
# -------------------------------------------------------
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost || exit 1

# -------------------------------------------------------
# Metadata (optional but good practice)
# -------------------------------------------------------
LABEL maintainer="Firas Mosbahi"
LABEL description="Optimized production-ready Docker image for a Vite/React application served via Nginx."

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
