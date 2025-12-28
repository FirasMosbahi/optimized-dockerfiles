# Vert.x - Optimized Docker Example

Production-ready Docker configurations for **Vert.x**, the reactive toolkit for building high-performance, asynchronous applications on the JVM.

## Why Vert.x?

- **Reactive**: Event-driven, non-blocking I/O architecture
- **Polyglot**: Write in Java, Kotlin, Groovy, JavaScript, Ruby, or Ceylon
- **High Performance**: Handles thousands of concurrent connections efficiently
- **Lightweight**: Minimal overhead, fast startup
- **Event Bus**: Built-in distributed event bus for microservices
- **Versatile**: Build web apps, APIs, IoT, or real-time systems

## File Structure

```
java/vertx/
├── src/main/
│   ├── java/com/example/
│   │   └── MainVerticle.java          # Main verticle with HTTP server
│   └── resources/
│       └── logback.xml                 # Logging configuration
├── pom.xml                             # Maven dependencies
├── Dockerfile                          # Optimized multi-stage build
├── Dockerfile.basic                    # Non-optimized comparison
├── .dockerignore                       # Build context exclusions
└── README.md                           # This file
```

## Application Endpoints

- `GET /api/hello` - Returns greeting message
- `GET /api/health` - Custom health check
- `GET /health` - Vert.x health check handler

## Quick Start

### Build and Run Optimized Version

```bash
# Build the optimized image
docker build -t vertx-demo:optimized -f Dockerfile .

# Run the container
docker run -p 8080:8080 vertx-demo:optimized

# Test the application
curl http://localhost:8080/api/hello
curl http://localhost:8080/health
```

### Build and Run Basic Version

```bash
docker build -t vertx-demo:basic -f Dockerfile.basic .
docker run -p 8080:8080 vertx-demo:basic
```

## Architecture Comparison

### Optimized Dockerfile

**Multi-Stage Build:**
1. **Builder Stage**: Maven + Temurin 21 Alpine
   - Dependency layer caching
   - Builds fat JAR with all dependencies
   - Separates dependencies from source

2. **Runtime Stage**: JRE 21 Alpine
   - Single fat JAR deployment
   - Non-root user execution
   - Minimal base image
   - Health checks enabled

**Features:**
- Fast startup (~1-3s)
- Efficient event loop
- Small image size (~185 MB)
- Production-ready

### Basic Dockerfile

- Single-stage with full JDK + Maven
- No layer optimization
- Root user execution
- Larger image (~600 MB)

## Image Size Comparison

| Version    | Image Size | Startup Time | Concurrent Connections |
|------------|-----------|--------------|------------------------|
| Optimized  | ~185 MB   | 1-3s         | 10,000+                |
| Basic      | ~600 MB   | 4-6s         | 10,000+                |
| **Savings** | **~69%**  | **~60%**     | Same performance       |

## Key Vert.x Concepts

### 1. Verticles

Vert.x deployment units:

```java
public class MainVerticle extends AbstractVerticle {
    @Override
    public void start(Promise<Void> startPromise) {
        // Initialize your application
    }
}
```

### 2. Event Loop

Non-blocking event-driven architecture:
- Single-threaded event loops (one per CPU core)
- Never blocks the event loop
- Uses async I/O for all operations

### 3. Event Bus

Distributed messaging:

```java
vertx.eventBus().consumer("address", message -> {
    // Handle message
});

vertx.eventBus().send("address", "Hello");
```

### 4. Future/Promise

Asynchronous composition:

```java
Future<String> future = vertx.createHttpClient()
    .request(HttpMethod.GET, 80, "example.com", "/")
    .compose(req -> req.send()
        .compose(HttpClientResponse::body))
    .map(Buffer::toString);
```

## Performance Characteristics

### Throughput
- **High concurrency**: 10,000+ concurrent connections per instance
- **Low latency**: Sub-millisecond response times
- **Non-blocking**: Efficient resource utilization

### Resource Usage
- **Memory**: 50-200 MB depending on load
- **CPU**: Event loops map to CPU cores
- **Network**: Efficient Netty-based I/O

### Benchmarks
Vert.x often outperforms traditional frameworks in:
- WebSocket connections
- Server-sent events (SSE)
- High-throughput APIs
- Real-time applications

## Common Vert.x Modules

Add to `pom.xml`:

```xml
<!-- PostgreSQL client -->
<dependency>
    <groupId>io.vertx</groupId>
    <artifactId>vertx-pg-client</artifactId>
</dependency>

<!-- Redis client -->
<dependency>
    <groupId>io.vertx</groupId>
    <artifactId>vertx-redis-client</artifactId>
</dependency>

<!-- Kafka client -->
<dependency>
    <groupId>io.vertx</groupId>
    <artifactId>vertx-kafka-client</artifactId>
</dependency>

<!-- Web client -->
<dependency>
    <groupId>io.vertx</groupId>
    <artifactId>vertx-web-client</artifactId>
</dependency>

<!-- Service discovery -->
<dependency>
    <groupId>io.vertx</groupId>
    <artifactId>vertx-service-discovery</artifactId>
</dependency>
```

## Development Mode

Run locally:

```bash
# Using Maven
mvn compile exec:java

# Or build and run the fat JAR
mvn clean package
java -jar target/vertx-demo-fat.jar
```

## Deploying Multiple Instances

Scale verticles for better CPU utilization:

```java
DeploymentOptions options = new DeploymentOptions()
    .setInstances(Runtime.getRuntime().availableProcessors());

vertx.deployVerticle(MainVerticle.class.getName(), options);
```

Or use clustering:

```xml
<dependency>
    <groupId>io.vertx</groupId>
    <artifactId>vertx-hazelcast</artifactId>
</dependency>
```

```bash
java -jar app.jar -cluster
```

## Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vertx-demo
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: vertx
        image: username/vertx-demo:optimized
        ports:
        - containerPort: 8080
        env:
        - name: JAVA_OPTS
          value: "-XX:MaxRAMPercentage=75.0"
        resources:
          requests:
            memory: "128Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "1000m"
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

## Vert.x vs Other Frameworks

| Feature              | Vert.x       | Quarkus      | Spring Boot   |
|----------------------|--------------|--------------|---------------|
| Concurrency Model    | Event loop   | Reactive     | Thread pool   |
| Startup Time         | 1-3s         | 1-3s         | 10-30s        |
| Memory (RSS)         | 50-200 MB    | 50-200 MB    | 200-500 MB    |
| Async I/O            | Native       | Yes          | Optional      |
| WebSocket Support    | Excellent    | Good         | Good          |
| Learning Curve       | Moderate     | Moderate     | Easy          |
| Use Case             | High traffic | Microservices| Enterprise    |

## Best Practices

1. **Never block the event loop** - Use `executeBlocking` for blocking operations
2. **Use verticles** - Organize code into deployable units
3. **Event bus** - Leverage for inter-verticle communication
4. **Fat JAR** - Deploy as single executable JAR
5. **Health checks** - Implement for Kubernetes
6. **Monitoring** - Use Micrometer or Dropwizard Metrics

## Common Patterns

### Blocking Code

```java
vertx.executeBlocking(promise -> {
    // Blocking operation (database, file I/O, etc.)
    String result = blockingOperation();
    promise.complete(result);
}, res -> {
    // Handle result on event loop
});
```

### Error Handling

```java
router.get("/api/data").handler(ctx -> {
    dataService.fetch()
        .onSuccess(data -> ctx.json(data))
        .onFailure(err -> ctx.fail(500, err));
});
```

### Circuit Breaker

```java
CircuitBreaker breaker = CircuitBreaker.create("my-circuit-breaker", vertx)
    .setMaxFailures(5)
    .setTimeout(2000);

breaker.execute(promise -> {
    // Call external service
});
```

## Real-World Use Cases

- **Real-time applications**: Chat, notifications, live updates
- **IoT gateways**: Handle thousands of device connections
- **API gateways**: High-throughput request routing
- **Microservices**: Event-driven service communication
- **Proxy servers**: Efficient request forwarding
- **WebSocket servers**: Real-time bidirectional communication

## CI/CD Integration

Works with repository's GitHub Actions:
- Auto-builds on `java/vertx/**` changes
- Pushes optimized and basic images
- Layer caching for faster builds

## References

- [Vert.x Documentation](https://vertx.io/docs/)
- [Vert.x Examples](https://github.com/vert-x3/vertx-examples)
- [Reactive Patterns](https://www.reactivemanifesto.org/)
- [Netty Project](https://netty.io/)

---

Built for reactive, high-performance, event-driven applications.
