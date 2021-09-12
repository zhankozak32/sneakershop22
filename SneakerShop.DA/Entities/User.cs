using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace SneakerShop.DA.Entities
{
    public class User : IdentityUser
    {
        public string Gender { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public decimal Balance { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}