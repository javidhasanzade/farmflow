using Microsoft.AspNetCore.Mvc;
using Ordering.Application.Contracts.Persistence;
using Ordering.Domain.Entities;

namespace Ordering.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class OrderProofsController : ControllerBase
{
    private readonly IOrderProofsRepository _orderProofsRepository;
    private readonly ILogger<OrderProofsController> _logger;

    public OrderProofsController(IOrderProofsRepository orderProofsRepository, ILogger<OrderProofsController> logger)
    {
        _orderProofsRepository = orderProofsRepository;
        _logger = logger;
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<IEnumerable<OrderProof>>> GetOrderProofs(string userId)
    {
        var orderProofs = await _orderProofsRepository.GetOrderProofs(userId);

        return Ok(orderProofs);
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderProof>>> GetOrderProofs()
    {
        var orderProofs = await _orderProofsRepository.GetOrderProofs();

        return Ok(orderProofs);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrderProof([FromBody] OrderProof orderProof)
    {
        await _orderProofsRepository.AddOrderProof(orderProof);

        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateOrderProof([FromBody] OrderProof orderProof)
    {
        await _orderProofsRepository.SetOrderProofStatus(orderProof);

        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteOrderProof([FromBody] OrderProof orderProof)
    {
        await _orderProofsRepository.DeleteOrderProof(orderProof);

        return Ok();
    }
}