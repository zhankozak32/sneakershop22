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

namespace SneakerShop.Domain.Services
{
    public class SizeService : ISizeService
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public SizeService(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task PostSizeAsync(SizeRequestDto model)
        {
            var size = await _context.Sizes.SingleOrDefaultAsync(t => t.Value == model.Value);
            if (size != null)
            {
                throw new RestException(HttpStatusCode.Conflict);
            }
            var entity = _mapper.Map<SizeRequestDto, Size>(model);
            await _context.Sizes.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task AddProductSizeAsync(int productId, int sizeId)
        {
            var product = await _context.Products
                .Include(t => t.Sizes)
                .SingleOrDefaultAsync(t => t.Id == productId);
            var size = await _context.Sizes.SingleOrDefaultAsync(t => t.Id == sizeId);
            if (product.Sizes.Contains(size))
            {
                throw new RestException(HttpStatusCode.Conflict);
            }
            product.Sizes.Add(size);
            await _context.SaveChangesAsync();
        }

        public async Task<List<SizeResponseDto>> GetProductSizesAsync(int productId)
        {
            var product = await _context.Products
                .Include(t => t.Sizes)
                .SingleOrDefaultAsync(t => t.Id == productId);
            var sizes = product.Sizes.ToList();
            
            return _mapper.Map<List<Size>, List<SizeResponseDto>>(sizes);
        }

        public async Task<List<SizeResponseDto>> GetSizesAsync()
        {
            var sizes = await _context.Sizes.ToListAsync();
            return _mapper.Map<List<Size>, List<SizeResponseDto>>(sizes);
        }
    }
}