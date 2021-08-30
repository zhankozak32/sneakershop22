using System.Collections.Generic;
using System.Threading.Tasks;
using SneakerShop.DTO.Models;

namespace SneakerShop.Domain.Interfaces
{
    public interface IBrandService
    {
        Task PostBrandAsync(BrandRequestDto model);
        Task<List<BrandResponseDto>> GetBrandsAsync();
    }
}