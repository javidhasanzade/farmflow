using Basket.API.Entities;
using Microsoft.Extensions.Caching.Distributed;
//using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Basket.API.Repositories;

public class BasketRepository : IBasketRepository
{
    private readonly IDistributedCache _redisCache;

    public BasketRepository(IDistributedCache redisCache)
    {
        _redisCache = redisCache ?? throw new ArgumentNullException(nameof(redisCache));
    }
    
    public async Task<ShoppingCart?> GetBasket(string username)
    {
        var basket = await _redisCache.GetStringAsync(username);
        
        return string.IsNullOrEmpty(basket) ? null : JsonSerializer.Deserialize<ShoppingCart>(basket);
    }

    public async Task<ShoppingCart> UpdateBasket(string username, ShoppingCartItem basket, string action)
    {
        var cart = GetBasket(username);

        if (cart.Result != null)
        {
            var item = cart.Result.Items.FirstOrDefault(i => i.ProductId == basket.ProductId);
            if (item == null)
            {
                cart.Result.Items.Add(basket);
            }
            else
            {
                if(item.Quantity >= basket.Quantity && action == "d") cart.Result.Items.FirstOrDefault(i => i.ProductId == basket.ProductId)!.Quantity = basket.Quantity;
                else if(action == "i") cart.Result.Items.FirstOrDefault(i => i.ProductId == basket.ProductId)!.Quantity += basket.Quantity;
            }
            Console.WriteLine(cart.Result.Username + " " + cart.Result.Items.Count);
            await _redisCache.SetStringAsync(username, JsonSerializer.Serialize(cart.Result));
        }
        else
        {
            var newCart = new ShoppingCart(username);
            newCart.Items.Add(basket);
            Console.WriteLine(newCart.Username + " " + newCart.Items.Count);
            await _redisCache.SetStringAsync(username, JsonSerializer.Serialize(newCart));
        }
        
        return await GetBasket(username);
    }

    public async Task<ShoppingCart> UpdateBasket(string username, string productId)
    {
        var cart = GetBasket(username);
        var item = cart.Result?.Items.FirstOrDefault(p => p.ProductId == productId);
        cart.Result?.Items.Remove(item);
        await _redisCache.SetStringAsync(username, JsonSerializer.Serialize(cart.Result));
        return await GetBasket(username);
    }

    public async Task DeleteBasket(string username)
    {
        await _redisCache.RemoveAsync(username);
    }
}