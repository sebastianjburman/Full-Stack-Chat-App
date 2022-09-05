using full_stack_chat_app_backend.Interfaces;
using full_stack_chat_app_backend.Models;
using MongoDB.Driver;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using full_stack_chat_app_backend.Helpers;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using System.Text.RegularExpressions;

namespace full_stack_chat_app_backend.Services
{
    public class RoomsService : IRoomsService
    {
        private readonly IMongoCollection<Room> _rooms;

        public RoomsService(IRoomsStoreDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _rooms = database.GetCollection<Room>(settings.RoomsCollectionName);

            // Create the unique indexes
            var options = new CreateIndexOptions { Unique = true };
            _rooms.Indexes.CreateOne("{roomname:1}", options);
        }
        public Room Get(string id)
        {
            try
            {
                return _rooms.Find(room => room.Id == id).FirstOrDefault();
            }
            catch
            {
                return null;
            }

        }
        public List<Room> Search(string searchName,int start){
            var filter = Builders<Room>.Filter.Regex("roomname", new BsonRegularExpression(searchName));
            var result = _rooms.Find(filter).SortByDescending(room=>room.DateCreated).Limit(11).Skip(start).ToList();
            return result;
        }

        public Room Create(Room newRoom)
        {
            _rooms.InsertOne(newRoom);
            return newRoom;
        }
        public void Update(string id, Room updatedRoom)
        {
            _rooms.ReplaceOne(user => user.Id == id, updatedRoom);
        }
        public void AddMessage(string id, Room updatedRoom)
        {
            var updateDefinition = Builders<Room>.Update.Set(room => room.RoomMessages, updatedRoom.RoomMessages);

            _rooms.UpdateOne(room => room.Id == id, updateDefinition);
        }
        public void Delete(string id)
        {
            _rooms.DeleteOne(room => room.Id == id);
        }
    }
}