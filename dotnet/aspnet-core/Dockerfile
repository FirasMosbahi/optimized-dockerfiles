# ==============================================================================
# STAGE 1: Build Stage
# ==============================================================================
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build

WORKDIR /src

# Copy csproj and restore dependencies (cached layer)
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o /app/publish \
    --no-restore \
    --self-contained false

# ==============================================================================
# STAGE 2: Runtime Stage
# ==============================================================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine

# Add metadata
LABEL maintainer="Firas Mosbahi"
LABEL description="Optimized ASP.NET Core application"

# Create non-root user
RUN addgroup -S dotnet && adduser -S dotnet -G dotnet

WORKDIR /app

# Copy published app from build stage
COPY --from=build /app/publish .

# Change ownership to non-root user
RUN chown -R dotnet:dotnet /app

# Switch to non-root user
USER dotnet

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080 \
    DOTNET_RUNNING_IN_CONTAINER=true \
    DOTNET_EnableDiagnostics=0

# Run the application
ENTRYPOINT ["dotnet", "AspNetCoreDemo.dll"]
