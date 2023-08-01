using MediatR;
using Ordering.Domain.Entities;

namespace Ordering.Application.Features.Orders.Queries.GetOrdersListForSeller;

public class GetOrdersListForSellerQuery : IRequest<List<Order>>
{
    public string Username { get; set; }

    public GetOrdersListForSellerQuery(string username)
    {
        Username = username;
    }
}