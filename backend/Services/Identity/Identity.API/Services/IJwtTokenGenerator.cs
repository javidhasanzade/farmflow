using Identity.API.Models;

namespace Identity.API.Services;

public interface IJwtTokenGenerator
{
    string GenerateToken(AppUser appUser, IEnumerable<string> roles);
}