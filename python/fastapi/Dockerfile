# Dockerfile (optimized)
# ---- Build Stage ----
FROM python:3.14-slim AS builder

# Set workdir
WORKDIR /app

# Install Poetry
RUN pip install --no-cache-dir poetry

# Copy only dependency files first (for caching)
COPY pyproject.toml poetry.lock ./

# Install dependencies
RUN poetry export -f requirements.txt --without-hashes -o requirements.txt
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

# Expose port
EXPOSE 8000

# Run Uvicorn
CMD ["uvicorn", "fastapi_demo.main:app", "--host", "0.0.0.0", "--port", "8000"]
