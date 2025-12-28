# Django Docker Optimization

Production-ready Django application with Django REST Framework, optimized Docker setup using multi-stage builds, Gunicorn WSGI server, and minimal base images.

## 🎯 Overview

This example demonstrates Docker optimization techniques for Django applications, comparing an optimized multi-stage build against a basic single-stage build.

## 📊 Image Size Comparison

| Build Type | Image Size | Reduction |
|------------|------------|-----------|
| **Optimized** (multi-stage) | ~150 MB | ✅ Baseline |
| **Basic** (single-stage) | ~500 MB | ❌ 3.3x larger |

## 🏗️ Architecture

### Optimized Dockerfile (Multi-Stage Build)

**Stage 1: Builder**
- Base: `python:3.14-slim`
- Installs Poetry for dependency management
- Exports dependencies to `requirements.txt`
- Installs Python packages
- Copies source code
- Collects Django static files

**Stage 2: Runtime**
- Base: `python:3.14-slim` (fresh, clean image)
- Copies only installed packages from builder
- Copies source code and static files
- Runs with Gunicorn (production WSGI server)
- 4 workers for handling concurrent requests
- Auto-runs migrations on startup
- Health check endpoint monitoring

### Key Optimizations

1. **Multi-stage build** - Separates build dependencies from runtime
2. **Poetry export** - Converts Poetry dependencies to requirements.txt for faster installs
3. **Slim base image** - Uses minimal Python image (~45 MB vs ~350 MB full image)
4. **No Poetry in production** - Only pip-installed packages in final image
5. **Gunicorn WSGI server** - Production-grade server (vs Django dev server)
6. **Layer caching** - Dependencies installed before source code copy
7. **Static files collection** - Pre-collected in build stage

## 🚀 Quick Start

### Build Optimized Image

```bash
docker build -t django-demo:optimized -f Dockerfile .
```

### Build Basic Image (for comparison)

```bash
docker build -t django-demo:basic -f Dockerfile.basic .
```

### Run Container

```bash
docker run -p 8000:8000 django-demo:optimized
```

### Test Endpoints

```bash
# Health check
curl http://localhost:8000/health/

# Root endpoint
curl http://localhost:8000/

# List users (DRF endpoint)
curl http://localhost:8000/api/users/

# Create user
curl -X POST http://localhost:8000/api/users/ \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'

# Get specific user
curl http://localhost:8000/api/users/1/

# Update user
curl -X PUT http://localhost:8000/api/users/1/ \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "email": "john@example.com", "age": 31}'

# Delete user
curl -X DELETE http://localhost:8000/api/users/1/
```

### Access Django Admin

```bash
# Create superuser (exec into running container)
docker exec -it <container-id> python src/manage.py createsuperuser

# Then visit http://localhost:8000/admin/
```

## 📁 Project Structure

```
django/
├── Dockerfile              # Optimized multi-stage build
├── Dockerfile.basic        # Non-optimized single-stage build
├── pyproject.toml          # Poetry dependencies
├── poetry.lock             # Locked dependencies
├── .dockerignore           # Files excluded from Docker build
├── .gitignore              # Files excluded from Git
├── src/
│   ├── manage.py           # Django management command
│   ├── django_demo/        # Django project settings
│   │   ├── __init__.py
│   │   ├── settings.py     # Project configuration
│   │   ├── urls.py         # URL routing
│   │   ├── wsgi.py         # WSGI entry point
│   │   └── asgi.py         # ASGI entry point
│   └── api/                # Django REST Framework app
│       ├── __init__.py
│       ├── apps.py         # App configuration
│       ├── models.py       # Database models
│       ├── serializers.py  # DRF serializers
│       ├── views.py        # API views
│       ├── urls.py         # API URL routing
│       └── admin.py        # Django admin config
└── tests/                  # Test directory
```

## 🔧 Configuration

Environment variables can be set via `.env` file or Docker environment:

```env
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

## 🧪 Development

### Install Dependencies

```bash
poetry install
```

### Run Migrations

```bash
cd src
poetry run python manage.py migrate
```

### Create Superuser

```bash
cd src
poetry run python manage.py createsuperuser
```

### Run Development Server

```bash
cd src
poetry run python manage.py runserver
```

### Run Tests

```bash
poetry run pytest
```

## 📦 Production Deployment

The optimized image is production-ready with:

- ✅ Gunicorn WSGI server (4 workers)
- ✅ Django REST Framework for API endpoints
- ✅ Health check endpoint (`/health/`)
- ✅ Auto-migration on startup
- ✅ Static files pre-collected
- ✅ Minimal attack surface (slim image)
- ✅ No development dependencies
- ✅ Proper signal handling
- ✅ CORS headers support
- ✅ Admin interface

### Docker Compose Example

```yaml
version: '3.8'
services:
  django-app:
    image: django-demo:optimized
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
      - SECRET_KEY=${SECRET_KEY}
      - ALLOWED_HOSTS=*
    volumes:
      - ./data:/app/src/db.sqlite3
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health/"]
      interval: 30s
      timeout: 3s
      retries: 3
```

## 🎓 Learning Points

1. **Multi-stage builds** drastically reduce image size
2. **Django static files** should be collected in build stage
3. **Gunicorn** is essential for production Django apps
4. **Auto-migrations** on container startup ensure DB schema is up-to-date
5. **Django REST Framework** provides powerful API capabilities
6. **Health checks** enable better orchestration
7. **Layer caching** speeds up rebuilds when code changes

## 📈 Performance Comparison

| Metric | Optimized | Basic |
|--------|-----------|-------|
| Image Size | ~150 MB | ~500 MB |
| Build Time | ~90s | ~100s |
| Layers | 10 | 14 |
| Production Ready | ✅ Yes | ❌ No (dev server) |

## 🔗 Related Examples

- [Flask Example](../flask/) - Lightweight Python web framework
- [FastAPI Example](../fastapi/) - Modern async Python API framework
- [Next.js Example](../nextjs/) - React with SSR

---

Built with ❤️ by [Firas Mosbahi](https://github.com/firasmosbahi)
