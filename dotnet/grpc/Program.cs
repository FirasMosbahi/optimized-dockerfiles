using GrpcDemo.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc();
builder.Services.AddGrpcReflection();

// Add health checks
builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<GreeterService>();

// Enable gRPC reflection for tools like grpcurl
if (app.Environment.IsDevelopment())
{
    app.MapGrpcReflectionService();
}

// Health check endpoint
app.MapHealthChecks("/health");

// Root endpoint with info
app.MapGet("/", () => Results.Ok(new
{
    message = "gRPC service running",
    framework = "gRPC",
    status = "success",
    endpoints = new[] { "/health", "greeter.Greeter/SayHello" }
}));

app.Run();
