# Flask Docker Optimization

Production-ready Flask application with optimized Docker setup using multi-stage builds, Gunicorn WSGI server, and minimal base images.

## 🎯 Overview

This example demonstrates Docker optimization techniques for Flask applications, comparing an optimized multi-stage build against a basic single-stage build.

## 📊 Image Size Comparison

| Build Type | Image Size | Reduction |
|------------|------------|-----------|
| **Optimized** (multi-stage) | ~80 MB | ✅ Baseline |
| **Basic** (single-stage) | ~400 MB | ❌ 5x larger |

## 🏗️ Architecture

### Optimized Dockerfile (Multi-Stage Build)

**Stage 1: Builder**
- Base: `python:3.14-slim`
- Installs Poetry for dependency management
- Exports dependencies to `requirements.txt`
- Installs Python packages
- Copies source code

**Stage 2: Runtime**
- Base: `python:3.14-slim` (fresh, clean image)
- Copies only installed packages from builder
- Copies source code
- Runs with Gunicorn (production WSGI server)
- 4 workers for handling concurrent requests
- Health check endpoint monitoring

### Key Optimizations

1. **Multi-stage build** - Separates build dependencies from runtime
2. **Poetry export** - Converts Poetry dependencies to requirements.txt for faster installs
3. **Slim base image** - Uses minimal Python image (~45 MB vs ~350 MB full image)
4. **No Poetry in production** - Only pip-installed packages in final image
5. **Gunicorn WSGI server** - Production-grade server (vs Flask dev server)
6. **Layer caching** - Dependencies installed before source code copy

## 🚀 Quick Start

### Build Optimized Image

```bash
docker build -t flask-demo:optimized -f Dockerfile .
```

### Build Basic Image (for comparison)

```bash
docker build -t flask-demo:basic -f Dockerfile.basic .
```

### Run Container

```bash
docker run -p 5000:5000 flask-demo:optimized
```

### Test Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Root endpoint
curl http://localhost:5000/

# Create user
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

## 📁 Project Structure

```
flask/
├── Dockerfile              # Optimized multi-stage build
├── Dockerfile.basic        # Non-optimized single-stage build
├── pyproject.toml          # Poetry dependencies
├── poetry.lock             # Locked dependencies
├── .dockerignore           # Files excluded from Docker build
├── .gitignore              # Files excluded from Git
├── src/
│   └── flask_demo/
│       ├── __init__.py     # App factory
│       ├── wsgi.py         # WSGI entry point
│       ├── api/
│       │   ├── __init__.py
│       │   └── routes.py   # API endpoints
│       ├── core/
│       │   ├── __init__.py
│       │   └── config.py   # App configuration
│       └── models/
│           ├── __init__.py
│           └── user.py     # User model
└── tests/                  # Test directory
```

## 🔧 Configuration

Environment variables can be set via `.env` file or Docker environment:

```env
APP_NAME=Flask Demo
DEBUG=False
SECRET_KEY=your-secret-key-here
```

## 🧪 Development

### Install Dependencies

```bash
poetry install
```

### Run Development Server

```bash
poetry run flask --app flask_demo.wsgi:app run --debug
```

### Run Tests

```bash
poetry run pytest
```

## 📦 Production Deployment

The optimized image is production-ready with:

- ✅ Gunicorn WSGI server (4 workers)
- ✅ Health check endpoint (`/health`)
- ✅ Minimal attack surface (slim image)
- ✅ No development dependencies
- ✅ Proper signal handling
- ✅ Production environment variables

### Docker Compose Example

```yaml
version: '3.8'
services:
  flask-app:
    image: flask-demo:optimized
    ports:
      - "5000:5000"
    environment:
      - APP_NAME=Flask Production
      - DEBUG=False
      - SECRET_KEY=${SECRET_KEY}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 3s
      retries: 3
```

## 🎓 Learning Points

1. **Multi-stage builds** drastically reduce image size
2. **Poetry vs pip** - Use Poetry for dev, pip for production installs
3. **Gunicorn** is essential for production Flask apps
4. **Health checks** enable better orchestration (Kubernetes, Docker Swarm)
5. **Layer caching** speeds up rebuilds when code changes

## 📈 Performance Comparison

| Metric | Optimized | Basic |
|--------|-----------|-------|
| Image Size | ~80 MB | ~400 MB |
| Build Time | ~60s | ~70s |
| Layers | 8 | 12 |
| Production Ready | ✅ Yes | ❌ No (dev server) |

## 🔗 Related Examples

- [FastAPI Example](../fastapi/) - Modern async Python API framework
- [Django Example](../django/) - Full-featured web framework
- [Next.js Example](../nextjs/) - React with SSR

---

Built with ❤️ by [Firas Mosbahi](https://github.com/firasmosbahi)
