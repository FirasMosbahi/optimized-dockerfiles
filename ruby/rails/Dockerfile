# ==============================================================================
# STAGE 1: Build Stage
# ==============================================================================
FROM ruby:3.3.0-alpine AS builder

# Install build dependencies
RUN apk add --no-cache \
    build-base \
    postgresql-dev \
    tzdata

WORKDIR /app

# Copy Gemfile first for better layer caching
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle config set --local deployment 'true' && \
    bundle config set --local without 'development test' && \
    bundle install -j4 --retry 3

# Copy application code
COPY . .

# Precompile bootsnap cache for faster boot times
RUN bundle exec bootsnap precompile --gemfile app/ config/

# ==============================================================================
# STAGE 2: Runtime Stage
# ==============================================================================
FROM ruby:3.3.0-alpine

# Add metadata
LABEL maintainer="Firas Mosbahi"
LABEL description="Optimized Ruby on Rails application"

# Install runtime dependencies
RUN apk add --no-cache \
    postgresql-client \
    tzdata

# Create non-root user
RUN addgroup -S rails && adduser -S rails -G rails

WORKDIR /app

# Copy gems from builder
COPY --from=builder /usr/local/bundle /usr/local/bundle

# Copy application from builder
COPY --from=builder --chown=rails:rails /app /app

# Switch to non-root user
USER rails

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/up || exit 1

# Set environment
ENV RAILS_ENV=production \
    RAILS_LOG_TO_STDOUT=1 \
    RAILS_SERVE_STATIC_FILES=1

# Start Puma server
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
