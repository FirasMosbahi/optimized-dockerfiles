# Micronaut - Optimized Docker Example

Production-ready Docker configurations for **Micronaut**, the modern JVM framework with compile-time dependency injection and minimal memory footprint.

## Why Micronaut?

- **Compile-time DI**: No reflection, fast startup
- **Low Memory**: Minimal memory footprint (30-50% less than Spring)
- **Fast Startup**: Starts in seconds, not minutes
- **Cloud Native**: Built for microservices and serverless
- **GraalVM Ready**: Excellent native image support
- **Reactive**: Non-blocking I/O with Netty

## File Structure

```
java/micronaut/
├── src/main/
│   ├── java/com/example/
│   │   ├── Application.java           # Main application
│   │   └── HelloController.java       # REST controller
│   └── resources/
│       ├── application.yml             # Configuration
│       └── logback.xml                 # Logging config
├── pom.xml                             # Maven dependencies
├── Dockerfile                          # Optimized multi-stage build
├── Dockerfile.basic                    # Non-optimized comparison
├── .dockerignore                       # Build context exclusions
└── README.md                           # This file
```

## Application Endpoints

- `GET /api/hello` - Returns greeting message
- `GET /api/health` - Custom health check
- `GET /health` - Micronaut management health endpoint

## Quick Start

### Build and Run Optimized Version

```bash
# Build the optimized image
docker build -t micronaut-demo:optimized -f Dockerfile .

# Run the container
docker run -p 8080:8080 micronaut-demo:optimized

# Test the application
curl http://localhost:8080/api/hello
curl http://localhost:8080/health
```

### Build and Run Basic Version

```bash
docker build -t micronaut-demo:basic -f Dockerfile.basic .
docker run -p 8080:8080 micronaut-demo:basic
```

## Architecture Comparison

### Optimized Dockerfile

**Multi-Stage Build:**
1. **Builder Stage**: Maven + Temurin 21 Alpine
   - Dependency layer caching
   - Builds shaded JAR
   - Separates dependencies from source

2. **Runtime Stage**: JRE 21 Alpine
   - Single JAR deployment
   - Non-root user execution
   - Minimal base image
   - Health checks enabled

**Features:**
- Fast startup (~2-4s)
- Low memory usage (50-150 MB)
- Small image size (~190 MB)
- Container-optimized

### Basic Dockerfile

- Single-stage with full JDK + Maven
- No layer optimization
- Root user execution
- Larger image (~600 MB)

## Image Size Comparison

| Version    | Image Size | Memory Usage | Startup Time |
|------------|-----------|--------------|--------------|
| Optimized  | ~190 MB   | 50-150 MB    | 2-4s         |
| Basic      | ~600 MB   | 200-300 MB   | 5-8s         |
| **Savings** | **~68%**  | **~50%**     | **~50%**     |

## Key Micronaut Features

### 1. Compile-Time Dependency Injection

No reflection = faster startup and lower memory:

```java
@Controller("/api")
public class HelloController {
    // DI resolved at compile time
}
```

### 2. Reactive HTTP Server

Built on Netty for high performance:

```yaml
micronaut:
  server:
    netty:
      max-request-size: 10MB
```

### 3. Management Endpoints

Built-in health checks and metrics:

```yaml
endpoints:
  health:
    enabled: true
```

## Performance Characteristics

### Startup Time
- **JVM Mode**: 2-4 seconds
- **Native Mode**: 0.01-0.05 seconds

### Memory Usage
- **JVM Mode**: 50-150 MB RSS
- **Native Mode**: 20-40 MB RSS
- **vs Spring Boot**: 30-50% less memory

### Throughput
- Non-blocking I/O with Netty
- Excellent for microservices
- Efficient connection pooling

## Building Native Image

For even better performance:

```dockerfile
FROM ghcr.io/graalvm/native-image:ol9-java21 AS builder
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn package -Dpackaging=native-image -DskipTests

FROM gcr.io/distroless/base
COPY --from=builder /build/target/micronaut-demo /app/application
EXPOSE 8080
ENTRYPOINT ["/app/application"]
```

**Native Image Benefits:**
- 20-40 MB memory usage
- Sub-second startup
- Instant peak performance
- No JVM overhead

## Development Mode

Run locally with hot reload:

```bash
mvn mn:run
```

Features:
- Fast recompilation
- Automatic restart
- Development-time DI validation

## Common Micronaut Modules

Add to `pom.xml`:

```xml
<!-- Data Access -->
<dependency>
    <groupId>io.micronaut.data</groupId>
    <artifactId>micronaut-data-jdbc</artifactId>
</dependency>

<!-- Security -->
<dependency>
    <groupId>io.micronaut.security</groupId>
    <artifactId>micronaut-security-jwt</artifactId>
</dependency>

<!-- Service Discovery -->
<dependency>
    <groupId>io.micronaut.discovery</groupId>
    <artifactId>micronaut-discovery-client</artifactId>
</dependency>

<!-- Kafka -->
<dependency>
    <groupId>io.micronaut.kafka</groupId>
    <artifactId>micronaut-kafka</artifactId>
</dependency>
```

## Configuration Profiles

Micronaut supports environment-specific configs:

```yaml
# application.yml
micronaut:
  application:
    name: micronaut-demo
---
# Development
micronaut:
  environments: dev
  server:
    port: 8081
---
# Production
micronaut:
  environments: prod
  server:
    port: 8080
```

## Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: micronaut-demo
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: micronaut
        image: username/micronaut-demo:optimized
        ports:
        - containerPort: 8080
        env:
        - name: MICRONAUT_ENVIRONMENTS
          value: "prod"
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

## Micronaut vs Other Frameworks

| Feature              | Micronaut    | Quarkus      | Spring Boot  |
|----------------------|--------------|--------------|--------------|
| Startup Time         | 2-4s         | 1-3s         | 10-30s       |
| Memory (RSS)         | 50-150 MB    | 50-200 MB    | 200-500 MB   |
| DI Resolution        | Compile-time | Build-time   | Runtime      |
| Native Image Support | Excellent    | Excellent    | Experimental |
| Learning Curve       | Moderate     | Moderate     | Easy         |
| Ecosystem            | Growing      | Growing      | Mature       |

## Best Practices

1. **Use compile-time DI** - Leverage Micronaut's strength
2. **Layer caching** - Copy pom.xml before source
3. **Reactive programming** - Use reactive types for I/O
4. **Configuration** - Use YAML for complex configs
5. **Health checks** - Enable management endpoints
6. **Native compilation** - Consider for production

## CI/CD Integration

Works with repository's GitHub Actions:
- Auto-builds on `java/micronaut/**` changes
- Pushes optimized and basic images
- Layer caching for fast builds

## References

- [Micronaut Documentation](https://micronaut.io/)
- [Micronaut Guides](https://guides.micronaut.io/)
- [Micronaut Data](https://micronaut-projects.github.io/micronaut-data/latest/guide/)
- [GraalVM Native Image](https://www.graalvm.org/latest/reference-manual/native-image/)

---

Built for cloud-native microservices with minimal resource footprint.
