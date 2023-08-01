using Catalog.API.Data;
using Catalog.API.Entities;
using MongoDB.Driver.Linq;
using System.Linq;
using MongoDB.Driver;

namespace Catalog.API.Repositories;

public class WishlistRepository : IWishlistRepository
{
    private readonly ICatalogContext _catalogContext;

    public WishlistRepository(ICatalogContext catalogContext)
    {
        _catalogContext = catalogContext;
    }
    
    public async Task AddProductAsync(string userId, Product product)
    {
        var wishlist = await _catalogContext.Wishlists.AsQueryable()
            .FirstOrDefaultAsync(w => w.UserId == userId);

        if (wishlist != null)
        {
            if (wishlist.Products.Contains(product)) return;
            wishlist.Products.Add(product);
            await _catalogContext.Wishlists.ReplaceOneAsync(filter: w => w.UserId == userId,
                replacement: wishlist);
            return;
        }

        var w = new Wishlist() { UserId = userId, Products = new List<Product>() {product}};
        await _catalogContext.Wishlists.InsertOneAsync(w);
    }

    public async Task RemoveProductAsync(string userId, Product product)
    {
        var wishlist = await _catalogContext.Wishlists.AsQueryable()
            .FirstOrDefaultAsync(w => w.UserId == userId);

        if (wishlist != null)
        {
            wishlist.Products.Remove(product);
            
            await _catalogContext.Wishlists.ReplaceOneAsync(filter: w => w.UserId == userId,
                replacement: wishlist);
        }
    }

    public async Task<IEnumerable<Product>> GetProductsAsync(string userId)
    {
        var wishlist = await _catalogContext.Wishlists.AsQueryable().FirstOrDefaultAsync(w => w.UserId == userId);

        return wishlist.Products ?? new List<Product>();
    }

    public async Task<int> GetCountAsync(string userId)
    {
        var count = await _catalogContext.Wishlists.CountDocumentsAsync(w => w.UserId == userId);

        return (int)count;
    }
    
    public int GetTotalPages(List<Product> products)
    {
        return (products.Count + 9 - 1) / 9;
    }
}