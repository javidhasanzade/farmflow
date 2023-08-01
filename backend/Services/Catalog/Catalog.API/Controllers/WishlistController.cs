using Catalog.API.Entities;
using Catalog.API.Entities.Dto;
using Catalog.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class WishlistController : ControllerBase
{
    private readonly ILogger<WishlistController> _logger;
    private readonly IWishlistRepository _wishlistRepository;
    protected ResponseDto _responseDto;

    public WishlistController(ILogger<WishlistController> logger, IWishlistRepository wishlistRepository)
    {
        _logger = logger;
        _wishlistRepository = wishlistRepository;
    }

    [HttpPost]
    public async Task<IActionResult> AddProductToWishlist(string userId, [FromBody] Product product)
    {
        await _wishlistRepository.AddProductAsync(userId, product);

        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> RemoveProductFromWishlist(string userId, [FromBody] Product product)
    {
        await _wishlistRepository.RemoveProductAsync(userId, product);

        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<ResponseDto>> GetProductsFromWishlist(string userId)
    {
        var products = await _wishlistRepository.GetProductsAsync(userId);

        _responseDto = new ResponseDto
        {
            Result = products,
            Count = await _wishlistRepository.GetCountAsync(userId),
            Pages = _wishlistRepository.GetTotalPages(products.ToList()),
            IsSuccess = true
        };

        return Ok(_responseDto);
    }

    [Route("count")]
    [HttpGet]
    public async Task<ActionResult<int>> GetCount(string userId)
    {
        return await _wishlistRepository.GetCountAsync(userId);
    }
}