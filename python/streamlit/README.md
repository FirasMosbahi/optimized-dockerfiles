# Streamlit Docker Optimization

Production-ready Streamlit data application with optimized Docker setup using multi-stage builds and minimal base images.

## 🎯 Overview

This example demonstrates Docker optimization techniques for Streamlit applications, comparing an optimized multi-stage build against a basic single-stage build.

## 📊 Image Size Comparison

| Build Type | Image Size | Reduction |
|------------|------------|-----------|
| **Optimized** (multi-stage) | ~250 MB | ✅ Baseline |
| **Basic** (single-stage) | ~600 MB | ❌ 2.4x larger |

## 🏗️ Architecture

### Optimized Dockerfile (Multi-Stage Build)

**Stage 1: Builder**
- Base: `python:3.14-slim`
- Installs Poetry for dependency management
- Exports dependencies to `requirements.txt`
- Installs Python packages (Streamlit, Pandas, Plotly)
- Copies source code and configuration

**Stage 2: Runtime**
- Base: `python:3.14-slim` (fresh, clean image)
- Copies only installed packages from builder
- Copies source code and Streamlit config
- Runs Streamlit server on port 8501
- Health check using Streamlit's built-in endpoint

### Key Optimizations

1. **Multi-stage build** - Separates build dependencies from runtime
2. **Poetry export** - Converts Poetry dependencies to requirements.txt for faster installs
3. **Slim base image** - Uses minimal Python image (~45 MB vs ~350 MB full image)
4. **No Poetry in production** - Only pip-installed packages in final image
5. **Streamlit health check** - Built-in `/_stcore/health` endpoint
6. **Layer caching** - Dependencies installed before source code copy
7. **Minimal runtime** - Only essential packages in final image

## 🚀 Quick Start

### Build Optimized Image

```bash
docker build -t streamlit-demo:optimized -f Dockerfile .
```

### Build Basic Image (for comparison)

```bash
docker build -t streamlit-demo:basic -f Dockerfile.basic .
```

### Run Container

```bash
docker run -p 8501:8501 streamlit-demo:optimized
```

### Access Application

Open your browser and navigate to:
```
http://localhost:8501
```

### Test Health Endpoint

```bash
curl http://localhost:8501/_stcore/health
```

## 📁 Project Structure

```
streamlit/
├── Dockerfile              # Optimized multi-stage build
├── Dockerfile.basic        # Non-optimized single-stage build
├── pyproject.toml          # Poetry dependencies
├── poetry.lock             # Locked dependencies
├── .dockerignore           # Files excluded from Docker build
├── .gitignore              # Files excluded from Git
├── .streamlit/
│   └── config.toml         # Streamlit configuration
├── src/
│   └── streamlit_demo/
│       ├── __init__.py
│       ├── app.py          # Main application (Home page)
│       ├── pages/
│       │   ├── 1_About.py  # About page
│       │   └── 2_Health.py # Health status page
│       └── utils/
│           ├── __init__.py
│           └── config.py   # Configuration utilities
└── tests/                  # Test directory
```

## 🎨 Features

### Main Dashboard (Home)
- Interactive data visualization
- Real-time metric updates
- Multiple chart types (Line, Bar, Scatter, Area)
- Configurable data points
- Data download as CSV

### About Page
- Application overview
- Technology stack information
- Docker optimization details

### Health Page
- System status monitoring
- Python and Streamlit version info
- Health check results

## 🔧 Configuration

### Environment Variables

Can be set via `.env` file or Docker environment:

```env
APP_NAME=Streamlit Demo
DEBUG=False
PORT=8501
HOST=0.0.0.0
```

### Streamlit Config

Located in `.streamlit/config.toml`:

```toml
[server]
port = 8501
enableCORS = false
enableXsrfProtection = true
maxUploadSize = 200

[browser]
gatherUsageStats = false
```

## 🧪 Development

### Install Dependencies

```bash
poetry install
```

### Run Development Server

```bash
cd src
poetry run streamlit run streamlit_demo/app.py
```

### Run Tests

```bash
poetry run pytest
```

## 📦 Production Deployment

The optimized image is production-ready with:

- ✅ Streamlit server on port 8501
- ✅ Health check endpoint (`/_stcore/health`)
- ✅ Multi-page support
- ✅ Interactive visualizations (Plotly)
- ✅ Data processing (Pandas)
- ✅ Minimal attack surface (slim image)
- ✅ No development dependencies
- ✅ Proper configuration management
- ✅ CORS and XSRF protection

### Docker Compose Example

```yaml
version: '3.8'
services:
  streamlit-app:
    image: streamlit-demo:optimized
    ports:
      - "8501:8501"
    environment:
      - APP_NAME=Streamlit Production
      - DEBUG=False
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8501/_stcore/health"]
      interval: 30s
      timeout: 3s
      retries: 3
    restart: unless-stopped
```

## 🎓 Learning Points

1. **Multi-stage builds** drastically reduce image size (60% reduction)
2. **Streamlit health checks** use built-in `/_stcore/health` endpoint
3. **Multi-page apps** organized with `pages/` directory
4. **Plotly integration** provides interactive visualizations
5. **Pandas caching** with `@st.cache_data` improves performance
6. **Configuration** separated from code using `.streamlit/config.toml`
7. **Layer caching** speeds up rebuilds when code changes

## 📈 Performance Comparison

| Metric | Optimized | Basic |
|--------|-----------|-------|
| Image Size | ~250 MB | ~600 MB |
| Build Time | ~80s | ~90s |
| Layers | 9 | 13 |
| Startup Time | ~3s | ~5s |
| Production Ready | ✅ Yes | ❌ No (Poetry overhead) |

## 🌟 Use Cases

Streamlit is perfect for:

- **Data Dashboards**: Real-time analytics and KPI tracking
- **ML Model Demos**: Interactive model interfaces
- **Data Exploration**: Quick data analysis and visualization
- **Internal Tools**: Admin panels and data management
- **Prototypes**: Rapid application development

## 🔗 Related Examples

- [Flask Example](../flask/) - Lightweight Python web framework
- [FastAPI Example](../fastapi/) - Modern async Python API framework
- [Django Example](../django/) - Full-featured web framework

---

Built with ❤️ by [Firas Mosbahi](https://github.com/firasmosbahi)
