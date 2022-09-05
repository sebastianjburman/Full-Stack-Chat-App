using full_stack_chat_app_backend.Models;

namespace full_stack_chat_app_backend.Interfaces
{
    public interface IUsersService
    {
        User Get(string id);
        User Create(User newUser);
        void Update(string id,User updatedUser);
        void Remove(string id);
        string Authenticate(string username, string password);
        string GenerateJwtToken(User user);
    }
}