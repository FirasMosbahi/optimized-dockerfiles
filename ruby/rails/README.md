# Ruby on Rails - Optimized Docker Example

Production-ready Docker configurations for **Ruby on Rails**, the full-stack web framework that emphasizes convention over configuration.

## Why Ruby on Rails?

- **Developer Productivity**: Convention over configuration philosophy
- **Batteries Included**: Everything needed for web development
- **Active Community**: Massive ecosystem of gems and libraries
- **Mature**: Battle-tested in production for 20+ years
- **API Mode**: Lightweight API-only applications
- **Scalable**: Powers GitHub, Shopify, Basecamp, and more

## File Structure

```
ruby/rails/
├── app/
│   └── controllers/
│       ├── application_controller.rb      # Base controller
│       └── api/
│           └── hello_controller.rb         # API endpoints
├── config/
│   ├── application.rb                      # Rails configuration
│   ├── boot.rb                             # Bootsnap setup
│   ├── environment.rb                      # Load Rails
│   ├── routes.rb                           # Route definitions
│   └── puma.rb                             # Puma server config
├── Gemfile                                 # Ruby dependencies
├── Gemfile.lock                            # Locked versions
├── config.ru                               # Rack configuration
├── Dockerfile                              # Optimized multi-stage build
├── Dockerfile.basic                        # Non-optimized comparison
├── .dockerignore                           # Build context exclusions
└── README.md                               # This file
```

## Application Endpoints

- `GET /api/hello` - Returns greeting message
- `GET /api/health` - Custom health check
- `GET /up` - Rails built-in health check

## Quick Start

### Build and Run Optimized Version

```bash
# Build the optimized image
docker build -t rails-demo:optimized -f Dockerfile .

# Run the container
docker run -p 3000:3000 rails-demo:optimized

# Test the application
curl http://localhost:3000/api/hello
curl http://localhost:3000/up
```

### Build and Run Basic Version

```bash
docker build -t rails-demo:basic -f Dockerfile.basic .
docker run -p 3000:3000 rails-demo:basic
```

## Architecture Comparison

### Optimized Dockerfile

**Multi-Stage Build:**
1. **Builder Stage**: Ruby 3.3 Alpine
   - Install build dependencies
   - Bundle install with deployment mode
   - Precompile bootsnap cache
   - Separate gems from application code

2. **Runtime Stage**: Ruby 3.3 Alpine
   - Copy bundled gems from builder
   - Copy application code
   - Non-root user execution
   - Minimal runtime dependencies

**Features:**
- Fast startup with bootsnap (~2-5s)
- Small image size (~150 MB)
- Puma multi-worker configuration
- Production-ready settings

### Basic Dockerfile

- Single-stage with full Ruby image
- No layer optimization
- Root user execution
- Larger image (~1.2 GB)

## Image Size Comparison

| Version    | Image Size | Gems Cached | Startup Time |
|------------|-----------|-------------|--------------|
| Optimized  | ~150 MB   | Yes         | 2-5s         |
| Basic      | ~1.2 GB   | No          | 5-10s        |
| **Savings** | **~88%**  | ✅          | **~50%**     |

## Key Rails Features Used

### API-Only Mode

Configured in `config/application.rb`:

```ruby
config.api_only = true
```

Benefits:
- Lighter weight than full Rails
- No view/asset pipeline overhead
- Perfect for JSON APIs

### Bootsnap

Precompiled boot cache for faster startup:

```ruby
require 'bootsnap/setup'
```

### Puma Configuration

Multi-worker, multi-threaded server:

```ruby
workers ENV.fetch('WEB_CONCURRENCY', 2)
threads_count = ENV.fetch('RAILS_MAX_THREADS', 5)
preload_app!
```

## Performance Characteristics

### Throughput
- **Concurrent workers**: 2 by default (configurable)
- **Threads per worker**: 5 by default
- **Request handling**: 10+ concurrent requests per worker

### Startup Time
- **With bootsnap**: 2-5 seconds
- **Without bootsnap**: 5-10 seconds
- **Production mode**: Eager loads all code

### Memory Usage
- **Base**: 50-100 MB per worker
- **Under load**: 100-200 MB per worker
- **Tunable**: via WEB_CONCURRENCY and RAILS_MAX_THREADS

## Production Optimizations

### Environment Variables

```bash
RAILS_ENV=production              # Production mode
RAILS_LOG_TO_STDOUT=1             # Log to stdout for Docker
RAILS_SERVE_STATIC_FILES=1        # Serve static files
WEB_CONCURRENCY=2                 # Number of Puma workers
RAILS_MAX_THREADS=5               # Threads per worker
```

### Puma Workers

Scale based on CPU cores:

```bash
docker run -e WEB_CONCURRENCY=4 rails-demo:optimized
```

### Health Checks

Rails 7.1+ includes built-in health check:

```ruby
get 'up', to: 'rails/health#show'
```

## Adding Database Support

Update `Gemfile`:

```ruby
gem 'pg'  # PostgreSQL
# or
gem 'mysql2'  # MySQL
```

Update Dockerfile build dependencies:

```dockerfile
RUN apk add --no-cache \
    build-base \
    postgresql-dev \  # or mysql-dev
    tzdata
```

## Common Gems to Add

```ruby
# Authentication
gem 'devise'
gem 'jwt'

# Authorization
gem 'pundit'

# API
gem 'jbuilder'
gem 'fast_jsonapi'

# Background jobs
gem 'sidekiq'

# Pagination
gem 'kaminari'

# CORS
gem 'rack-cors'
```

## Development Mode

Run locally:

```bash
bundle install
bundle exec rails server
```

With live reload and debugging enabled.

## Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rails-demo
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: rails
        image: username/rails-demo:optimized
        ports:
        - containerPort: 3000
        env:
        - name: RAILS_ENV
          value: "production"
        - name: WEB_CONCURRENCY
          value: "2"
        - name: RAILS_MAX_THREADS
          value: "5"
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /up
            port: 3000
          initialDelaySeconds: 10
        readinessProbe:
          httpGet:
            path: /up
            port: 3000
          initialDelaySeconds: 5
```

## Rails vs Other Frameworks

| Feature          | Rails          | Sinatra    | Hanami     |
|------------------|----------------|------------|------------|
| Learning Curve   | Moderate       | Easy       | Moderate   |
| Full Stack       | ✅ Yes         | ❌ No      | ✅ Yes     |
| Performance      | Good           | Excellent  | Excellent  |
| Image Size       | ~150 MB        | ~50 MB     | ~80 MB     |
| Use Case         | Full apps      | APIs       | Modern apps|
| Community        | Massive        | Large      | Growing    |

## Best Practices

1. **Use API mode** - Lighter weight for APIs
2. **Enable bootsnap** - Faster boot times
3. **Tune Puma workers** - Match CPU cores
4. **Deployment mode** - Bundle with `--deployment`
5. **Preload app** - Reduce memory with `preload_app!`
6. **Health checks** - Use `/up` endpoint
7. **Environment vars** - Configuration via ENV

## Scaling Strategies

### Horizontal Scaling

```bash
# Multiple containers with load balancer
docker-compose up --scale web=4
```

### Vertical Scaling

```bash
# More workers and threads
docker run -e WEB_CONCURRENCY=8 -e RAILS_MAX_THREADS=10 rails-demo
```

### With Redis/Sidekiq

```ruby
# Add to Gemfile
gem 'sidekiq'
gem 'redis'
```

## CI/CD Integration

Works with repository's GitHub Actions:
- Auto-builds on `ruby/rails/**` changes
- Pushes optimized and basic images
- Layer caching for faster builds

## Common Issues

### Slow Boot Time
- Enable bootsnap
- Check for autoloading issues
- Use production mode

### High Memory Usage
- Reduce worker count
- Adjust thread count
- Check for memory leaks

### Bundle Install Fails
- Ensure build dependencies installed
- Check Gemfile.lock platform
- Use `--deployment` flag

## References

- [Ruby on Rails Guides](https://guides.rubyonrails.org/)
- [Puma Configuration](https://github.com/puma/puma)
- [Bootsnap](https://github.com/Shopify/bootsnap)
- [Docker Best Practices for Ruby](https://docs.docker.com/language/ruby/)

---

Built for rapid development with production-grade deployments.
