using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Ordering.Application.Contracts.Infrastructure;
using Ordering.Application.Contracts.Persistence;
using Ordering.Application.Models;
using Ordering.Domain.Entities;
using Ordering.Domain.Util;

namespace Ordering.Application.Features.Orders.Commands.CheckoutOrder;

public class CheckoutOrderCommandHandler : IRequestHandler<CheckoutOrderCommand, int>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly ILogger<CheckoutOrderCommandHandler> _logger;

    public CheckoutOrderCommandHandler(IOrderRepository orderRepository, IMapper mapper, IEmailService emailService,
        ILogger<CheckoutOrderCommandHandler> logger)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
        _emailService = emailService;
        _logger = logger;
    }
    
    public async Task<int> Handle(CheckoutOrderCommand request, CancellationToken cancellationToken)
    {
        //var order = _mapper.Map<Order>(request);
        var order = new Order
        {
            Username = request.Username,
            TotalPrice = request.TotalPrice,
            Name = request.Name,
            Surname = request.Surname,
            Email = request.Email,
            Address = request.Address,
            Country = request.Country,
            State = request.State,
            ZipCode = request.ZipCode,
            OrderDetails = request.OrderDetails,
            CreatedDate = DateTime.Now,
            Status = SD.StatusPending,
            CreatedBy = request.Username
        };
        var result = await _orderRepository.AddAsync(order);
        
        _logger.LogInformation($"Order {result.Id} was successfully created");

        await SendEmail(result);
        return result.Id;
    }

    private async Task SendEmail(Order order)
    {
        var email = new Email()
            { To = "jh.grunger@gmail.com", Body = $"Order was created", Subject = $"Order {order.Id}" };

        try
        {
            await _emailService.SendEmail(email);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Order {order.Id} failed");
        }
    }
}