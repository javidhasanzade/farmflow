using Catalog.API.Entities;

namespace Catalog.API.Repositories;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetProducts(string orderBy, int page=0);
    Task<IEnumerable<Product>> GetProducts(string? category, string? seller,
        string? name, double? from, double? to, string? country, string? city, string orderBy, int page=0);
    Task<Product> GetProduct(string id);
    Task<IEnumerable<Product>> GetProductsByName(string name, string orderBy, int page = 0);
    Task<IEnumerable<Product>> GetProductsByCategory(string category, string orderBy, int page = 0);
    Task<IEnumerable<Product>> GetProductsByPrice(double from, double to, string orderBy, int page = 0);
    Task<IEnumerable<Product>> GetProductsBySeller(string seller, string orderBy, int page = 0);
    Task<IEnumerable<Product>> GetProductsByLocation(string country, string? city, string orderBy, int page = 0);
    int GetTotalPages(List<Product> products);


    Task CreateProduct(Product product);
    Task<bool> UpdateProduct(Product product);
    Task<bool> DeleteProduct(string id);
}