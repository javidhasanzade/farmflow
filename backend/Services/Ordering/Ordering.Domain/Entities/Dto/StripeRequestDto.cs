namespace Ordering.Domain.Entities.Dto;

public class StripeRequestDto
{
    public string StripeSessionUrl { get; set; }
    public string StripeSessionId { get; set; }
    public string ApprovedUrl { get; set; }
    public string CancelUrl { get; set; }
    public Order Order { get; set; }
}