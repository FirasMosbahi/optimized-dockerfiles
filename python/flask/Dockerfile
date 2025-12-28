# Dockerfile (optimized)
# ---- Build Stage ----
FROM python:3.14-slim AS builder

# Set workdir
WORKDIR /app

# Install Poetry and export plugin
RUN pip install --no-cache-dir poetry poetry-plugin-export

# Copy only dependency files first (for caching)
COPY pyproject.toml poetry.lock* ./

# Export dependencies to requirements.txt and install
RUN poetry export -f requirements.txt --without-hashes --only main -o requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code
COPY src ./src

# ---- Runtime Stage ----
FROM python:3.14-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.14/site-packages /usr/local/lib/python3.14/site-packages

# Copy source code
COPY --from=builder /app/src ./src

# Copy gunicorn binary from builder
COPY --from=builder /usr/local/bin/gunicorn /usr/local/bin/gunicorn

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=flask_demo.wsgi:app
ENV FLASK_ENV=production

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/health')" || exit 1

# Run Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--timeout", "60", "flask_demo.wsgi:app"]
