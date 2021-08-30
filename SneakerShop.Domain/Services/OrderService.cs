using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SneakerShop.DA;
using SneakerShop.DA.Entities;
using SneakerShop.Domain.Interfaces;
using SneakerShop.DTO.Models;

namespace SneakerShop.Domain.Services
{
    public class OrderService : IOrderService
    {
        private readonly EFContext _context;

        public OrderService(EFContext context)
        {
            _context = context;
        }

        public async Task PostOrderAsync(OrderRequestDto model)
        {
            var products = await _context.Products.ToListAsync();
            var orderProducts = new List<Product>();
            decimal orderTotalPrice = 0;
            
            foreach (var id in model.ProductsId)
            {
                var product = await _context.Products.SingleOrDefaultAsync(t => t.Id == id);
                if (product != null)
                {
                    orderProducts.Add(product);
                    orderTotalPrice += product.Price;
                }
            }

            var order = new Order
            {
                Address = model.Address,
                Products = orderProducts,
                UserId = model.UserId,
                Status = "Pending",
                TotalPrice = orderTotalPrice
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }
    }
}