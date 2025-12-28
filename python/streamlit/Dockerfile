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
COPY .streamlit ./.streamlit

# ---- Runtime Stage ----
FROM python:3.14-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.14/site-packages /usr/local/lib/python3.14/site-packages

# Copy streamlit binary from builder
COPY --from=builder /usr/local/bin/streamlit /usr/local/bin/streamlit

# Copy source code and config
COPY --from=builder /app/src ./src
COPY --from=builder /app/.streamlit ./.streamlit

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV STREAMLIT_SERVER_PORT=8501
ENV STREAMLIT_SERVER_ADDRESS=0.0.0.0

# Expose port
EXPOSE 8501

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8501/_stcore/health')" || exit 1

# Run Streamlit
CMD ["streamlit", "run", "src/streamlit_demo/app.py", "--server.port=8501", "--server.address=0.0.0.0"]
