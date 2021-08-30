using System.Threading.Tasks;
using SneakerShop.DTO.Models;

namespace SneakerShop.Domain.Interfaces
{
    public interface IOrderService
    {
        Task PostOrderAsync(OrderRequestDto model);
    }
}