# Quarkus - Optimized Docker Example

Production-ready Docker configurations for **Quarkus**, the Kubernetes-native Java framework optimized for cloud deployments.

## Why Quarkus?

- **Supersonic Startup**: Boots in milliseconds (10-100x faster than traditional frameworks)
- **Low Memory**: Minimal memory footprint perfect for containers
- **GraalVM Ready**: Native compilation support for even faster startup
- **Developer Joy**: Live reload, unified configuration, and modern APIs
- **Cloud Native**: Built for Kubernetes, microservices, and serverless

## File Structure

```
java/quarkus/
├── src/main/
│   ├── java/com/example/
│   │   └── GreetingResource.java         # JAX-RS REST endpoint
│   └── resources/
│       └── application.properties        # Quarkus configuration
├── pom.xml                                # Maven dependencies
├── Dockerfile                             # Optimized multi-stage build
├── Dockerfile.basic                       # Non-optimized comparison
├── .dockerignore                          # Build context exclusions
└── README.md                              # This file
```

## Application Endpoints

- `GET /api/hello` - Returns greeting message with framework info
- `GET /api/health` - Custom health check
- `GET /health` - Quarkus SmallRye health endpoint

## Quick Start

### Build and Run Optimized Version

```bash
# Build the optimized image
docker build -t quarkus-demo:optimized -f Dockerfile .

# Run the container
docker run -p 8080:8080 quarkus-demo:optimized

# Test the application
curl http://localhost:8080/api/hello
curl http://localhost:8080/health
```

### Build and Run Basic Version

```bash
docker build -t quarkus-demo:basic -f Dockerfile.basic .
docker run -p 8080:8080 quarkus-demo:basic
```

## Architecture Comparison

### Optimized Dockerfile

**Multi-Stage Build:**
1. **Builder Stage**: Maven + Temurin 21 Alpine
   - Dependency layer caching
   - Builds Quarkus fast-jar
   - Separates dependencies from source

2. **Runtime Stage**: JRE 21 Alpine
   - Copies only the Quarkus app structure
   - Non-root user execution
   - Minimal base image
   - Health checks enabled

**Features:**
- Fast startup (~10s)
- Small image size (~180 MB)
- Container-optimized JVM settings
- Security hardening

### Basic Dockerfile

- Single-stage build with full JDK + Maven
- No layer optimization
- Root user execution
- Larger image (~600 MB)

## Image Size Comparison

| Version    | Image Size | Startup Time | Description                     |
|------------|-----------|--------------|----------------------------------|
| Optimized  | ~180 MB   | ~10s         | Multi-stage, Alpine, optimized  |
| Basic      | ~600 MB   | ~15s         | Single-stage, full toolchain    |
| **Savings** | **~70%**  | **~33%**     | Significant improvements        |

## Quarkus Fast-Jar Structure

The optimized Dockerfile properly handles Quarkus's fast-jar structure:

```
target/quarkus-app/
├── app/                    # Application classes
├── lib/                    # Dependencies
├── quarkus/                # Quarkus runtime
└── quarkus-run.jar         # Launcher
```

This structure enables:
- Faster startup
- Better layer caching
- Efficient memory usage

## Performance Characteristics

### Startup Times
- **JVM Mode**: 1-3 seconds
- **Native Mode** (with GraalVM): 0.01-0.1 seconds

### Memory Usage
- **JVM Mode**: 50-200 MB
- **Native Mode**: 20-50 MB

### First Response Time
- **JVM Mode**: Immediate after startup
- **Traditional Spring Boot**: 10-30 seconds

## Building Native Image (Advanced)

For even better performance, build a native image:

```dockerfile
# Add to Dockerfile for native build
FROM quay.io/quarkus/ubi-quarkus-native-image:22.3-java21 AS builder
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn package -Pnative -DskipTests

FROM registry.access.redhat.com/ubi8/ubi-minimal:8.9
WORKDIR /app
COPY --from=builder /build/target/*-runner /app/application
EXPOSE 8080
CMD ["./application"]
```

**Native Image Benefits:**
- Startup in milliseconds
- Minimal memory footprint (15-30 MB)
- No JVM overhead
- Perfect for serverless

## CI/CD Integration

Works seamlessly with the repository's GitHub Actions:
- Auto-builds on changes to `java/quarkus/**`
- Pushes optimized and basic images
- Layer caching for faster rebuilds

## Development Mode

Run locally with hot reload:

```bash
mvn quarkus:dev
```

Features:
- Live reload on code changes
- Dev UI at http://localhost:8080/q/dev
- Continuous testing
- Fast feedback loop

## Extensions Used

```xml
<!-- RESTEasy Reactive for high-performance REST -->
quarkus-resteasy-reactive-jackson

<!-- SmallRye Health for Kubernetes health checks -->
quarkus-smallrye-health

<!-- CDI for dependency injection -->
quarkus-arc
```

## Adding More Extensions

```bash
# Add database support
./mvnw quarkus:add-extension -Dextensions="jdbc-postgresql,hibernate-orm-panache"

# Add Redis
./mvnw quarkus:add-extension -Dextensions="redis-client"

# Add Kafka
./mvnw quarkus:add-extension -Dextensions="kafka"

# Add OpenAPI/Swagger
./mvnw quarkus:add-extension -Dextensions="smallrye-openapi"
```

## Best Practices

1. **Fast-jar packaging** - Use Quarkus fast-jar (default in 3.x)
2. **Layer caching** - Copy pom.xml before source code
3. **Health checks** - Use SmallRye Health for Kubernetes
4. **Minimal base** - Alpine or UBI minimal for production
5. **Native compilation** - Consider for production workloads
6. **Configuration** - Use environment variables for deployment

## Kubernetes Deployment

Quarkus generates Kubernetes manifests automatically:

```bash
mvn package -Dquarkus.kubernetes.deploy=true
```

Or use the optimized Docker image:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: quarkus-demo
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: quarkus
        image: username/quarkus-demo:optimized
        ports:
        - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /health/live
            port: 8080
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 8080
```

## Comparison with Spring Boot

| Feature           | Quarkus      | Spring Boot   |
|-------------------|--------------|---------------|
| Startup Time      | 1-3s         | 10-30s        |
| Memory (RSS)      | 50-200 MB    | 200-500 MB    |
| First Response    | Immediate    | After warmup  |
| Native Support    | Excellent    | Experimental  |
| Learning Curve    | Moderate     | Easy          |

## References

- [Quarkus Documentation](https://quarkus.io/)
- [Quarkus Extensions](https://quarkus.io/extensions/)
- [GraalVM Native Image](https://www.graalvm.org/latest/reference-manual/native-image/)
- [SmallRye Health](https://smallrye.io/docs/smallrye-health/index.html)

---

Optimized for cloud-native deployments and Kubernetes environments.
