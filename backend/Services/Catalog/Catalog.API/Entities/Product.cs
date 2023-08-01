using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog.API.Entities;

public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("_id")]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("category")]
    public string Category { get; set; }
    
    [BsonElement("unit")]
    public string Unit { get; set; }
    
    [BsonElement("harvest_month")]
    public int MonthOfHarvest { get; set; }
    
    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("seller")]
    public string Seller { get; set; }

    [BsonElement("quantity")]
    public int Quantity { get; set; }
    
    [BsonElement("image_file")]
    public string[] ImageFile { get; set; }
    
    [BsonElement("price")]
    public double Price { get; set; }
    
    [BsonElement("country")]
    public string Country { get; set; }
    
    [BsonElement("city")]
    public string City { get; set; }
    
    [BsonElement("posted_on")]
    public DateTime PostedOn { get; set; }
}