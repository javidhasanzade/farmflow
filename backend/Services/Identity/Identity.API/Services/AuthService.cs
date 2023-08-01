using Identity.API.Data;
using Identity.API.Models;
using Identity.API.Models.Dto;
using Microsoft.AspNetCore.Identity;

namespace Identity.API.Services;

public class AuthService : IAuthService
{
    private readonly UsersDbContext _context;
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthService(UsersDbContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
        _jwtTokenGenerator = jwtTokenGenerator;
    }
    
    public async Task<string> Register(RegistrationRequestDto registrationRequestDto)
    {
        AppUser user = new()
        {
            UserName = registrationRequestDto.Email,
            Email = registrationRequestDto.Email,
            NormalizedEmail = registrationRequestDto.Email.ToUpper(),
            Name = registrationRequestDto.Name,
            Surname = registrationRequestDto.Surname,
            PhoneNumber = registrationRequestDto.PhoneNumber,
            DateOfBirth = registrationRequestDto.DateOfBirth,
            AvatarUrl = registrationRequestDto.AvatarUrl,
            Country = registrationRequestDto.Country,
            City = registrationRequestDto.City,
            ZipCode = registrationRequestDto.ZipCode
        };

        await AssignRole(user.UserName, registrationRequestDto.Role ?? "user");

        try
        {
            var result = await _userManager.CreateAsync(user, registrationRequestDto.Password);
            if (result.Succeeded)
            {
                var userToReturn = _context.AppUsers.First(u => u.UserName == registrationRequestDto.Email);

                UserDto userDto = new()
                {
                    Email = userToReturn.Email,
                    Id = userToReturn.Id,
                    Name = userToReturn.Name,
                    Surname = userToReturn.Surname,
                    PhoneNumber = userToReturn.PhoneNumber,
                    DateOfBirth = userToReturn.DateOfBirth,
                    AvatarUrl = userToReturn.AvatarUrl,
                    Rating = userToReturn.Rating
                };

                return "";
            }
            else
            {
                return result.Errors.FirstOrDefault()!.Description;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        return "Error";
    }

    public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
    {
        var user = _context.AppUsers.FirstOrDefault(u => u.UserName.ToLower() == loginRequestDto.Username.ToLower());

        bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);

        if (user == null || isValid == false)
        {
            return new LoginResponseDto() { User = null, Token = "" };
        }

        var roles = await _userManager.GetRolesAsync(user);
        var token = _jwtTokenGenerator.GenerateToken(user, roles);

        var userDto = new UserDto()
        {
            Email = user.Email,
            Id = user.Id,
            Name = user.Name,
            Surname = user.Surname,
            PhoneNumber = user.PhoneNumber,
            DateOfBirth = user.DateOfBirth,
            AvatarUrl = user.AvatarUrl,
            Rating = user.Rating,
            Country = user.Country,
            City = user.City,
            ZipCode = user.ZipCode
        };
        LoginResponseDto loginResponseDto = new()
        {
            User = userDto,
            Token = token
        };
        
        return loginResponseDto;
    }

    public async Task<bool> AssignRole(string email, string roleName)
    {
        var user = _context.AppUsers.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
        if (user != null)
        {
            if (!_roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult())
            {
                _roleManager.CreateAsync(new IdentityRole(roleName)).GetAwaiter().GetResult();
            }

            await _userManager.AddToRoleAsync(user, roleName);
            return true;
        }

        return false;
    }
}