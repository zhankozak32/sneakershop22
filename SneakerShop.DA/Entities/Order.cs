using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SneakerShop.DA.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
        public bool Success { get; set; }
        public string Address { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}