using System.Net;
using AutoMapper;
using Catalog.API.Entities;
using Catalog.API.Entities.Dto;
using Catalog.API.Repositories;
using Catalog.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class CatalogController : ControllerBase
{
    private readonly IProductRepository _productRepository;
    private readonly ILogger<CatalogController> _logger;
    private readonly IMapper _mapper;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IRecentProductsStorageService _recentProductsStorageService;
    protected ResponseDto _response;

    public CatalogController(IProductRepository productRepository, ILogger<CatalogController> logger, IMapper mapper,
        ICategoryRepository categoryRepository, IRecentProductsStorageService recentProductsStorageService)
    {
        _productRepository = productRepository;
        _logger = logger;
        _mapper = mapper;
        _categoryRepository = categoryRepository;
        _recentProductsStorageService = recentProductsStorageService;
        _response = new ResponseDto();
    }
    
    [HttpGet]
    [ProducesResponseType(typeof(ResponseDto), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<ResponseDto>> GetProducts(string orderBy, int page=0)
    {
        var products = await _productRepository.GetProducts(orderBy, page);
        
        _response.Result = products;
        _response.Pages = _productRepository.GetTotalPages(products.ToList());
        _response.IsSuccess = true;
        return Ok(_response);
    }
    
    [HttpGet("products")]
    [ProducesResponseType(typeof(ResponseDto), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<ResponseDto>> GetProducts(string? category, string? seller, string? name, 
        double? from, double? to, string? country, string? city, string orderBy, int page = 0)
    {
        var products = await _productRepository.GetProducts(category, seller, name, from, to, country,
            city, orderBy, page);
        _response.Result = products;
        _response.Pages = _productRepository.GetTotalPages(products.ToList());
        _response.IsSuccess = true;
        return Ok(_response);
    }

    [HttpGet("products/recent")]
    [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Product>>> GetRecentlyViewedProducts()
    {
        var products = _recentProductsStorageService.GetRecentProducts();

        return Ok(products);
    }

    [HttpGet("categories")]
    [ProducesResponseType(typeof(IEnumerable<Category>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return Ok(await _categoryRepository.GetCategories());
    }
    
    [HttpGet("{id:length(24)}", Name = "GetProduct")]
    [ProducesResponseType(typeof(Product), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<ActionResult<Product>> GetProductById(string id)
    {
        var product = await _productRepository.GetProduct(id);
        
        if (product == null)
        {
            _logger.LogError($"Product with id: {id}, not found");
            return NotFound();
        }

        _recentProductsStorageService.AddProduct(product);
        return Ok(product);
    }
    
    [Route("[action]/{category}", Name = "GetProductsByCategory")]
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string category, string orderBy,
        int page = 0)
    {
        var products = await _productRepository.GetProductsByCategory(category, orderBy, page);
        return Ok(products);
    }
    
    [Route("[action]/{name}", Name = "GetProductsByName")]
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsByName(string name, string orderBy,
        int page = 0)
    {
        var products = await _productRepository.GetProductsByName(name, orderBy, page);
        return Ok(products);
    }
    
    [Route("[action]", Name = "GetProductsByPrice")]
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsByPrice(double from, double to, string orderBy,
        int page = 0)
    {
        var products = await _productRepository.GetProductsByPrice(from, to, orderBy, page);
        return Ok(products);
    }
    
    [Route("[action]/{seller}", Name = "GetProductsBySeller")]
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsBySeller(string seller, string orderBy,
        int page = 0)
    {
        var products = await _productRepository.GetProductsBySeller(seller, orderBy, page);
        return Ok(products);
    }
    
    [Route("[action]/{country}/{city}", Name = "GetProductsByLocation")]
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsByLocation(string country, string city, string orderBy,
        int page = 0)
    {
        var products = await _productRepository.GetProductsByLocation(country, city, orderBy, page);
        return Ok(products);
    }
    
    [HttpPost]
    [ProducesResponseType(typeof(Product), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<Product>> CreateProduct([FromBody] ProductDto product)
    {
        //product.Id = ObjectId.GenerateNewId().ToString();
        var nproduct = _mapper.Map<Product>(product);
        await _productRepository.CreateProduct(nproduct);
        return CreatedAtRoute("GetProduct", new { id = nproduct.Id }, product);
    }
    
    [HttpPut]
    [ProducesResponseType(typeof(Product), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> UpdateProduct([FromBody] Product product)
    {
        return Ok(await _productRepository.UpdateProduct(product));
    }
    
    [HttpDelete("{id:length(24)}", Name = "DeleteProduct")]
    [ProducesResponseType(typeof(Product), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> DeleteProduct(string id)
    {
        return Ok(await _productRepository.DeleteProduct(id));
    }
}