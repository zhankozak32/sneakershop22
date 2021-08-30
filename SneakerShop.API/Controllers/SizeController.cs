using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SneakerShop.Domain.Interfaces;
using SneakerShop.DTO.Models;

namespace SneakerShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizeController : ControllerBase
    {
        private readonly ISizeService _sizeService;

        public SizeController(ISizeService sizeService)
        {
            _sizeService = sizeService;
        }

        [HttpPost]
        public async Task<IActionResult> PostSizeAsync(SizeRequestDto model)
        {
            await _sizeService.PostSizeAsync(model);
            return Ok();
        }

        [HttpPost("product")]
        public async Task<IActionResult> AddProductSizeAsync([FromQuery] int productId, [FromQuery] int sizeId)
        {
            await _sizeService.AddProductSizeAsync(productId, sizeId);
            return Ok();
        }

        [HttpGet("product")]
        public async Task<IActionResult> GetProductSizesAsync([FromQuery] int productId)
        {
            var result = await _sizeService.GetProductSizesAsync(productId);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetSizesAsync()
        {
            var result = await _sizeService.GetSizesAsync();
            return Ok(result);
        }
    }
}