namespace SneakerShop.DTO.Models
{
    public class ProductRequestDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? SelectedSize { get; set; }
        public string Base64 { get; set; }
        public decimal Price { get; set; }
        public int BrandId { get; set; }
    }
}