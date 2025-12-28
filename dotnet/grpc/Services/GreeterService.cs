using Grpc.Core;

namespace GrpcDemo.Services;

public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;

    public GreeterService(ILogger<GreeterService> logger)
    {
        _logger = logger;
    }

    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        _logger.LogInformation("Received SayHello request for {Name}", request.Name);

        return Task.FromResult(new HelloReply
        {
            Message = $"Hello {request.Name} from gRPC!",
            Framework = "gRPC on ASP.NET Core",
            Timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds()
        });
    }

    public override Task<HealthReply> HealthCheck(HealthRequest request, ServerCallContext context)
    {
        return Task.FromResult(new HealthReply
        {
            Status = "healthy"
        });
    }
}
