using Catalog.API.Entities;
using MongoDB.Driver;

namespace Catalog.API.Data;

public class CatalogContextSeed
{
    public static void SeedData(IMongoCollection<Product> products)
    {
        bool isExist = products.Find(p => true).Any();
        if (!isExist)
        {
            products.InsertManyAsync(GetPreconfiguredProducts());
        }
    }
    
    public static void SeedData(IMongoCollection<Category> categories)
    {
        bool isExist = categories.Find(p => true).Any();
        if (!isExist)
        {
            categories.InsertManyAsync(GetPreconfiguredCategories());
        }
    }

    private static IEnumerable<Product> GetPreconfiguredProducts()
    {
        return new List<Product>()
        {
            new Product()
            {
                Name = "IPhone X",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-1.png"},
                Price = 950.00,
                Category = "Smart Phone",
                Quantity = 50,
                Seller = "Ramil",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Samsung 10",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-2.png"},
                Price = 840.00,
                Category = "Smart Phone",
                Quantity = 36,
                Seller = "Javid",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Huawei Plus",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-3.png"},
                Price = 650.00,
                Category = "White Appliances",
                Quantity = 30,
                Seller = "Mika",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Xiaomi Mi 9",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-4.png"},
                Price = 470.00,
                Category = "White Appliances",
                Quantity = 20,
                Seller = "Ibo",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Strawberry",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-5.png"},
                Price = 380.00,
                Category = "Smart Phone",
                Quantity = 50,
                Seller = "Firudin",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Cherry",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-6.png"},
                Price = 240.00,
                Category = "Home Kitchen",
                Quantity = 50,
                Seller = "Eldar",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Peach",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-7.png"},
                Price = 240.00,
                Category = "Home Kitchen",
                Quantity = 50,
                Seller = "Eldar1",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Bananas 2kg",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-8.png"},
                Price = 240.00,
                Category = "Home Kitchen",
                Quantity = 50,
                Seller = "Eldar2",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Apples 3kg",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-9.png"},
                Price = 240.00,
                Category = "Home Kitchen",
                Quantity = 50,
                Seller = "Javva",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Watermelon 20 stuck",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-10.png"},
                Price = 240.00,
                Category = "Home Kitchen",
                Quantity = 50,
                Seller = "Romail",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Gurken",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-11.png"},
                Price = 240.00,
                Category = "Home Kitchen",
                Quantity = 50,
                Seller = "Fira",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
            new Product()
            {
                Name = "Grapes",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
                ImageFile = new string[] {"product-12.png"},
                Price = 240.00,
                Category = "Fruits",
                Quantity = 50,
                Seller = "Iboba",
                Country = "Germany",
                City = "Berlin",
                PostedOn = DateTime.Now
            },
        };
    }

    private static IEnumerable<Category> GetPreconfiguredCategories()
    {
        return new List<Category>()
        {
            new Category() { Name = "Vegetables", IconUrl = "vegetablesCategory"},
            new Category() { Name = "Fruits", IconUrl = "fruitsCategory"},
            new Category() { Name = "Seeds and Planting Materials", IconUrl = "seedCategory"},
            new Category() { Name = "Fertilizers and Soil Amendments", IconUrl = "fertilizerCategory"},
            new Category() { Name = "Crop Protection", IconUrl = "pesticideCategory"},
            new Category() { Name = "Farm Equipment and Machinery", IconUrl = "farmToolsCategory"},
            new Category() { Name = "Livestock and Poultry", IconUrl = "livestockCategory"},
            new Category() { Name = "Animal Feed and Supplements", IconUrl = "pillsCategory"}
        };
    }
}