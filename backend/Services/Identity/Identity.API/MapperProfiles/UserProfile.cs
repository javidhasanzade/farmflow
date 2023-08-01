using AutoMapper;
using Identity.API.Models;
using Identity.API.Models.Dto;

namespace Identity.API.MapperProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<AppUser, UserDto>().ReverseMap();
    }
}