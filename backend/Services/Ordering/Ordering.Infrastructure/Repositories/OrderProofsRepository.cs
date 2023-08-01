using Microsoft.EntityFrameworkCore;
using Ordering.Application.Contracts.Persistence;
using Ordering.Domain.Entities;
using Ordering.Domain.Util;
using Ordering.Infrastructure.Persistence;

namespace Ordering.Infrastructure.Repositories;

public class OrderProofsRepository : IOrderProofsRepository
{
    private readonly OrderContext _context;

    public OrderProofsRepository(OrderContext context)
    {
        _context = context;
    }
    
    public async Task AddOrderProof(OrderProof orderProof)
    {
        orderProof.CreatedDate = DateTime.Now;
        await _context.OrderProofs.AddAsync(orderProof);
        await _context.SaveChangesAsync();
    }

    public async Task SetOrderProofStatus(OrderProof orderProof)
    {
        _context.OrderProofs.Update(orderProof);
        var orderId = orderProof.OrderId;

        var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);

        order!.Status = SD.StatusCompleted;

        _context.Orders.Update(order);
        
        await _context.SaveChangesAsync();
    }

    public async Task DeleteOrderProof(OrderProof orderProof)
    {
        _context.OrderProofs.Remove(orderProof);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<OrderProof>> GetOrderProofs(string userId)
    {
        var orderProofs = await _context.OrderProofs.Where(op => op.UserId == userId).ToListAsync();

        return orderProofs;
    }
    
    public async Task<IEnumerable<OrderProof>> GetOrderProofs()
    {
        var orderProofs = await _context.OrderProofs.Where(op => op.Status == "Pending").ToListAsync();

        return orderProofs;
    }
}