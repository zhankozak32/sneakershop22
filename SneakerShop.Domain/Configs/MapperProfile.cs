using System.Collections.Generic;
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
                .ForMember(dest => dest.Sizes,
                    x => x.MapFrom(map => map.Sizes));
            CreateMap<ProductRequestDto, Product>();
            CreateMap<SizeRequestDto, Size>();
            CreateMap<Size, SizeResponseDto>();
            CreateMap<List<Size>, List<SizeResponseDto>>();
            CreateMap<Order, OrderResponseDto>()
                .ForMember(dest => dest.ProductName,
                    x => x.MapFrom(map => map.Product.Name));
        }
    }
}