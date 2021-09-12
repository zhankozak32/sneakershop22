using System.Collections.Generic;
using System.Threading.Tasks;
using SneakerShop.DTO.Models;
using SneakerShop.DTO.Pagination;

namespace SneakerShop.Domain.Interfaces
{
    public interface IOrderService
    {
        Task<OrderResponseDto> PostOrderAsync(OrderRequestDto model, string userId);
        Task<List<OrderResponseDto>> GetUserOrdersAsync(string userId);
        Task<PaginatedList<OrderResponseDto>> GetPagedOrdersAsync(int pageNumber, int pageSize);
        Task<OrderResponseDto> ProcessOrderAsync(int orderId);
        Task DeleteOrderAsync(int orderId);
    }
}