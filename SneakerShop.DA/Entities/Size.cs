using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SneakerShop.DA.Entities
{
    public class Size
    {
        [Key]
        public int Id { get; set; }
        public int Value { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}