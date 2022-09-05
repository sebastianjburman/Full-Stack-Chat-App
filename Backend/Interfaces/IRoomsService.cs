using full_stack_chat_app_backend.Models;

namespace full_stack_chat_app_backend.Interfaces
{
    public interface IRoomsService
    {
        Room Get(string id);
        List<Room> Search(string searchName,int start);
        Room Create(Room newRoom);
        void Update(string id, Room updatedRoom);
        void AddMessage(string id,Room updatedRoom);
        void Delete(string id);
    }
}