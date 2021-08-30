using System.Collections.Generic;
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
    public class BrandService : IBrandService
    {
        private readonly IMapper _mapper;
        private readonly EFContext _context;

        public BrandService(IMapper mapper, EFContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task PostBrandAsync(BrandRequestDto model)
        {
            var brand = await _context.Brands.SingleOrDefaultAsync(t => t.Name == model.Name);
            if (brand != null)
            {
                throw new RestException(HttpStatusCode.Conflict);
            }
            var entity = _mapper.Map<BrandRequestDto, Brand>(model);
            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<List<BrandResponseDto>> GetBrandsAsync()
        {
            var brands = await _context.Brands.ToListAsync();
            return _mapper.Map<List<Brand>, List<BrandResponseDto>>(brands);
        }
    }
}