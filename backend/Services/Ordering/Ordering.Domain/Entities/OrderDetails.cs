using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ordering.Domain.Entities;

public class OrderDetails
{
    public int OrderDetailsId { get; set; }
    public int OrderId { get; set; }
    public string ProductId { get; set; }
    public string ProductName { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public string Seller { get; set; }
    [NotMapped]
    public Product? Product { get; set; }
    
    public Order? Order { get; set; }
}