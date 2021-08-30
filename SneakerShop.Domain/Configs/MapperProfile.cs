using AutoMapper;
using SneakerShop.DA.Entities;
using SneakerShop.DTO.Models;

namespace SneakerShop.Domain.Configs
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Product, ProductResponseDto>()
                .ForMember(dest => dest.BrandName, 
                    x => x.MapFrom(map => map.Brand.Name));
            CreateMap<ProductRequestDto, Product>();
            CreateMap<Brand, BrandResponseDto>();
            CreateMap<BrandRequestDto, Brand>();
            CreateMap<SizeRequestDto, Size>();
            CreateMap<Size, SizeResponseDto>();
        }
    }
}