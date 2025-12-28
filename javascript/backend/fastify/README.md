# Fastify Docker Optimization

Production-ready Fastify REST API with optimized Docker setup, schema validation, and high-performance configuration.

## 🎯 Overview

This example demonstrates Docker optimization techniques for Fastify applications - a high-performance Node.js framework that's up to 2x faster than Express.

## 📊 Image Size Comparison

| Build Type | Image Size | Reduction |
|------------|------------|-----------|
| **Optimized** (multi-stage) | ~75 MB | ✅ Baseline |
| **Basic** (single-stage) | ~450 MB | ❌ 6x larger |

## 🏗️ Architecture

### Optimized Dockerfile (Multi-Stage Build)

**Stage 1: Builder**
- Base: `node:20-alpine`
- Installs production dependencies only
- Uses `npm ci` for reproducible builds

**Stage 2: Runtime**
- Base: `node:20-alpine` (fresh, clean image)
- Copies only production dependencies
- Copies application code
- Runs as non-root user
- Built-in logging and health checks

### Key Optimizations

1. **Multi-stage build** - Separates dependency installation from runtime
2. **Alpine Linux** - Minimal base image (~5 MB vs ~350 MB)
3. **Production-only deps** - No devDependencies
4. **Non-root user** - Enhanced security
5. **Schema validation** - Built-in JSON Schema validation
6. **Logging** - Fastify's high-performance logger

## 🚀 Quick Start

### Build Optimized Image

```bash
docker build -t fastify-demo:optimized -f Dockerfile .
```

### Build Basic Image (for comparison)

```bash
docker build -t fastify-demo:basic -f Dockerfile.basic .
```

### Run Container

```bash
docker run -p 3000:3000 fastify-demo:optimized
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

# Create user (with validation)
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
fastify/
├── Dockerfile              # Optimized multi-stage build
├── Dockerfile.basic        # Non-optimized single-stage build
├── package.json            # Dependencies and scripts
├── .dockerignore           # Files excluded from Docker build
├── .gitignore              # Files excluded from Git
└── src/
    ├── index.js            # Main application entry point
    ├── routes/
    │   └── users.js        # User CRUD routes
    └── schemas/
        └── user.js         # JSON Schema definitions
```

## 🔧 Features

### Built-in Features
- **Schema Validation** - Automatic request/response validation
- **High Performance** - 2x faster than Express
- **Built-in Logging** - Pino logger (fastest JSON logger)
- **Type Safety** - TypeScript-friendly
- **Plugin System** - Extensible architecture

### Plugins Used
- **@fastify/helmet** - Security headers
- **@fastify/cors** - Cross-Origin Resource Sharing

### API Endpoints
- `GET /` - API information
- `GET /health` - Health check endpoint
- `GET /api/users` - List all users (with schema)
- `GET /api/users/:id` - Get user by ID (validated params)
- `POST /api/users` - Create new user (validated body)
- `PUT /api/users/:id` - Update user (validated)
- `DELETE /api/users/:id` - Delete user

### Schema Validation Example

```javascript
// Automatic validation of request body
fastify.post('/', {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' }
      },
      required: ['name', 'email']
    },
    response: {
      201: userSchema
    }
  }
}, handler);
```

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
- ✅ Built-in schema validation
- ✅ High-performance logging (Pino)
- ✅ Security headers (Helmet)

### Docker Compose Example

```yaml
version: '3.8'
services:
  fastify-api:
    image: fastify-demo:optimized
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - LOG_LEVEL=info
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health')"]
      interval: 30s
      timeout: 3s
      retries: 3
    restart: unless-stopped
```

## 🎓 Learning Points

1. **Fastify is 2x faster** than Express with similar API
2. **Schema validation** prevents invalid data automatically
3. **Built-in logging** with Pino (10x faster than Winston)
4. **Plugin architecture** makes code modular and testable
5. **TypeScript support** out of the box
6. **Multi-stage builds** reduce image size by 83%

## 📈 Performance Comparison

### Image Size
| Metric | Optimized | Basic |
|--------|-----------|-------|
| Image Size | ~75 MB | ~450 MB |
| Build Time | ~30s | ~40s |
| Layers | 6 | 8 |
| Security | ✅ Non-root | ❌ Root |

### Request Performance (vs Express)
- **Throughput**: ~2x higher requests/second
- **Latency**: ~50% lower response time
- **Memory**: More efficient memory usage

## 🔗 Related Examples

- [Express Example](../express/) - Traditional Node.js framework
- [NestJS Example](../nestjs/) - Enterprise TypeScript framework
- [Next.js Example](../nextjs/) - React with SSR

---

Built with ❤️ by [Firas Mosbahi](https://github.com/firasmosbahi)
