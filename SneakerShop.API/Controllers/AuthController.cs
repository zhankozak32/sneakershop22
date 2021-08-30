using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SneakerShop.Domain.Interfaces;
using SneakerShop.DTO.Models;

namespace SneakerShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterRequestDto model)
        {
            await _authService.RegisterAsync(model);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginRequestDto model)
        {
            var result = await _authService.LoginAsync(model);
            return Ok(result);
        }
    }
}