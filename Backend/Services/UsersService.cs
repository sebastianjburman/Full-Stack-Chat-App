using full_stack_chat_app_backend.Interfaces;
using full_stack_chat_app_backend.Models;
using MongoDB.Driver;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using full_stack_chat_app_backend.Helpers;
using Microsoft.Extensions.Options;

namespace full_stack_chat_app_backend.Services
{
    public class UsersService : IUsersService
    {
        private readonly IMongoCollection<User> _users;
        private readonly JwtSecret _appSettings;
        public UsersService(IUsersStoreDatabaseSettings settings, IMongoClient mongoClient, IOptions<JwtSecret> appSettings)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<User>(settings.UsersCollectionName);

            // Create the unique indexes
            var options = new CreateIndexOptions { Unique = true };
            _users.Indexes.CreateOne("{email:1}", options);
            _users.Indexes.CreateOne("{username:1}", options);
            _users.Indexes.CreateOne("{name:1}", options);

            _appSettings = appSettings.Value;
        }
        public User Get(string id)
        {
            return _users.Find(user => user.Id == id).FirstOrDefault();
        }
        public User Create(User newUser)
        {
            _users.InsertOne(newUser);
            return newUser;
        }
        public void Update(string id, User updatedUser)
        {
            _users.ReplaceOne(user => user.Id == id, updatedUser);
        }
        public void Remove(string id)
        {
            _users.DeleteOne(user => user.Id == id);
        }

        public string Authenticate(string username, string password)
        {
            User foundUser = _users.Find(user => user.Username == username && user.Password == password).FirstOrDefault();
            if (foundUser != null)
            {
                return GenerateJwtToken(foundUser);
            }
            else
            {
                return "User not found";
            }
        }

        public string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}