using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SneakerShop.Domain.Interfaces;
using SneakerShop.DTO.Models;

namespace SneakerShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostOrderAsync(OrderRequestDto model)
        {
            var userId = User.FindFirst("id")?.Value;
            var result = await _orderService.PostOrderAsync(model, userId);
            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserOrdersAsync()
        {
            var userId = User.FindFirst("id")?.Value;
            var result = await _orderService.GetUserOrdersAsync(userId);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> ProcessOrderAsync([FromQuery] int orderId)
        {
            var result = await _orderService.ProcessOrderAsync(orderId);
            return Ok(result);
        }

        [HttpGet("paginated")]
        public async Task<IActionResult> GetPagedOrdersAsync([FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            var result = await _orderService.GetPagedOrdersAsync(pageNumber, pageSize);
            return Ok(result);
        }
    }
}