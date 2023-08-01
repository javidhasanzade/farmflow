using Catalog.API.Data;
using Catalog.API.Entities;
using MongoDB.Driver;

namespace Catalog.API.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly ICatalogContext _catalogContext;

    public CategoryRepository(ICatalogContext catalogContext)
    {
        _catalogContext = catalogContext;
    }
    
    public async Task<IEnumerable<Category>> GetCategories()
    {
        return await _catalogContext.Categories.Find(c => true).ToListAsync();
    }
}