using Ordering.Domain.Entities;

namespace Ordering.Application.Contracts.Persistence;

public interface IOrderRepository : IAsyncRepository<Order>
{
    Task<IEnumerable<Order>> GetOrdersByUsername(string userName);
    Task<IEnumerable<Order>> GetOrdersBySeller(string userName);
}