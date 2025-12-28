using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreDemo.Controllers;

[ApiController]
[Route("api")]
public class HelloController : ControllerBase
{
    [HttpGet("hello")]
    public IActionResult GetHello()
    {
        var response = new
        {
            message = "Hello from ASP.NET Core!",
            framework = "ASP.NET Core",
            status = "success",
            timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds()
        };

        return Ok(response);
    }

    [HttpGet("health")]
    public IActionResult GetHealth()
    {
        return Ok(new { status = "healthy" });
    }
}
