using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SneakerShop.DA.Entities
{
    public class Brand
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}