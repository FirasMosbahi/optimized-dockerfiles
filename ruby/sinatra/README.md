# Sinatra - Optimized Docker Example

Production-ready Docker configurations for **Sinatra**, the lightweight Ruby DSL for quickly creating web applications with minimal effort.

## Why Sinatra?

- **Lightweight**: Minimal framework, maximum flexibility
- **Fast**: Quick startup and low overhead
- **Simple**: Easy to learn, minimal DSL
- **Flexible**: Build exactly what you need
- **Perfect for APIs**: Ideal for microservices and REST APIs
- **Rack-based**: Compatible with all Rack middleware

## File Structure

```
ruby/sinatra/
├── app.rb                    # Main application with routes
├── config.ru                 # Rack configuration
├── config/
│   └── puma.rb              # Puma server configuration
├── Gemfile                   # Ruby dependencies
├── Gemfile.lock             # Locked versions
├── Dockerfile               # Optimized multi-stage build
├── Dockerfile.basic         # Non-optimized comparison
├── .dockerignore            # Build context exclusions
└── README.md                # This file
```

## Application Endpoints

- `GET /` - API information and available endpoints
- `GET /api/hello` - Returns greeting message
- `GET /api/health` - Custom health check
- `GET /health` - Health check endpoint

## Quick Start

### Build and Run Optimized Version

```bash
# Build the optimized image
docker build -t sinatra-demo:optimized -f Dockerfile .

# Run the container
docker run -p 4567:4567 sinatra-demo:optimized

# Test the application
curl http://localhost:4567/api/hello
curl http://localhost:4567/health
```

### Build and Run Basic Version

```bash
docker build -t sinatra-demo:basic -f Dockerfile.basic .
docker run -p 4567:4567 sinatra-demo:basic
```

## Architecture Comparison

### Optimized Dockerfile

**Multi-Stage Build:**
1. **Builder Stage**: Ruby 3.3 Alpine
   - Bundle install in deployment mode
   - Separate gem installation

2. **Runtime Stage**: Ruby 3.3 Alpine
   - Copy bundled gems
   - Copy application code
   - Non-root user execution
   - Minimal image size

**Features:**
- Sub-second startup
- Tiny image size (~50 MB)
- Puma for production
- Production-ready configuration

### Basic Dockerfile

- Single-stage with full Ruby image
- No optimization
- Root user execution
- Much larger image (~1 GB)

## Image Size Comparison

| Version    | Image Size | Startup Time | Description                |
|------------|-----------|--------------|----------------------------|
| Optimized  | ~50 MB    | <1s          | Multi-stage, Alpine, Puma  |
| Basic      | ~1 GB     | 2-3s         | Single-stage, WEBrick      |
| **Savings** | **~95%**  | **~70%**     | Massive size reduction     |

## Key Sinatra Features

### Minimal DSL

Simple route definitions:

```ruby
get '/hello' do
  'Hello World!'
end

post '/create' do
  # Handle POST request
end
```

### JSON Responses

```ruby
get '/api/data' do
  content_type :json
  { message: 'Hello' }.to_json
end
```

### Before Filters

```ruby
before do
  content_type :json
end
```

### Route Parameters

```ruby
get '/users/:id' do
  "User #{params['id']}"
end
```

## Performance Characteristics

### Startup Time
- **Sinatra**: <1 second
- **Rails**: 2-5 seconds
- **Advantage**: 5-10x faster

### Memory Usage
- **Base**: 20-40 MB
- **Under load**: 40-80 MB
- **Much lighter**: vs Rails (100-200 MB)

### Throughput
- **Excellent**: Low overhead
- **Scalable**: Multi-worker Puma
- **Efficient**: For simple APIs

## Production Configuration

### Puma Server

Configured in `config/puma.rb`:

```ruby
workers ENV.fetch('WEB_CONCURRENCY', 2)
threads ENV.fetch('PUMA_THREADS', 5)
preload_app!
```

### Environment Variables

```bash
RACK_ENV=production           # Production mode
WEB_CONCURRENCY=2             # Number of workers
PUMA_THREADS=5                # Threads per worker
PORT=4567                     # Server port
```

## Adding Middleware

Sinatra supports all Rack middleware:

```ruby
require 'rack/cors'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post]
  end
end
```

## Common Extensions

Update `Gemfile`:

```ruby
# Database
gem 'sequel'
gem 'pg'

# Authentication
gem 'bcrypt'

# Environment variables
gem 'dotenv'

# JSON
gem 'oj'  # Fast JSON

# Validation
gem 'dry-validation'

# Testing
gem 'rspec', group: :test
gem 'rack-test', group: :test
```

## Advanced Features

### Helpers

```ruby
helpers do
  def authenticated?
    session[:user_id]
  end
end

get '/admin' do
  halt 403 unless authenticated?
  'Admin area'
end
```

### Error Handling

```ruby
not_found do
  content_type :json
  { error: 'Not found' }.to_json
end

error do
  content_type :json
  { error: 'Server error' }.to_json
end
```

### Sessions

```ruby
enable :sessions

post '/login' do
  session[:user] = params['username']
end
```

## Development Mode

Run locally:

```bash
bundle install
ruby app.rb
```

Or with auto-reload:

```bash
gem install rerun
rerun ruby app.rb
```

## Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sinatra-demo
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: sinatra
        image: username/sinatra-demo:optimized
        ports:
        - containerPort: 4567
        env:
        - name: RACK_ENV
          value: "production"
        - name: WEB_CONCURRENCY
          value: "2"
        resources:
          requests:
            memory: "64Mi"
            cpu: "100m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 4567
          initialDelaySeconds: 5
        readinessProbe:
          httpGet:
            path: /health
            port: 4567
          initialDelaySeconds: 3
```

## Sinatra vs Other Frameworks

| Feature        | Sinatra    | Rails      | Grape      |
|----------------|------------|------------|------------|
| Startup Time   | <1s        | 2-5s       | 1-2s       |
| Memory Usage   | 20-40 MB   | 100-200 MB | 40-80 MB   |
| Image Size     | ~50 MB     | ~150 MB    | ~60 MB     |
| Learning Curve | Easy       | Moderate   | Easy       |
| Full Stack     | ❌ No      | ✅ Yes     | ❌ No      |
| Use Case       | Simple APIs| Full apps  | REST APIs  |

## Best Practices

1. **Use Puma** - Production-grade server
2. **Enable preload** - Reduce memory with workers
3. **JSON responses** - Set content type consistently
4. **Error handling** - Define error and not_found blocks
5. **Middleware** - Use Rack middleware for cross-cutting concerns
6. **Helpers** - Extract common logic to helpers
7. **Environment config** - Use ENV vars for configuration

## Common Use Cases

### REST API

```ruby
get '/api/items' do
  content_type :json
  Item.all.to_json
end

post '/api/items' do
  item = Item.create(params)
  status 201
  item.to_json
end
```

### Webhook Handler

```ruby
post '/webhooks/github' do
  payload = JSON.parse(request.body.read)
  # Process webhook
  status 200
end
```

### Proxy/Gateway

```ruby
get '/proxy/*' do
  url = params['splat'].first
  redirect url
end
```

## Scaling Strategies

### Horizontal Scaling

```bash
docker-compose up --scale web=5
```

### Vertical Scaling

```bash
docker run -e WEB_CONCURRENCY=4 sinatra-demo
```

## CI/CD Integration

Works with repository's GitHub Actions:
- Auto-builds on `ruby/sinatra/**` changes
- Pushes optimized and basic images
- Layer caching for faster builds

## Troubleshooting

### Port Already in Use
```bash
# Change port
docker run -p 8080:4567 sinatra-demo
```

### Slow Responses
- Increase Puma threads
- Add workers
- Check for blocking I/O

## References

- [Sinatra Documentation](http://sinatrarb.com/)
- [Sinatra Recipes](http://recipes.sinatrarb.com/)
- [Rack Documentation](https://github.com/rack/rack)
- [Puma Server](https://github.com/puma/puma)

---

Perfect for lightweight APIs and microservices.
