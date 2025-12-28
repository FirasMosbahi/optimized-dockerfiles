# -------------------------------------------------------
# 1️⃣ Build Stage — SvelteKit SSR build
# -------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Install only dependencies (better caching)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the SvelteKit SSR app
RUN npm run build


# -------------------------------------------------------
# 2️⃣ Runtime Stage — Minimal Node server
# -------------------------------------------------------
FROM node:20-alpine

# Add tini for proper signal handling
RUN apk add --no-cache tini

WORKDIR /app

# Copy only the built output + node_modules for production
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Set proper permissions
RUN adduser -D appuser
USER appuser

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "build/index.js"]
