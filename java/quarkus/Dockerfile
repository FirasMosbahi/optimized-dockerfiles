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

# Build the application (creates quarkus-app in target/)
RUN mvn package -DskipTests -B

# ==============================================================================
# STAGE 2: Runtime Stage
# ==============================================================================
FROM eclipse-temurin:21-jre-alpine

# Add metadata
LABEL maintainer="Firas Mosbahi"
LABEL description="Optimized Quarkus application"

# Create non-root user for security
RUN addgroup -S quarkus && adduser -S quarkus -G quarkus

WORKDIR /app

# Copy the Quarkus app from builder stage
COPY --from=builder /build/target/quarkus-app/lib/ /app/lib/
COPY --from=builder /build/target/quarkus-app/*.jar /app/
COPY --from=builder /build/target/quarkus-app/app/ /app/app/
COPY --from=builder /build/target/quarkus-app/quarkus/ /app/quarkus/

# Change ownership to non-root user
RUN chown -R quarkus:quarkus /app

# Switch to non-root user
USER quarkus

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Run the application with optimized JVM flags
ENTRYPOINT ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-jar", \
    "quarkus-run.jar"]
