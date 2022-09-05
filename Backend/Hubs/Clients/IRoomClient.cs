using System.Threading.Tasks;
using full_stack_chat_app_backend.Models;

namespace full_stack_chat_app_backend.Hubs.Clients
{
    public interface IRoomClient
    {
        Task ReceiveMessage(Room room);
    }
}