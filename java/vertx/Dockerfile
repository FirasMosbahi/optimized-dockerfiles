# ==============================================================================
# STAGE 1: Build Stage
# ==============================================================================
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies (cached if pom.xml hasn't changed)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application (creates fat JAR)
RUN mvn clean package -DskipTests -B

# ==============================================================================
# STAGE 2: Runtime Stage
# ==============================================================================
FROM eclipse-temurin:21-jre-alpine

# Add metadata
LABEL maintainer="Firas Mosbahi"
LABEL description="Optimized Vert.x application"

# Create non-root user for security
RUN addgroup -S vertx && adduser -S vertx -G vertx

WORKDIR /app

# Copy the fat JAR from builder stage
COPY --from=builder /build/target/vertx-demo-fat.jar app.jar

# Change ownership to non-root user
RUN chown -R vertx:vertx /app

# Switch to non-root user
USER vertx

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Run the application with optimized JVM flags for Vert.x
ENTRYPOINT ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-XX:+UseG1GC", \
    "-Dvertx.logger-delegate-factory-class-name=io.vertx.core.logging.SLF4JLogDelegateFactory", \
    "-jar", \
    "app.jar"]
