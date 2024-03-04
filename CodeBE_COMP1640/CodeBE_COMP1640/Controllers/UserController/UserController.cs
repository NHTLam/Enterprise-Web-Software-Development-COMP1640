using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Services.UserS;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

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

        [Route(UserRoute.List), HttpPost]
        public async Task<ActionResult<List<User>>> List()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            List<User> Users = await UserService.List();
            return Users;
        }

        [Route(UserRoute.Get), HttpPost]
        public async Task<ActionResult<User>> Get([FromBody] User User)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User = await UserService.Get(User.UserId);
            return User;
        }

        [Route(UserRoute.Register), HttpPost]
        public async Task<ActionResult<bool>> Register([FromBody] User User)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            bool isRegisterSuccess = await UserService.Create(User);
            if (isRegisterSuccess)
                return true;
            else
                return BadRequest("Username already exists");
        }

        [Route(UserRoute.Login), HttpPost]
        public async Task<ActionResult<bool>> Login([FromBody] User User)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User CurrentUser = await UserService.GetPasswordHash(User);

            if (CurrentUser == null)
                return BadRequest("User not found");

            if (!BCrypt.Net.BCrypt.Verify(User.Password, CurrentUser.Password))
                return BadRequest("Wrong password");

            var token = await UserService.CreateToken(User);

            return Ok(token);
        }

        [Route(UserRoute.Update), HttpPost]
        public async Task<ActionResult<User>> Update([FromBody] User User)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User = await UserService.Update(User);
            if (User != null)
                return User;
            else
                return BadRequest(User);
        }

        [Route(UserRoute.Delete), HttpPost]
        public async Task<ActionResult<User>> Delete([FromBody] User User)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User = await UserService.Delete(User);
            if (User != null)
                return User;
            else
                return BadRequest(User);
        }
    }
}
