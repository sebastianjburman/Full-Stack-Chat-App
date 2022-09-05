using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using full_stack_chat_app_backend.Interfaces;
using full_stack_chat_app_backend.Helpers;
using full_stack_chat_app_backend.Models;
using full_stack_chat_app_backend.Hubs;
using Microsoft.AspNetCore.SignalR;
using full_stack_chat_app_backend.Hubs.Clients;

namespace full_stack_chat_app_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomsService roomsService;
        private readonly IUsersService usersService;
        private readonly IHubContext<RoomHub, IRoomClient> _roomHub;
        public RoomsController(IRoomsService roomsService, IUsersService usersService, IHubContext<RoomHub, IRoomClient> roomHub)
        {
            this.roomsService = roomsService;
            this.usersService = usersService;
            this._roomHub = roomHub;
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<Room> Get(string id)
        {
            Room room = roomsService.Get(id);
            if (room == null)
            {
                return NotFound($"Room with id {id} was not found");
            }
            return room;
        }
        [Authorize]
        [HttpPost("searchroom")]
        public ActionResult<List<Room>> SearchRoom([FromBody] string search, int start)
        {
            List<Room> rooms = roomsService.Search(search, start);
            if (rooms == null)
            {
                return NotFound();
            }
            return rooms;
        }
        [Authorize]
        [HttpGet("joinedrooms")]
        public ActionResult<List<Room>> GetJoinedRooms()
        {
            var user = (User)HttpContext.Items["User"];
            var usersJoinedRooms = user.RoomsJoined;
            List<Room> returnedRooms = new List<Room>();
            IEnumerable<string> last5Rooms =  usersJoinedRooms.Skip(usersJoinedRooms.Count - 5);
            for (int i = 0; i < 5; i++)
            {
                try
                {
                    string roomId = last5Rooms.ElementAt(i);
                    Room room = roomsService.Get(roomId);
                    if (room != null)
                    {
                        returnedRooms.Add(room);
                    }
                    else
                    {
                        user.RoomsJoined.Remove(roomId);
                        usersService.Update(user.Id, user);
                    }
                }
                catch
                {
                }
            }
            return returnedRooms;
        }
        [Authorize]
        [HttpGet("createdRooms")]
        public ActionResult<List<Room>> GetCreatedRooms()
        {
            var user = (User)HttpContext.Items["User"];
            var usersCreatedRooms = user.RoomsCreated;
            List<Room> returnedRooms = new List<Room>();
            IEnumerable<string> last5Rooms =  usersCreatedRooms.Skip(usersCreatedRooms.Count - 5);
            for (int i = 0; i < 5; i++)
            {
                try
                {
                    Room room = roomsService.Get(last5Rooms.ElementAt(i));
                    returnedRooms.Add(room);
                }
                catch
                {
                    break;
                }
            }
            return returnedRooms;
        }
        [Authorize]
        [HttpPost]
        public ActionResult<User> Post([FromBody] string roomName)
        {
            int maxNumOfRoomsAbleToCreate = 10;
            int maxLengthOfRoomName = 22;
            var user = (User)HttpContext.Items["User"];
            if(roomName.Trim().Length ==0 || roomName.Length >22){
                return BadRequest("Room name must be greater than 0 characters");
            }
            if(user.RoomsCreated.Count >=maxNumOfRoomsAbleToCreate){
                return BadRequest("User can't create more than 10 rooms");
            }
            Room newRoom = new Room();
            newRoom.Id = IdGenerator.Generate(24);
            newRoom.RoomName = roomName;
            newRoom.CreatorDisplayName = user.DisplayName;
            user.RoomsCreated.Add(newRoom.Id);

            roomsService.Create(newRoom);
            usersService.Update(user.Id, user);

            return CreatedAtAction(nameof(Get), new { id = newRoom.Id }, newRoom);
        }
        [Authorize]
        [HttpPut("joinroom/{id}")]
        public async Task<ActionResult> JoinRoom(string id)
        {
            var user = (User)HttpContext.Items["User"];
            Room room = roomsService.Get(id);
            //Update Room
            if (room == null)
            {
                NotFound($"Room with id {id} was not found");
            }
            if (user.DisplayName == room.CreatorDisplayName)
            {
                return BadRequest("Creator cannot join room.");
            }
            else if (room.JoinedUsersDisplayNames.Contains(user.DisplayName))
            {
                return BadRequest("User already in room.");
            }
            room.JoinedUsersDisplayNames.Add(user.DisplayName);
            roomsService.Update(id, room);
            //Update User
            user.RoomsJoined.Add(id);
            usersService.Update(user.Id, user);
            await _roomHub.Clients.Group(id).ReceiveMessage(room);
            return Ok($"Successfully Joined Room with id {id}");
        }
        [Authorize]
        [HttpPut("leaveroom/{id}")]
        public async Task<ActionResult> LeaveRoom(string id)
        {
            var user = (User)HttpContext.Items["User"];
            Room room = roomsService.Get(id);
            //Update Room
            if (room == null)
            {
                NotFound($"Room with id {id} was not found");
            }
            room.JoinedUsersDisplayNames.Remove(user.DisplayName);
            roomsService.Update(id, room);
            //Update User
            user.RoomsJoined.Remove(id);
            usersService.Update(user.Id, user);
            await _roomHub.Clients.Group(id).ReceiveMessage(room);
            return Ok($"Successfully left Room with id {id}");
        }
        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var user = (User)HttpContext.Items["User"];
            Room room = roomsService.Get(id);
            if (room == null)
            {
                return NotFound($"Room with id {id} was not found");
            }
            if (user.RoomsCreated.Contains(id))
            {
                roomsService.Delete(id);
                user.RoomsCreated.Remove(id);
                usersService.Update(user.Id, user);
                return Ok($"Room with id {id} was deleted");
            }
            else
            {
                return NotFound($"Room with id {id} was not created with this account");
            }
        }
        [Authorize]
        [HttpPost("{id}/sendmessage")]
        public async Task<ActionResult> SendMessage(string id, [FromBody] string messageContent)
        {
            var user = (User)HttpContext.Items["User"];
            if(!(messageContent.Length > 0 && messageContent.Trim().Length> 0)){
                return BadRequest("Message content can't be 0 characters or whitespaces");
            }
            Message newMessage = new Message(user.DisplayName, messageContent);
            Room room = roomsService.Get(id);
            if (room == null)
            {
                return NotFound($"Room with id {id} was not found");
            }
            if (user.RoomsJoined.Contains(id) || user.RoomsCreated.Contains(id))
            {
                int maxMessagePerRoom = 20;
                if (room.RoomMessages.Count == maxMessagePerRoom)
                {
                    room.RoomMessages.Dequeue();
                }
                room.RoomMessages.Enqueue(newMessage);
                roomsService.AddMessage(id, room);
                //Add here
                await _roomHub.Clients.Group(id).ReceiveMessage(room);
                return Ok($"Message Succesfully Sent");
            }
            else
            {
                return NotFound($"You are not a member of this group");
            }
        }
    }
}
