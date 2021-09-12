using System.Collections.Generic;
using System.Threading.Tasks;
using SneakerShop.DTO.Models;
using SneakerShop.DTO.Pagination;

namespace SneakerShop.Domain.Interfaces
{
    public interface IProductService
    {
        Task PostProductAsync(ProductRequestDto model);
        Task<PaginatedList<ProductResponseDto>> GetPaginatedProductsAsync(int pageNumber, int pageSize);
        Task<List<ProductResponseDto>> GetProductsAsync();
    }
}