namespace Ordering.Domain.Entities.Dto;

public class OrderDetailsDto
{
    public int OrderDetailsId { get; set; }
    public int OrderId { get; set; }
    public string ProductId { get; set; }
    public string ProductName { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public string Seller { get; set; }
    public Product? Product { get; set; }
}