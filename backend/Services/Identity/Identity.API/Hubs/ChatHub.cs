using Identity.API.Data;
using Identity.API.Models;
using Microsoft.AspNetCore.SignalR;

namespace Identity.API.Hubs;

public class ChatHub : Hub
{
    private readonly UsersDbContext _usersDbContext;

    public ChatHub(UsersDbContext usersDbContext)
    {
        _usersDbContext = usersDbContext;
    }
    
    public async Task SendMessage(Message message)
    {
        await Clients.All.SendAsync("receiveMessage", message);
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var chatId = httpContext!.Request.Query["chatId"];
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
        // TODO: Send list of messages back
    }
}