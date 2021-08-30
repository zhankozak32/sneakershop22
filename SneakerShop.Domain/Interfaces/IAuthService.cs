using System.Threading.Tasks;
using SneakerShop.DTO.Models;

namespace SneakerShop.Domain.Interfaces
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterRequestDto model);
        Task<LoginResponseDto> LoginAsync(LoginRequestDto model);
    }
}