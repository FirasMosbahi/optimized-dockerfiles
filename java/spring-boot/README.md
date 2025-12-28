# Spring Boot - Optimized Docker Example

This directory contains production-ready, optimized Docker configurations for a **Spring Boot** application.

## Purpose

Demonstrate best practices for containerizing Spring Boot applications using:
- Multi-stage builds for minimal image size
- JRE-only runtime (no build tools in production)
- Layer caching optimization with Maven
- Non-root user execution for security
- Health checks and JVM tuning
- Comparison between optimized and basic approaches

## File Structure

```
java/spring-boot/
├── src/
│   └── main/
│       ├── java/com/example/demo/
│       │   ├── DemoApplication.java       # Main Spring Boot application
│       │   └── controller/
│       │       └── HelloController.java   # REST API endpoints
│       └── resources/
│           └── application.properties     # Application configuration
├── pom.xml                                # Maven dependencies
├── Dockerfile                             # Optimized multi-stage build
├── Dockerfile.basic                       # Non-optimized single-stage build
├── .dockerignore                          # Excluded files from build context
└── README.md                              # This file
```

## Application Overview

Simple Spring Boot REST API with the following endpoints:

- `GET /api/hello` - Returns a greeting message with timestamp
- `GET /api/health` - Health check endpoint
- `GET /actuator/health` - Spring Boot Actuator health endpoint

## Quick Start

### Build and Run Optimized Version

```bash
# Build the optimized image
docker build -t spring-boot-demo:optimized -f Dockerfile .

# Run the container
docker run -p 8080:8080 spring-boot-demo:optimized

# Test the application
curl http://localhost:8080/api/hello
curl http://localhost:8080/actuator/health
```

### Build and Run Basic Version (for comparison)

```bash
# Build the basic image
docker build -t spring-boot-demo:basic -f Dockerfile.basic .

# Run the container
docker run -p 8080:8080 spring-boot-demo:basic
```

## Architecture Comparison

### Optimized Dockerfile

**Multi-Stage Build:**
1. **Stage 1 (Builder)**: Uses `maven:3.9-eclipse-temurin-21-alpine`
   - Downloads dependencies separately for better caching
   - Builds the JAR file
   - Skips tests during build (run separately in CI/CD)

2. **Stage 2 (Runtime)**: Uses `eclipse-temurin:21-jre-alpine`
   - Only includes JRE (no JDK or Maven)
   - Copies only the compiled JAR
   - Runs as non-root user
   - Includes health check
   - Optimized JVM flags for containers

**Key Features:**
- Dependency layer caching (only rebuilds if `pom.xml` changes)
- Minimal runtime image (Alpine + JRE only)
- Non-root user (`spring:spring`)
- Container-aware JVM settings
- G1GC for better memory management
- Health check integration
- Security hardening

### Basic Dockerfile

**Single-Stage Build:**
- Uses full Maven + JDK image
- Copies all files at once
- No layer optimization
- Runs as root user
- No health checks
- Default JVM settings
- Larger final image size

## Image Size Comparison

| Version    | Image Size | Description                          |
|------------|-----------|--------------------------------------|
| Optimized  | ~200 MB   | Multi-stage, Alpine JRE, optimized   |
| Basic      | ~600 MB   | Single-stage, full JDK + Maven       |
| **Savings** | **~66%**  | Significant reduction in image size  |

## Performance Optimizations

### JVM Flags Explained

```bash
-XX:+UseContainerSupport        # Enable container memory limits awareness
-XX:MaxRAMPercentage=75.0       # Use up to 75% of container memory
-XX:+UseG1GC                    # Use G1 Garbage Collector (better for containers)
-XX:+UseStringDeduplication     # Reduce memory footprint by deduplicating strings
```

### Layer Caching Strategy

The optimized Dockerfile is structured to maximize Docker layer caching:

1. **Copy `pom.xml` first** - Dependencies only re-download if `pom.xml` changes
2. **Download dependencies** - Cached layer for Maven dependencies
3. **Copy source code** - Changes don't invalidate dependency cache
4. **Build application** - Only rebuilds when source changes

## Security Features

- **Non-root user**: Application runs as `spring` user (not `root`)
- **Minimal base image**: Alpine Linux reduces attack surface
- **JRE-only runtime**: No compilers or build tools in production image
- **No sensitive files**: `.dockerignore` excludes development files

## Health Checks

The optimized Dockerfile includes a health check that:
- Checks every 30 seconds
- Waits 40 seconds for application startup
- Calls the Spring Boot Actuator health endpoint
- Automatically restarts unhealthy containers

## Development vs Production

### For Development
Use Maven locally:
```bash
mvn spring-boot:run
```

### For Production
Use the optimized Docker image with:
- Environment-specific configurations
- External configuration management
- Proper logging
- Monitoring and observability
- Resource limits

## CI/CD Integration

This example is designed to work with the repository's GitHub Actions workflow:

- Automatically builds on changes to `java/spring-boot/**`
- Pushes both optimized and basic images to Docker Hub
- Uses layer caching for faster builds
- Tags images with commit SHA for traceability

## Best Practices Demonstrated

1. **Multi-stage builds** - Separate build and runtime environments
2. **Layer caching** - Optimize Dockerfile instruction order
3. **Minimal base images** - Use Alpine and JRE-only images
4. **Security hardening** - Non-root user, minimal attack surface
5. **Health checks** - Container orchestration compatibility
6. **JVM tuning** - Container-aware memory settings
7. **Build optimization** - Skip tests in Docker build (run in CI)
8. **Documentation** - Clear README with benchmarks

## Extending This Example

To add more features:

### Database Integration
Add PostgreSQL/MySQL dependencies to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Redis Caching
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### Monitoring with Prometheus
```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```

## Troubleshooting

### Out of Memory Errors
Adjust `MaxRAMPercentage` based on your container memory limits:
```bash
docker run -m 512m -e JAVA_OPTS="-XX:MaxRAMPercentage=70.0" spring-boot-demo:optimized
```

### Slow Startup
Increase health check `start-period` in Dockerfile:
```dockerfile
HEALTHCHECK --start-period=60s ...
```

### Build Cache Issues
Clear Maven cache in builder stage:
```bash
docker build --no-cache -t spring-boot-demo:optimized .
```

## References

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Eclipse Temurin](https://adoptium.net/)
- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [JVM in Containers](https://developers.redhat.com/blog/2017/03/14/java-inside-docker)

---

Made with care for production-grade DevOps practices.
