using Basket.API.Entities;

namespace Basket.API.Repositories;

public interface IBasketRepository
{
    Task<ShoppingCart?> GetBasket(string username);
    Task<ShoppingCart> UpdateBasket(string username, ShoppingCartItem basket, string action);
    Task<ShoppingCart> UpdateBasket(string username, string productId);
    Task DeleteBasket(string username);
}