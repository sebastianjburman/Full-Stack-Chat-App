using Microsoft.AspNetCore.Mvc;
using full_stack_chat_app_backend.Interfaces;
using full_stack_chat_app_backend.Models;
using full_stack_chat_app_backend.Helpers;
using Newtonsoft.Json;

namespace full_stack_chat_app_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService usersService;
        private readonly IRoomsService roomsService;
    public UsersController(IUsersService usersService, IRoomsService roomsService){
        this.usersService = usersService;
        this.roomsService = roomsService;
    }
        // GET api/<UsersController>/5
        [Authorize]
        [HttpGet]
        public ActionResult<string> Get()
        {
            var contextUser = (User)HttpContext.Items["User"];
            if (contextUser == null){
                return NotFound($"User with id {contextUser.Id} was not found");
            }
            //Only need back the displayName, roomsJoined, roomsCreated
            User returnedUser = new User();
            returnedUser.DisplayName = contextUser.DisplayName;
            returnedUser.RoomsCreated = contextUser.RoomsCreated;
            returnedUser.RoomsJoined = contextUser.RoomsJoined;
            string serializedUser = JsonConvert.SerializeObject(returnedUser);
            return serializedUser;
        }

        // POST api/<UsersController>
        [HttpPost]
        public ActionResult<User> Post([FromBody] User newUser)
        {
            newUser.Id = IdGenerator.Generate(24);
            if(newUser.validateModel()){
                usersService.Create(newUser);
                return CreatedAtAction(nameof(Get),new {id = newUser.Id},User);
            }
            return BadRequest();
        }
        [Authorize]
        // PUT api/<UsersController>/5
        [HttpPut]
        public ActionResult Put([FromBody] User updatedUser)
        {
            var existingUser = (User)HttpContext.Items["User"];
            if(existingUser == null){
                return NotFound($"User with id {existingUser.Id} was not found");
            }
            usersService.Update(existingUser.Id,updatedUser);
            return NoContent();
            
        }
        [Authorize]
        // DELETE api/<UsersController>/5
        [HttpDelete]
        public ActionResult Delete()
        {
            var user = (User)HttpContext.Items["User"];
            if(user == null){
                return NotFound($"User with id {user.Id} was not found");
            }
            usersService.Remove(user.Id);
            //Delete all rooms created
            for(int i = 0; i <user.RoomsCreated.Count;i++){
                roomsService.Delete(user.RoomsCreated[i]);
            }
            //Leave all rooms joined

            for(int i = 0; i <user.RoomsJoined.Count;i++){
                Room room = roomsService.Get(user.RoomsJoined[i]);
                room.JoinedUsersDisplayNames.Remove(user.DisplayName);
                roomsService.Update(room.Id,room);
            }
            return Ok($"User with id {user.Id} was deleted successfully");
        }
        [HttpPost("/api/Users/authenticate")]
        public ActionResult<string> Authenticate([FromBody] User loginUser)
        {
            string authenticate = usersService.Authenticate(loginUser.Username,loginUser.Password);
            return authenticate;
        }
        [HttpGet("/health")]
        public ActionResult<string> Health()
        {
            return "Healthy";
        }

    }
}
