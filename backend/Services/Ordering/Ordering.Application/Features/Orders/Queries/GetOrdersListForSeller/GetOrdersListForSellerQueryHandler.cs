using AutoMapper;
using MediatR;
using Ordering.Application.Contracts.Persistence;
using Ordering.Domain.Entities;

namespace Ordering.Application.Features.Orders.Queries.GetOrdersListForSeller;

public class GetOrdersListForSellerQueryHandler : IRequestHandler<GetOrdersListForSellerQuery, List<Order>>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;

    public GetOrdersListForSellerQueryHandler(IOrderRepository orderRepository, IMapper mapper)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
    }
    
    public async Task<List<Order>> Handle(GetOrdersListForSellerQuery request, CancellationToken cancellationToken)
    {
        var orders = await _orderRepository.GetOrdersBySeller(request.Username);
        return orders.ToList();
    }
}