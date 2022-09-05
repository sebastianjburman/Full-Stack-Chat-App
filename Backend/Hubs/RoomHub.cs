using Microsoft.AspNetCore.SignalR;
using full_stack_chat_app_backend.Hubs.Clients;

namespace full_stack_chat_app_backend.Hubs
{
    public class RoomHub : Hub<IRoomClient>
    { 
        public Task JoinGroup(string groupName){
            return Groups.AddToGroupAsync(Context.ConnectionId,groupName);
        }
    }
}