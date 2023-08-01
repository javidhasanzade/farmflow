using System.Collections.Concurrent;
using Catalog.API.Entities;

namespace Catalog.API.Services;

public class RecentProductsStorageService : IRecentProductsStorageService
{
    private ConcurrentQueue<Product> _products = new();
    
    public IEnumerable<Product> GetRecentProducts()
    {
        return _products.Take(6);
    }

    public void AddProduct(Product product)
    {
        if(!_products.Contains(product))
            _products.Enqueue(product);

        if (_products.Count == 6)
            _products.TryDequeue(out Product p);
    }
}