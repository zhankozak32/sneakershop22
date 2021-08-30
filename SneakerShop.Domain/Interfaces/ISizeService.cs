using System.Collections.Generic;
using System.Threading.Tasks;
using SneakerShop.DTO.Models;

namespace SneakerShop.Domain.Interfaces
{
    public interface ISizeService
    {
        Task PostSizeAsync(SizeRequestDto model);
        Task AddProductSizeAsync(int productId, int sizeId);
        Task<List<SizeResponseDto>> GetProductSizesAsync(int productId);
        Task<List<SizeResponseDto>> GetSizesAsync();
    }
}