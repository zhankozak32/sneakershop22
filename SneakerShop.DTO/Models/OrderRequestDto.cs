using System.Collections.Generic;

namespace SneakerShop.DTO.Models
{
    public class OrderRequestDto
    {
        public int SelectedSize { get; set; }
        public int ProductId { get; set; }
    }
}