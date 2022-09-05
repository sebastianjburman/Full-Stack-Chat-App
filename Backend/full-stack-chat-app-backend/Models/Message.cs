

namespace full_stack_chat_app_backend.Models
{
    public class Message
    {
         public string SenderDisplayName {get; set;} = string.Empty;
         public string MessageContent {get; set;} = string.Empty;
         public Message(string SenderDisplayName,string MessageContent){
            this.SenderDisplayName = SenderDisplayName;
            this.MessageContent = MessageContent;
         }
    }
}