using System.Collections.Generic;
using System.Threading.Tasks;
using SneakerShop.DTO.Models;

namespace SneakerShop.Domain.Interfaces
{
    public interface IProductService
    {
        Task PostProductAsync(ProductRequestDto model);
        Task<List<ProductResponseDto>> GetProductsByBrandNameAsync(string brandName);
        Task<List<ProductResponseDto>> GetProductsAsync();
    }
}