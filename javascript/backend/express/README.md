# Express.js Docker Optimization

Production-ready Express.js REST API with optimized Docker setup using multi-stage builds, Alpine images, and security best practices.

## 🎯 Overview

This example demonstrates Docker optimization techniques for Express.js applications, comparing an optimized multi-stage build against a basic single-stage build.

## 📊 Image Size Comparison

| Build Type | Image Size | Reduction |
|------------|------------|-----------|
| **Optimized** (multi-stage) | ~70 MB | ✅ Baseline |
| **Basic** (single-stage) | ~450 MB | ❌ 6.4x larger |

## 🏗️ Architecture

### Optimized Dockerfile (Multi-Stage Build)

**Stage 1: Builder**
- Base: `node:20-alpine`
- Installs production dependencies only (`npm ci --only=production`)
- Excludes devDependencies

**Stage 2: Runtime**
- Base: `node:20-alpine` (fresh, clean image)
- Copies only production dependencies
- Copies application code
- Runs as non-root user
- Health check enabled

### Key Optimizations

1. **Multi-stage build** - Separates dependency installation from runtime
2. **Alpine Linux** - Minimal base image (~5 MB vs ~350 MB full Node image)
3. **Production-only deps** - No devDependencies in final image
4. **Non-root user** - Security best practice
5. **Layer caching** - Dependencies cached separately from code
6. **Health checks** - Container health monitoring

## 🚀 Quick Start

### Build Optimized Image

```bash
docker build -t express-demo:optimized -f Dockerfile .
```

### Build Basic Image (for comparison)

```bash
docker build -t express-demo:basic -f Dockerfile.basic .
```

### Run Container

```bash
docker run -p 3000:3000 express-demo:optimized
```

### Test Endpoints

```bash
# Health check
curl http://localhost:3000/health

# Root endpoint
curl http://localhost:3000/

# Get all users
curl http://localhost:3000/api/users

# Get user by ID
curl http://localhost:3000/api/users/1

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "email": "john.smith@example.com"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1
```

## 📁 Project Structure

```
express/
├── Dockerfile              # Optimized multi-stage build
├── Dockerfile.basic        # Non-optimized single-stage build
├── package.json            # Dependencies and scripts
├── .dockerignore           # Files excluded from Docker build
├── .gitignore              # Files excluded from Git
└── src/
    ├── index.js            # Main application entry point
    └── routes/
        └── users.js        # User CRUD routes
```

## 🔧 Features

### Middleware
- **Helmet** - Security headers
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP request logging
- **Express JSON** - JSON body parsing

### API Endpoints
- `GET /` - API information
- `GET /health` - Health check endpoint
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Security Features
- ✅ Runs as non-root user
- ✅ Helmet security headers
- ✅ CORS enabled
- ✅ Input validation
- ✅ Error handling
- ✅ Minimal attack surface (Alpine)

## 🧪 Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

## 📦 Production Deployment

The optimized image is production-ready with:

- ✅ Node.js 20 (LTS)
- ✅ Alpine Linux base
- ✅ Non-root user execution
- ✅ Health check endpoint
- ✅ Production dependencies only
- ✅ Security headers (Helmet)
- ✅ Request logging (Morgan)
- ✅ CORS support

### Docker Compose Example

```yaml
version: '3.8'
services:
  express-api:
    image: express-demo:optimized
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health')"]
      interval: 30s
      timeout: 3s
      retries: 3
    restart: unless-stopped
```

## 🎓 Learning Points

1. **Multi-stage builds** reduce image size by 85%
2. **Alpine images** provide minimal, secure base
3. **npm ci** is faster and more reliable than npm install
4. **Non-root users** improve security posture
5. **Health checks** enable better orchestration
6. **Production-only deps** minimize attack surface

## 📈 Performance Comparison

| Metric | Optimized | Basic |
|--------|-----------|-------|
| Image Size | ~70 MB | ~450 MB |
| Build Time | ~30s | ~40s |
| Layers | 6 | 8 |
| Security | ✅ Non-root | ❌ Root |
| Production Ready | ✅ Yes | ❌ No (dev mode) |

## 🔗 Related Examples

- [Fastify Example](../fastify/) - High-performance alternative
- [NestJS Example](../nestjs/) - Enterprise TypeScript framework
- [Next.js Example](../nextjs/) - React with SSR

---

Built with ❤️ by [Firas Mosbahi](https://github.com/firasmosbahi)
