namespace Ordering.Domain.Entities;

public class Product
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public string Unit { get; set; }
    public int MonthOfHarvest { get; set; }
    public string Description { get; set; }
    public string Seller { get; set; }
    public int Quantity { get; set; }
    public string[] ImageFile { get; set; }
    public decimal Price { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public DateTime PostedOn { get; set; }
}