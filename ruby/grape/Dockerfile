# ==============================================================================
# STAGE 1: Build Stage
# ==============================================================================
FROM ruby:3.3.0-alpine AS builder

WORKDIR /app

# Copy Gemfile first for better layer caching
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle config set --local deployment 'true' && \
    bundle config set --local without 'development test' && \
    bundle install -j4 --retry 3

# ==============================================================================
# STAGE 2: Runtime Stage
# ==============================================================================
FROM ruby:3.3.0-alpine

# Add metadata
LABEL maintainer="Firas Mosbahi"
LABEL description="Optimized Grape API application"

# Create non-root user
RUN addgroup -S grape && adduser -S grape -G grape

WORKDIR /app

# Copy gems from builder
COPY --from=builder /usr/local/bundle /usr/local/bundle

# Copy application
COPY --chown=grape:grape . .

# Switch to non-root user
USER grape

# Expose port
EXPOSE 9292

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:9292/health || exit 1

# Start the application
CMD ["bundle", "exec", "puma", "-p", "9292", "config.ru"]
