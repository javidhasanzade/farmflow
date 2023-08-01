using Microsoft.EntityFrameworkCore;
using Ordering.Application.Contracts.Persistence;
using Ordering.Domain.Entities;
using Ordering.Infrastructure.Persistence;

namespace Ordering.Infrastructure.Repositories;

public class OrderRepository : RepositoryBase<Order>, IOrderRepository
{
    public OrderRepository(OrderContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<Order>> GetOrdersByUsername(string userName)
    {
        var orders = await _dbContext.Orders
            .Include(o => o.OrderDetails)
            .Where(o => o.Username == userName).ToListAsync();

        var newOrders = orders.Select(o => new Order
        {
            Username = o.Username,
            TotalPrice = o.TotalPrice,
            Name = o.Name,
            Surname = o.Surname,
            Email = o.Email,
            Address = o.Address,
            Country = o.Country,
            State = o.State,
            ZipCode = o.ZipCode,
            Status = o.Status,
            PaymentIntentId = o.PaymentIntentId,
            StripeSessionId = o.StripeSessionId,
            OrderDetails = o.OrderDetails.Select(od => new OrderDetails
            {
                OrderDetailsId = od.OrderDetailsId,
                OrderId = od.OrderId,
                ProductId = od.ProductId,
                ProductName = od.ProductName,
                Price = od.Price,
                Quantity = od.Quantity,
                Seller = od.Seller,
                Product = od.Product
            }).ToList()
        }).ToList();
        
        return newOrders;
    }

    public async Task<IEnumerable<Order>> GetOrdersBySeller(string userName)
    {
        var orders = await _dbContext.Orders
            .Include(o => o.OrderDetails)
            .Where(order => order.OrderDetails
                .Any(od => od.Seller == userName))
            
            .ToListAsync();

        var newOrders = orders.Select(o => new Order
        {
            Username = o.Username,
            TotalPrice = o.TotalPrice,
            Name = o.Name,
            Surname = o.Surname,
            Email = o.Email,
            Address = o.Address,
            Country = o.Country,
            State = o.State,
            ZipCode = o.ZipCode,
            Status = o.Status,
            PaymentIntentId = o.PaymentIntentId,
            StripeSessionId = o.StripeSessionId,
            OrderDetails = o.OrderDetails.Select(od => new OrderDetails
            {
                OrderDetailsId = od.OrderDetailsId,
                OrderId = od.OrderId,
                ProductId = od.ProductId,
                ProductName = od.ProductName,
                Price = od.Price,
                Quantity = od.Quantity,
                Seller = od.Seller,
                Product = od.Product
            }).ToList()
        }).ToList();
        
        return newOrders;
    }
}