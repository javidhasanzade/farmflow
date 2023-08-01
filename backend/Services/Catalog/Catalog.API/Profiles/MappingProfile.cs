using AutoMapper;
using Catalog.API.Entities;
using Catalog.API.Entities.Dto;

namespace Catalog.API.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductDto>().ReverseMap();
    }
}