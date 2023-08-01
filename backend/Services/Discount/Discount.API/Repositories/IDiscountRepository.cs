﻿using Discount.API.Entities;

namespace Discount.API.Repositories;

public interface IDiscountRepository
{
    Task<Coupon> GetDiscount(string productId);

    Task<bool> CreateDiscount(Coupon coupon);
    Task<bool> UpdateDiscount(Coupon coupon);
    Task<bool> DeleteDiscount(string productId);
}