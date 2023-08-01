using Catalog.API.Entities;
using MongoDB.Driver;

namespace Catalog.API.Data;

public class CatalogContext : ICatalogContext
{
    public CatalogContext(IConfiguration configuration)
    {
        var client = new MongoClient(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
        var database = client.GetDatabase(configuration.GetValue<string>("DatabaseSettings:DatabaseName"));

        Products = 
            database.GetCollection<Product>(configuration.GetValue<string>("DatabaseSettings:CollectionNameProduct"));
        
        Categories =
            database.GetCollection<Category>(configuration.GetValue<string>("DatabaseSettings:CollectionNameCategory"));

        Wishlists =
            database.GetCollection<Wishlist>(configuration.GetValue<string>("DatabaseSettings:CollectionNameWishlist"));
        
        CatalogContextSeed.SeedData(Categories);
    }
    
    public IMongoCollection<Product> Products { get; }
    public IMongoCollection<Category> Categories { get; }
    public IMongoCollection<Wishlist> Wishlists { get; }
}