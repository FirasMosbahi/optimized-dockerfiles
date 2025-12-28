# ASP.NET Core Web API - Optimized Docker Example

Production-ready Docker configurations for **ASP.NET Core**, Microsoft's cross-platform, high-performance framework for building modern web APIs.

## Why ASP.NET Core?

- **High Performance**: One of the fastest web frameworks
- **Cross-Platform**: Runs on Windows, Linux, and macOS
- **Built-in DI**: Dependency injection out of the box
- **Modern**: Async/await, middleware pipeline, unified MVC/API
- **Cloud-Ready**: Built for containers and microservices
- **Enterprise-Grade**: Used by Microsoft and Fortune 500 companies

## File Structure

```
dotnet/aspnet-core/
├── Controllers/
│   └── HelloController.cs       # API controller with endpoints
├── Properties/
├── Program.cs                    # Application entry point
├── appsettings.json             # Configuration
├── AspNetCoreDemo.csproj        # Project file
├── Dockerfile                    # Optimized multi-stage build
├── Dockerfile.basic             # Non-optimized comparison
├── .dockerignore                # Build context exclusions
└── README.md                    # This file
```

## Application Endpoints

- `GET /api/hello` - Returns greeting message
- `GET /api/health` - Custom health check
- `GET /health` - ASP.NET Core health check
- `GET /swagger` - Swagger/OpenAPI documentation (dev mode)

## Quick Start

### Build and Run Optimized Version

```bash
# Build the optimized image
docker build -t aspnetcore-demo:optimized -f Dockerfile .

# Run the container
docker run -p 8080:8080 aspnetcore-demo:optimized

# Test the application
curl http://localhost:8080/api/hello
curl http://localhost:8080/health
```

### Build and Run Basic Version

```bash
docker build -t aspnetcore-demo:basic -f Dockerfile.basic .
docker run -p 8080:8080 aspnetcore-demo:basic
```

## Architecture Comparison

### Optimized Dockerfile

**Multi-Stage Build:**
1. **Build Stage**: .NET SDK 8.0 Alpine
   - Restore NuGet packages (cached layer)
   - Build and publish in Release mode
   - Self-contained: false (uses runtime)

2. **Runtime Stage**: .NET ASP.NET 8.0 Alpine
   - Copy only published output
   - Non-root user execution
   - Minimal Alpine-based runtime
   - Health checks enabled

**Features:**
- Fast startup (~1-2s)
- Small image size (~110 MB)
- Production optimizations
- Security hardening

### Basic Dockerfile

- Single-stage with full SDK
- No layer optimization
- Root user execution
- Much larger image (~700 MB)

## Image Size Comparison

| Version    | Image Size | .NET Runtime | Startup Time |
|------------|-----------|--------------|--------------|
| Optimized  | ~110 MB   | ASP.NET 8.0  | 1-2s         |
| Basic      | ~700 MB   | SDK 8.0      | 2-4s         |
| **Savings** | **~84%**  | Optimized    | **~50%**     |

## Key ASP.NET Core Features

### Controllers

Clean MVC-style routing:

```csharp
[ApiController]
[Route("api")]
public class HelloController : ControllerBase
{
    [HttpGet("hello")]
    public IActionResult GetHello()
    {
        return Ok(new { message = "Hello!" });
    }
}
```

### Dependency Injection

Built-in IoC container:

```csharp
builder.Services.AddScoped<IMyService, MyService>();
```

### Middleware Pipeline

Configurable request processing:

```csharp
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
```

### Health Checks

Built-in health monitoring:

```csharp
builder.Services.AddHealthChecks();
app.MapHealthChecks("/health");
```

## Performance Characteristics

### Throughput
- **Excellent**: Top-tier web framework performance
- **Async**: Non-blocking I/O throughout
- **Scalable**: Handles thousands of requests/second

### Startup Time
- **Fast**: 1-2 seconds in containers
- **Ready to Start**: Built for cloud deployment
- **Optimized**: Ahead-of-time compilation available

### Memory Usage
- **Efficient**: 30-80 MB base
- **Tunable**: Configurable for different workloads
- **GC**: Modern garbage collector

## Production Optimizations

### Environment Variables

```bash
ASPNETCORE_URLS=http://+:8080            # Listen address
ASPNETCORE_ENVIRONMENT=Production         # Environment
DOTNET_RUNNING_IN_CONTAINER=true         # Container mode
DOTNET_EnableDiagnostics=0               # Disable diagnostics
```

### ReadyToRun Compilation

For even faster startup:

```xml
<PropertyGroup>
  <PublishReadyToRun>true</PublishReadyToRun>
</PropertyGroup>
```

### Trimming (Advanced)

Reduce size further:

```xml
<PropertyGroup>
  <PublishTrimmed>true</PublishTrimmed>
</PropertyGroup>
```

## Adding Features

### Database Support

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

### Authentication

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

### Caching

```bash
dotnet add package Microsoft.Extensions.Caching.StackExchangeRedis
```

### CORS

```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

app.UseCors();
```

## Development Mode

Run locally:

```bash
dotnet restore
dotnet run
```

With hot reload:

```bash
dotnet watch run
```

## Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aspnetcore-demo
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: aspnetcore
        image: username/aspnetcore-demo:optimized
        ports:
        - containerPort: 8080
        env:
        - name: ASPNETCORE_ENVIRONMENT
          value: "Production"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
```

## ASP.NET Core vs Other Frameworks

| Feature          | ASP.NET Core | Spring Boot | Express.js |
|------------------|--------------|-------------|------------|
| Startup Time     | 1-2s         | 10-30s      | <1s        |
| Performance      | Excellent    | Good        | Good       |
| Type Safety      | ✅ Strong    | ✅ Strong   | ❌ Weak    |
| Image Size       | ~110 MB      | ~200 MB     | ~100 MB    |
| Learning Curve   | Moderate     | Moderate    | Easy       |
| Enterprise Use   | ✅ Yes       | ✅ Yes      | Moderate   |

## Best Practices

1. **Use Alpine images** - Smaller size, faster downloads
2. **Multi-stage builds** - Separate build and runtime
3. **Layer caching** - Copy csproj before source code
4. **Health checks** - Enable for orchestration
5. **Non-root user** - Security hardening
6. **Environment config** - Use appsettings per environment
7. **Disable diagnostics** - In production containers

## Common Patterns

### API Versioning

```csharp
builder.Services.AddApiVersioning();

[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class UsersController : ControllerBase
```

### Model Validation

```csharp
public class CreateUserRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; }
}
```

### Exception Handling

```csharp
app.UseExceptionHandler("/error");
app.UseStatusCodePages();
```

## CI/CD Integration

Works with repository's GitHub Actions:
- Auto-builds on `dotnet/aspnet-core/**` changes
- Pushes optimized and basic images
- Layer caching for faster builds

## References

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [.NET Performance](https://devblogs.microsoft.com/dotnet/performance-improvements-in-net-8/)
- [Docker for .NET](https://docs.microsoft.com/dotnet/core/docker/introduction)
- [TechEmpower Benchmarks](https://www.techempower.com/benchmarks/)

---

Built for high-performance, enterprise-grade APIs.
