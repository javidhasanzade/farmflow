using Catalog.API.Entities;

namespace Catalog.API.Repositories;

public interface IWishlistRepository
{
    Task AddProductAsync(string userId, Product product);
    Task RemoveProductAsync(string userId, Product product);
    Task<IEnumerable<Product>> GetProductsAsync(string userId);
    Task<int> GetCountAsync(string userId);
    public int GetTotalPages(List<Product> products);
}