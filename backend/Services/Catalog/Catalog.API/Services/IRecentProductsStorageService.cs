using Catalog.API.Entities;

namespace Catalog.API.Services;

public interface IRecentProductsStorageService
{
    IEnumerable<Product> GetRecentProducts();
    void AddProduct(Product product);
}