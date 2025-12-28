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

# Build the application (creates shaded JAR)
RUN mvn clean package -DskipTests -B

# ==============================================================================
# STAGE 2: Runtime Stage
# ==============================================================================
FROM eclipse-temurin:21-jre-alpine

# Add metadata
LABEL maintainer="Firas Mosbahi"
LABEL description="Optimized Micronaut application"

# Create non-root user for security
RUN addgroup -S micronaut && adduser -S micronaut -G micronaut

WORKDIR /app

# Copy the JAR from builder stage
COPY --from=builder /build/target/micronaut-demo-*.jar app.jar

# Change ownership to non-root user
RUN chown -R micronaut:micronaut /app

# Switch to non-root user
USER micronaut

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Run the application with optimized JVM flags for Micronaut
ENTRYPOINT ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-XX:+UseG1GC", \
    "-Dmicronaut.environments=prod", \
    "-jar", \
    "app.jar"]
