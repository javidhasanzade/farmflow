using MediatR;
using Ordering.Domain.Entities;
using Ordering.Domain.Entities.Dto;

namespace Ordering.Application.Features.Orders.Commands.CheckoutOrder;

public class CheckoutOrderCommand : IRequest<int>
{
    public string Username { get; set; } = string.Empty;
    public double TotalPrice { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    
    public IEnumerable<OrderDetails> OrderDetails { get; set; }
}