var builder = WebApplication.CreateBuilder(args);

// Add health checks
builder.Services.AddHealthChecks();

var app = builder.Build();

// API Endpoints
app.MapGet("/api/hello", () =>
{
    return Results.Ok(new
    {
        message = "Hello from Minimal API!",
        framework = "Minimal API",
        status = "success",
        timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds()
    });
});

app.MapGet("/api/health", () =>
{
    return Results.Ok(new { status = "healthy" });
});

// Health check endpoint
app.MapHealthChecks("/health");

// Root endpoint
app.MapGet("/", () =>
{
    return Results.Ok(new
    {
        name = "Minimal API Demo",
        version = "1.0.0",
        endpoints = new[] { "/api/hello", "/api/health", "/health" }
    });
});

app.Run();
