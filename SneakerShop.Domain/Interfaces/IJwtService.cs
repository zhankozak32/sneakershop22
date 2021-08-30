using SneakerShop.DA.Entities;

namespace SneakerShop.Domain.Interfaces
{
    public interface IJwtService
    {
        string GenerateJwtToken(User user);
    }
}