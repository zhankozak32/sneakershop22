using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SneakerShop.DA;
using SneakerShop.DA.Entities;
using SneakerShop.Domain.Exceptions;
using SneakerShop.Domain.Interfaces;
using SneakerShop.DTO.Models;
using SneakerShop.DTO.Pagination;

namespace SneakerShop.Domain.Services
{
    public class OrderService : IOrderService
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public OrderService(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrderResponseDto> PostOrderAsync(OrderRequestDto model, string userId)
        {
            var product = await _context.Products.SingleOrDefaultAsync(t => t.Id == model.ProductId);
            var user = await _context.Users.SingleOrDefaultAsync(t => t.Id == userId);
            
            var order = new Order
            {
                Address = user.Address,
                UserId = userId,
                ProductId = model.ProductId,
                TotalPrice = product.Price,
                Status = "Pending",
                SelectedSize = model.SelectedSize
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            return _mapper.Map<Order, OrderResponseDto>(order);
        }

        public async Task<List<OrderResponseDto>> GetUserOrdersAsync(string userId)
        {
            var user = await _context.Users
                .Include(t => t.Orders)
                .ThenInclude(t => t.Product)
                .SingleOrDefaultAsync(t => t.Id == userId);
            var orders = user.Orders.ToList();
            return _mapper.Map<List<Order>, List<OrderResponseDto>>(orders);
        }

        public async Task<OrderResponseDto> ProcessOrderAsync(int orderId)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(t => t.Id == orderId);
            order.Status = "Completed";
            await _context.SaveChangesAsync();
            return _mapper.Map<Order, OrderResponseDto>(order);
        }

        public async Task<PaginatedList<OrderResponseDto>> GetPagedOrdersAsync(int pageNumber, int pageSize)
        {
            var orders = await _context.Orders
                .OrderBy(t => t.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            
            var count = await _context.Orders.CountAsync();

            return new PaginatedList<OrderResponseDto>
            {
                Data = _mapper.Map<List<Order>, List<OrderResponseDto>>(orders),
                PageViewModel = new PageViewModel(count, pageNumber, pageSize)
            };
        }

        public async Task DeleteOrderAsync(int orderId)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(t => t.Id == orderId);
            if (order == null)
            {
                throw new RestException(HttpStatusCode.NotFound);
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
}