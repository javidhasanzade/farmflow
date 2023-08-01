using Identity.API.Data;
using Identity.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Identity.API.Repositories;

public class UserRepository : IUserRepository
{
    private readonly UsersDbContext _dbContext;

    public UserRepository(UsersDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<AppUser>> GetUsers()
    {
        return await _dbContext.AppUsers.ToListAsync();
    }

    public async Task<AppUser> GetUserById(string id)
    {
        return (await _dbContext.AppUsers.FirstOrDefaultAsync(u => u.Id == id))!;
    }
}