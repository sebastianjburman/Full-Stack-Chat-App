using full_stack_chat_app_backend.Interfaces;

namespace full_stack_chat_app_backend.Models
{
    public class UsersStoreDatabaseSettings : IUsersStoreDatabaseSettings
    {
        public string UsersCollectionName { get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;

    }
}