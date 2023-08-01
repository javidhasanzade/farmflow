using Ordering.Domain.Entities;

namespace Ordering.Application.Contracts.Persistence;

public interface IOrderProofsRepository
{
    Task AddOrderProof(OrderProof orderProof);
    Task SetOrderProofStatus(OrderProof orderProof);
    Task DeleteOrderProof(OrderProof orderProof);
    Task<IEnumerable<OrderProof>> GetOrderProofs(string userId);
    Task<IEnumerable<OrderProof>> GetOrderProofs();
}