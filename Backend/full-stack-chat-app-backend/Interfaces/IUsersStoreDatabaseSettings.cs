using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace full_stack_chat_app_backend.Interfaces
{
    public interface IUsersStoreDatabaseSettings
    {
        string UsersCollectionName { get;set;}
        string ConnectionString { get;set;}
        string DatabaseName { get;set;}
    }
}