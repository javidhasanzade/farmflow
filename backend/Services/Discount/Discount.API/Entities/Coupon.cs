namespace Discount.API.Entities;

public class Coupon
{
    public int Id { get; set; }
    public string CouponCode { get; set; }
    public string ProductId { get; set; }
    public string Description { get; set; }
    public int Amount { get; set; }
    public bool IsUsed { get; set; }
}