using System.Net;
using System.Security.Claims;
using AutoMapper;
using Basket.API.Entities;
using Basket.API.GrpcServices;
using Basket.API.Repositories;
using Basket.API.SyncDataServices;
using EventBus.Messages.Events;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Basket.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class BasketController : ControllerBase
{
    private readonly IBasketRepository _basketRepository;
    private readonly DiscountGrpcService _discountGrpcService;
    private readonly IDiscountDataClient _discountDataClient;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    public BasketController(IBasketRepository basketRepository, DiscountGrpcService discountGrpcService,
        IDiscountDataClient discountDataClient, IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _basketRepository = basketRepository ?? throw new ArgumentNullException(nameof(basketRepository));
        this._discountGrpcService = discountGrpcService;
        _discountDataClient = discountDataClient;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }
    
    [HttpGet("{username}", Name = "GetBasket")]
    [ProducesResponseType(typeof(ShoppingCart), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<ShoppingCart>> GetBasket(string username)
    {
        var basket = await _basketRepository.GetBasket(username);
        Console.WriteLine(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        return Ok(basket ?? new ShoppingCart(username));
    }
    
    [HttpPost]
    [ProducesResponseType(typeof(ShoppingCart), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<ShoppingCart>> UpdateBasket(string username, [FromBody] ShoppingCartItem basket, string action)
    {
        //var coupon = await _discountGrpcService.GetDiscount(basket.ProductId);
        //var coupon = _discountDataClient.GetDiscount(basket.ProductId);
        //basket.Price -= coupon.Result.Amount;

        return Ok(await _basketRepository.UpdateBasket(username, basket,action));
    }

    [HttpPut(Name = "RemoveProduct")]
    [ProducesResponseType(typeof(ShoppingCart), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<ShoppingCart>> UpdateBasket(string username, string productId)
    {
        return Ok(await _basketRepository.UpdateBasket(username, productId));
    }

    [HttpDelete("{username}", Name = "DeleteBasket")]
    [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> DeleteBasket(string username)
    {
        await _basketRepository.DeleteBasket(username);
        return Ok();
    }

    [HttpPost]
    [Route("[action]")]
    [ProducesResponseType((int)HttpStatusCode.Accepted)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public async Task<IActionResult> Checkout([FromBody] BasketCheckout basketCheckout)
    {
        var basket = await _basketRepository.GetBasket(basketCheckout.Username);
        if (basket is null)
            return BadRequest();

        var eventMessage = _mapper.Map<BasketCheckoutEvent>(basketCheckout);
        eventMessage.TotalPrice = basket.TotalPrice;
        await _publishEndpoint.Publish(eventMessage);

        await _basketRepository.DeleteBasket(basket.Username);

        return Accepted();
    }
}