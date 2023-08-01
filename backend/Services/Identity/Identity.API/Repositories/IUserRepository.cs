using Identity.API.Models;

namespace Identity.API.Repositories;

public interface IUserRepository
{
    Task<IEnumerable<AppUser>> GetUsers();
    Task<AppUser> GetUserById(string id);
}