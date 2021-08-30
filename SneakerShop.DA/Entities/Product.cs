using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SneakerShop.DA.Entities
{
    public class Product
    {
        [Key] 
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int? SelectedSize{ get; set; }
        public int BrandId { get; set; }
        public virtual Brand Brand { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Size> Sizes { get; set; }
    }
}