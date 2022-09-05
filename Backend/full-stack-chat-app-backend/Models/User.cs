using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace full_stack_chat_app_backend.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id {get; set;} = string.Empty;
        [BsonElement("name")]
        [BsonRequired]
        public string DisplayName {get;set;} = string.Empty;
        [BsonElement("email")]
        [BsonRequired]
        public string Email {get;set;} = string.Empty;
        [BsonElement("username")]
        [BsonRequired]
        public string Username {get;set;} = string.Empty;
        [BsonElement("password")]
        [BsonRequired]
        public string Password {get;set;} = string.Empty;
        [BsonElement("roomsjoined")]
        [BsonRequired]
        public List<string> RoomsJoined = new List<string>();
        [BsonElement("roomscreated")]
        [BsonRequired]
        public List<string> RoomsCreated = new List<string>();
        public bool validateModel(){
            bool lengthValidation = this.DisplayName.Trim().Length >=5 && this.Email.Trim().Length >=5 && this.Username.Trim().Length >=5 && this.Password.Trim().Length >=5 && this.DisplayName.Length <=14 && this.DisplayName.Trim().Length >= 5;
            if(lengthValidation){
                return true;
            }
            return false;
        }
    }
}