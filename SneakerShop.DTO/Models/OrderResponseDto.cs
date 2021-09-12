namespace SneakerShop.DTO.Models
{
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ProductName { get; set; }
        public string Status { get; set; }
        public string Address { get; set; }
        public decimal TotalPrice { get; set; }
    }
}