using MongoDB.Bson.Serialization.Attributes;

namespace Catalog.API.Entities;

public class Wishlist
{
    [BsonId]
    [BsonElement("user_id")]
    public string UserId { get; set; }
    
    [BsonElement("products")]
    public List<Product> Products { get; set; }
}