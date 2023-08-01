using MediatR;
using Ordering.Domain.Entities;

namespace Ordering.Application.Features.Orders.Queries.GetOrdersList;

public class GetOrdersListQuery : IRequest<List<Order>>
{
    public string Username { get; set; }

    public GetOrdersListQuery(string username)
    {
        Username = username;
    }
}