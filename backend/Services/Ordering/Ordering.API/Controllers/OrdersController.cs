using System.Net;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Ordering.Application.Features.Orders.Commands.CheckoutOrder;
using Ordering.Application.Features.Orders.Commands.DeleteOrder;
using Ordering.Application.Features.Orders.Commands.UpdateOrder;
using Ordering.Application.Features.Orders.Queries.GetOrdersList;
using Ordering.Application.Features.Orders.Queries.GetOrdersListForSeller;
using Ordering.Domain.Entities;

namespace Ordering.API.Controllers;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/v1/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{userName}", Name = "GetOrder")]
    [ProducesResponseType(typeof(IEnumerable<Order>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUsername(string userName)
    {
        var query = new GetOrdersListQuery(userName);
        var orders = await _mediator.Send(query);
    
        return Ok(orders);
    }

    [HttpGet("[action]/{userName}", Name = "GetOrderForSeller")]
    [ProducesResponseType(typeof(IEnumerable<Order>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrdersForSeller(string userName)
    {
        var query = new GetOrdersListForSellerQuery(userName);
        var orders = await _mediator.Send(query);
        
        return Ok(orders);
    }

    //[Authorize]
    [HttpPost(Name = "CreateOrder")]
    [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<int>> CreateOrder([FromBody] CheckoutOrderCommand command)
    {
        var result = await _mediator.Send(command);

        return Ok(result);
    }
    
    // [HttpPut(Name = "UpdateOrder")]
    // [ProducesResponseType(StatusCodes.Status204NoContent)]
    // [ProducesResponseType(StatusCodes.Status404NotFound)]
    // [ProducesDefaultResponseType]
    // public async Task<ActionResult<int>> UpdateOrder([Microsoft.AspNetCore.Mvc.FromBody] UpdateOrderCommand command)
    // {
    //     var result = await _mediator.Send(command);
    //
    //     return Ok(result);
    // }
    
    // [HttpDelete("{id}", Name = "DeleteOrder")]
    // [ProducesResponseType(StatusCodes.Status204NoContent)]
    // [ProducesResponseType(StatusCodes.Status404NotFound)]
    // [ProducesDefaultResponseType]
    // public async Task<ActionResult<int>> DeleteOrder(int id)
    // {
    //     var command = new DeleteOrderCommand() { Id = id };
    //     await _mediator.Send(command);
    //
    //     return NoContent();
    // }
}