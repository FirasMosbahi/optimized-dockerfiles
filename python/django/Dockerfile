# Dockerfile (optimized)
# ---- Build Stage ----
FROM python:3.14-slim AS builder

# Set workdir
WORKDIR /app

# Install Poetry
RUN pip install --no-cache-dir poetry

# Copy only dependency files first (for caching)
COPY pyproject.toml poetry.lock* ./

# Export dependencies to requirements.txt and install
RUN poetry export -f requirements.txt --without-hashes -o requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code
COPY src ./src

# Collect static files (Django requirement)
RUN cd src && python manage.py collectstatic --noinput

# ---- Runtime Stage ----
FROM python:3.14-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.14/site-packages /usr/local/lib/python3.14/site-packages

# Copy source code and static files
COPY --from=builder /app/src ./src

# Copy gunicorn binary from builder
COPY --from=builder /usr/local/bin/gunicorn /usr/local/bin/gunicorn

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=django_demo.settings
ENV PYTHONPATH=/app/src

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health/')" || exit 1

# Run migrations and start Gunicorn
CMD cd src && python manage.py migrate --noinput && \
    gunicorn --bind 0.0.0.0:8000 --workers 4 --timeout 60 --chdir /app/src django_demo.wsgi:application
