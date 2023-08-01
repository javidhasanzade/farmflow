using Basket.API.Entities;

namespace Basket.API.SyncDataServices;

public interface IDiscountDataClient
{
    Task<Coupon> GetDiscount(string productId);
}