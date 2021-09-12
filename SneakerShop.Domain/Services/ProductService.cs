using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SneakerShop.DA;
using SneakerShop.DA.Entities;
using SneakerShop.Domain.Interfaces;
using SneakerShop.DTO.Models;
using SneakerShop.DTO.Pagination;

namespace SneakerShop.Domain.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly EFContext _context;
        private readonly ISizeService _sizeService;
        
        public ProductService(IMapper mapper, EFContext context, ISizeService sizeService)
        {
            _mapper = mapper;
            _context = context;
            _sizeService = sizeService;
        }

        public async Task PostProductAsync(ProductRequestDto model)
        {
            var entity = _mapper.Map<ProductRequestDto, Product>(model);
            
            entity.ImagePath = await SaveImage(model.Base64);
            await _context.Products.AddAsync(entity);
            await _context.SaveChangesAsync();
            await _sizeService.AddProductSizeAsync(entity.Id, 1);
            await _sizeService.AddProductSizeAsync(entity.Id, 2);
            await _sizeService.AddProductSizeAsync(entity.Id, 3);
            await _sizeService.AddProductSizeAsync(entity.Id, 4);
            await _sizeService.AddProductSizeAsync(entity.Id, 5);
            await _sizeService.AddProductSizeAsync(entity.Id, 6);
        }
        
        public async Task<PaginatedList<ProductResponseDto>> GetPaginatedProductsAsync(int pageNumber, int pageSize)
        {
            var products = await _context.Products
                .Include(t => t.Sizes)
                .OrderBy(t => t.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            
            var count = await _context.Products.CountAsync();

            var result = new PaginatedList<ProductResponseDto>()
            {
                Data = _mapper.Map<List<Product>, List<ProductResponseDto>>(products),
                PageViewModel = new PageViewModel(count, pageNumber, pageSize)
            };
            return result;
        }

        public async Task<List<ProductResponseDto>> GetProductsAsync()
        {
            var products = await _context.Products
                .Include(t => t.Sizes)
                .ToListAsync();
            return _mapper.Map<List<Product>, List<ProductResponseDto>>(products);
        }
        
        private async Task<string> SaveImage(string base64)
        {
            var normalizedBase64 = base64.Substring(base64.LastIndexOf(',') + 1);
            var bytes = Convert.FromBase64String(normalizedBase64);
            var newFileName = Guid.NewGuid() + GetFileExtension(normalizedBase64);
            await File.WriteAllBytesAsync(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", newFileName), bytes);
            return newFileName;
        }
        
        private static string GetFileExtension(string base64String)
        {
            var data = base64String.Substring(0, 5);

            switch (data.ToUpper())
            {
                case "IVBOR":
                    return ".png";
                case "/9J/4":
                    return ".jpg";
                case "AAAAF":
                    return ".mp4";
                case "JVBER":
                    return ".pdf";
                case "AAABA":
                    return ".ico";
                case "UMFYI":
                    return ".rar";
                case "E1XYD":
                    return ".rtf";
                case "U1PKC":
                    return ".txt";
                case "MQOWM":
                case "77U/M":
                    return ".srt";
                default:
                    return string.Empty;
            }
        }
    }
}