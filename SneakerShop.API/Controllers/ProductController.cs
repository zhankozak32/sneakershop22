using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SneakerShop.Domain.Interfaces;
using SneakerShop.DTO.Models;

namespace SneakerShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> PostProductAsync(ProductRequestDto model)
        {
            await _productService.PostProductAsync(model);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var result = await _productService.GetProductsAsync();
            return Ok(result);
        }
        
        [HttpGet("paginated")]
        public async Task<IActionResult> GetPaginatedProductsAsync([FromQuery]int pageNumber, [FromQuery]int pageSize)
        {
            var result = await _productService.GetPaginatedProductsAsync(pageNumber, pageSize);
            return Ok(result);
        }        
    }
}