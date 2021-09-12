using System.Collections.Generic;

namespace SneakerShop.DTO.Models
{
    public class ProductResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public string BrandName { get; set; }
        public List<SizeResponseDto> Sizes { get; set; }
        public decimal Price { get; set; }
    }
}