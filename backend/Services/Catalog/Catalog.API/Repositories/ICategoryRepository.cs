using Catalog.API.Entities;

namespace Catalog.API.Repositories;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetCategories();
}