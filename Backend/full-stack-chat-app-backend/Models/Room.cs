using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace full_stack_chat_app_backend.Models
{
    public class Room
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id {get; set;} = string.Empty;
        [BsonElement("roomname")]
        [BsonRequired]
        public string RoomName {get;set;} = string.Empty;
        [BsonElement("creatordisplayname")]
        [BsonRequired]
        public string CreatorDisplayName {get;set;} = string.Empty;
        [BsonElement("joinedusersdisplaynames")]
        [BsonRequired]
        public List<string> JoinedUsersDisplayNames {get;set;} = new List<string>();
        [BsonElement("roommessages")]
        [BsonRequired]
        public Queue<Message> RoomMessages {get;set;} = new Queue<Message>();
        [BsonElement("datecreated")]
        [BsonRequired]
        public DateTime DateCreated {get;set;} = DateTime.UtcNow;
        
    }
}