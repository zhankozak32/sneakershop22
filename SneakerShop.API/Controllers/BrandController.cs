using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SneakerShop.Domain.Interfaces;
using SneakerShop.DTO.Models;

namespace SneakerShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;

        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }

        [HttpPost]
        public async Task<IActionResult> PostBrandAsync(BrandRequestDto model)
        {
            await _brandService.PostBrandAsync(model);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetBrandsAsync()
        {
            var brands = await _brandService.GetBrandsAsync();
            return Ok(brands);
        }
    }
}