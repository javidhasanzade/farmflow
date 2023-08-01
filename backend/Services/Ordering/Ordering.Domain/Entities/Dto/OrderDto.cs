using Ordering.Domain.Common;

namespace Ordering.Domain.Entities.Dto;

public class OrderDto : EntityBase
{
    public string Username { get; set; } = string.Empty;
    public double TotalPrice { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    
    public string? Status { get; set; }
    public string? PaymentIntentId { get; set; }
    public string? StripeSessionId { get; set; }
    
    public IEnumerable<OrderDetailsDto> OrderDetails { get; set; }
}