using Catalog.API.Data;
using Catalog.API.Entities;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Catalog.API.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly ICatalogContext _catalogContext;

    public ProductRepository(ICatalogContext catalogContext)
    {
        _catalogContext = catalogContext;
    }

    private async Task<IEnumerable<Product>> GetOrderedByProducts(List<Product> products, string orderBy, int page = 0)
    {
        switch (orderBy)
        {
            case "HL":
                return products.OrderByDescending(p => p.Price).Skip(9*page).Take(9);
                break;
            case "LH":
                return products.OrderBy(p => p.Price).Skip(9*page).Take(9);
                break;
            case "N":
                return products.OrderByDescending(p => p.PostedOn).Skip(9*page).Take(9);
                break;
            default:
                return products;
        }
    }
    
    public async Task<IEnumerable<Product>> GetProducts(string orderBy, int page = 0)
    {
        var products = await _catalogContext.Products.AsQueryable()
            .Skip(9*page)
            .Take(9)
            .ToListAsync();

        return GetOrderedByProducts(products, orderBy, page).Result;
    }

    public async Task<IEnumerable<Product>> GetProducts(string? category, string? seller, string? name, double? from, double? to, string? country,
        string? city, string orderBy, int page = 0)
    {
        var query = _catalogContext.Products.AsQueryable();

        // Apply filters
        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(p => p.Category == category);
        }

        if (!string.IsNullOrEmpty(seller))
        {
            query = query.Where(p => p.Seller.ToLower() == seller.ToLower());
        }

        if (!string.IsNullOrEmpty(name))
        {
            query = query.Where(p => p.Name.ToLower().Contains(name.ToLower()));
        }

        if (from.HasValue && to.HasValue)
        {
            query = query.Where(p => (p.Price >= from && p.Price <= to));
        }

        if (!string.IsNullOrEmpty(country))
        {
            query = query.Where(p => p.Country == country);
        }

        if (!string.IsNullOrEmpty(city))
        {
            query = query.Where(p => p.City.ToLower() == city.ToLower());
        }

        // Apply ordering
        switch (orderBy)
        {
            case "HL":
                query = query.OrderByDescending(p => p.Price);
                break;
            case "LH":
                query = query.OrderBy(p => p.Price);
                break;
            case "N":
                query = query.OrderByDescending(p => p.PostedOn);
                break;
            default:
                break;
        }

        // Apply paging
        query = query.Skip(9 * page).Take(9);

        var products = await query.ToListAsync();

        return products;
    }

    public async Task<Product> GetProduct(string id)
    {
        return await _catalogContext.Products
            .Find(p => p.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Product>> GetProductsByName(string name, string orderBy, int page = 0)
    {
        var filter = Builders<Product>.Filter.AnyIn(p => p.Name, name);

        var products = await _catalogContext.Products
            .Find(filter)
            .ToListAsync();

        return await GetOrderedByProducts(products, orderBy, page);
    }

    public async Task<IEnumerable<Product>> GetProductsByCategory(string category, string orderBy, int page = 0)
    {
        var filter = Builders<Product>.Filter.Eq(p => p.Category, category);

        var products = await _catalogContext.Products
            .Find(filter)
            .ToListAsync();
        
        return GetOrderedByProducts(products, orderBy, page).Result;
    }

    public async Task<IEnumerable<Product>> GetProductsByPrice(double from, double to, string orderBy, int page = 0)
    {
        var products = await _catalogContext.Products
            .Find(p => p.Price >= from && p.Price <= to).ToListAsync();

        return await GetOrderedByProducts(products, orderBy, page);
    }

    public async Task<IEnumerable<Product>> GetProductsBySeller(string seller, string orderBy, int page = 0)
    {
        var filter = Builders<Product>.Filter.Eq(p => p.Seller, seller);

        var products = await _catalogContext.Products
            .Find(filter)
            .ToListAsync();

        return await GetOrderedByProducts(products, orderBy, page);
    }

    public async Task<IEnumerable<Product>> GetProductsByLocation(string country, string? city, string orderBy, int page = 0)
    {
        var countryFilter = Builders<Product>.Filter.Eq(p => p.Country, country);
        var cityFilter = Builders<Product>.Filter.Eq(p => p.City, city ?? String.Empty);
        var filters = Builders<Product>.Filter.And(countryFilter, cityFilter);
        
        var products = await _catalogContext.Products
            .Find(filters)
            .ToListAsync();

        return await GetOrderedByProducts(products, orderBy, page);
    }

    public int GetTotalPages(List<Product> products)
    {
        return (products.Count + 9 - 1) / 9;
    }

    public async Task CreateProduct(Product product)
    {
        await _catalogContext.Products.InsertOneAsync(product);
    }

    public async Task<bool> UpdateProduct(Product product)
    {
        var updateResult = await _catalogContext.Products
            .ReplaceOneAsync(filter: g => g.Id == product.Id, replacement: product);
        
        return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
    }

    public async Task<bool> DeleteProduct(string id)
    {
        FilterDefinition<Product> filter = Builders<Product>.Filter.Eq(p => p.Id, id);

        DeleteResult deleteResult = await _catalogContext.Products.DeleteOneAsync(filter);

        return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
    }
}