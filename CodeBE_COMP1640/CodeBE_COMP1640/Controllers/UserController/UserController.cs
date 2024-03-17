using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Services.UserS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CodeBE_COMP1640.Controllers.UserController
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService UserService;

        public UserController(
            IUserService UserService
        )
        {
            this.UserService = UserService;
        }

        [Route(UserRoute.List), HttpPost, Authorize]
        public async Task<ActionResult<List<UserDTO>>> List()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            List<User> Users = await UserService.List();
            List<UserDTO> UserDTOs = Users.Select(x => new UserDTO(x)).ToList();
            return UserDTOs;
        }

        [Route(UserRoute.Get), HttpPost, Authorize]
        public async Task<ActionResult<UserDTO>> Get([FromBody] UserDTO UserDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User User = ConvertDTOToEntity(UserDTO);
            User = await UserService.Get(User.UserId);
            UserDTO = new UserDTO(User);
            return UserDTO;
        }

        [Route(UserRoute.Create), HttpPost, Authorize]
        public async Task<ActionResult<bool>> Create([FromBody] UserDTO UserDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User User = ConvertDTOToEntity(UserDTO);
            bool isRegisterSuccess = await UserService.Create(User);
            if (isRegisterSuccess)
                return true;
            else
                return BadRequest("Username already exists");
        }

        [Route(UserRoute.Login), HttpPost]
        public async Task<ActionResult<bool>> Login([FromBody] UserDTO UserDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User User = ConvertDTOToEntity(UserDTO);
            User CurrentUser = await UserService.GetPasswordHash(User);

            if (CurrentUser == null)
                return BadRequest("User not found");

            if (!BCrypt.Net.BCrypt.Verify(User.Password, CurrentUser.Password))
                return BadRequest("Wrong password");

            var token = await UserService.CreateToken(User);

            return Ok(token);
        }

        [Route(UserRoute.Update), HttpPost, Authorize]
        public async Task<ActionResult<UserDTO>> Update([FromBody] UserDTO UserDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User User = ConvertDTOToEntity(UserDTO);
            User = await UserService.Update(User);
            UserDTO = new UserDTO(User);
            if (User != null)
                return UserDTO;
            else
                return BadRequest(User);
        }

        [Route(UserRoute.Delete), HttpPost, Authorize]
        public async Task<ActionResult<UserDTO>> Delete([FromBody] UserDTO UserDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User User = ConvertDTOToEntity(UserDTO);
            User = await UserService.Delete(User);
            UserDTO = new UserDTO(User);
            if (User != null)
                return UserDTO;
            else
                return BadRequest(User);
        }

        private User ConvertDTOToEntity(UserDTO UserDTO)
        {
            User User = new User();
            User.UserId = UserDTO.UserId;
            User.Username = UserDTO.Username;
            User.Password = UserDTO.Password;
            User.Email = UserDTO.Email;
            User.Class = UserDTO.Class;
            User.Phone = UserDTO.Phone;
            User.Address = UserDTO.Address;
            User.DepartmentId = UserDTO.DepartmentId ?? 0;
            User.RoleUserMappings = UserDTO.RoleUserMappings?.Select(x => new RoleUserMapping
            {
                Id = x.Id,
                RoleId = x.RoleId,
                UserId = x.UserId,
            }).ToList();

            return User;
        }
    }
}
