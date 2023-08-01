namespace Ordering.Domain.Entities;

public class OrderProof
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string UserId { get; set; }
    public string ProofImageUrl { get; set; }
    public string Status { get; set; }
    public DateTime? CreatedDate { get; set; }
    
    public Order? Order { get; set; }
}