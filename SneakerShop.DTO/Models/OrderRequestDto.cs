using System.Collections.Generic;

namespace SneakerShop.DTO.Models
{
    public class OrderRequestDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Address { get; set; }
        public List<int> ProductsId { get; set; }
    }
}