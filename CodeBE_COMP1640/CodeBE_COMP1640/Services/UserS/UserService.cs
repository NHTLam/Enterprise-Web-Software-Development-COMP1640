using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;
using CodeBE_COMP1640.Controllers.PermissionController;
using CodeBE_COMP1640.Services.LogS;
using CodeBE_COMP1640.Controllers.UserController;

namespace CodeBE_COMP1640.Services.UserS
{
    public interface IUserService
    {
        Task<List<User>> List();
        Task<User> Get(long Id);
        Task<bool> Create(User User);
        Task<User> Update(User User);
        Task<User> Delete(User User);
        Task<User> GetPasswordHash(User User);
        Task<string> CreateToken(User user);
        Task<List<User>> GetUsersByDepartmentId(int DepartmentId);
        Task<bool> UpdateCheckbox(int id, bool isChecked);
    }
    public class UserService : IUserService
    {
        private IUOW UOW;
        private readonly IConfiguration Configuration;
        private readonly ILogService LogService;

        public UserService(
            IUOW UOW,
            IConfiguration Configuration,
            ILogService LogService
        )
        {
            this.UOW = UOW;
            this.Configuration = Configuration;
            this.LogService = LogService;
        }
        public async Task<bool> Create(User User)
        {
            string payload = User?.ToString() ?? "";
            try
            {
                var Users = await UOW.UserRepository.List();
                List<string> Emails = Users.Select(a => a.Email).ToList();
                if (Emails.Contains(User.Email))
                {
                    return false;
                }
                User.Password = BCrypt.Net.BCrypt.HashPassword(User.Password);
                await UOW.UserRepository.Create(User);
                User = await UOW.UserRepository.Get(User.UserId);
                await LogService.Log(User.ToString() ?? "", payload, "200", UserRoute.Create, "POST");
                return true;
            }
            catch (Exception ex)
            {
                await LogService.Log(ex.ToString() ?? "", payload, "500", UserRoute.Create, "POST");
                throw new Exception();
            }
        }

        public async Task<User?> GetPasswordHash(User User)
        {
            try
            {
                var Users = await UOW.UserRepository.List();
                List<string> Emails = Users.Select(a => a.Email).ToList();
                if (Emails.Contains(User.Email))
                {
                    var passHash = Users.Where(u => u.Email.Equals(User.Email))?.FirstOrDefault()?.Password;
                    if (passHash != null)
                    {
                        User CurrentUser = new User();
                        CurrentUser.Email = User.Email;
                        CurrentUser.Password = passHash;
                        return CurrentUser;
                    }
                }
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<User> Delete(User User)
        {
            string payload = User?.ToString() ?? "";
            try
            {
                await UOW.UserRepository.Delete(User);
                await LogService.Log(User.ToString() ?? "", payload, "200", UserRoute.Delete, "POST");
                return User;
            }
            catch (Exception ex)
            {
                await LogService.Log(ex.ToString() ?? "", payload, "500", UserRoute.Delete, "POST");
                throw new Exception();
            }
        }

        public async Task<User> Get(long Id)
        {
            User User = await UOW.UserRepository.Get(Id);
            if (User == null)
                return null;
            return User;
        }

        public async Task<List<User>> List()
        {
            try
            {
                List<User> Users = await UOW.UserRepository.List();
                return Users;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<User> Update(User User)
        {
            string payload = User.ToString() ?? "";
            try
            {
                var oldData = await UOW.UserRepository.Get(User.UserId);

                await UOW.UserRepository.Update(User);

                User = await UOW.UserRepository.Get(User.UserId);
                await LogService.Log(User.ToString() ?? "", payload, "200", UserRoute.Update, "POST");
                return User;
            }
            catch (Exception ex)
            {
                await LogService.Log(ex.ToString() ?? "", payload, "500", UserRoute.Update, "POST");
                throw new Exception();
            }
        }

        public async Task<string> CreateToken(User? user)
        {
            user = (await UOW.UserRepository.List()).Where(x => x.Email == user.Email)?.FirstOrDefault();
            if (user != null)
            {
                List<Claim> claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Email), new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()) };
                var configToken = Configuration.GetValue<string>("AppSettings:Token");
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configToken));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1), signingCredentials: creds
                );

                var jwt = new JwtSecurityTokenHandler().WriteToken(token);
                return jwt;
            }
            return string.Empty;
        }
        public async Task<List<User>> GetUsersByDepartmentId(int departmentId)
        {
            try
            {
                List<int> userIds = new List<int> { 2, 6, 7 };
                List<User> users = await UOW.UserRepository.GetUsersByDepartmentId(departmentId, userIds);
                users = users.Where(u => u.Check).ToList();
                return users;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while fetching users by department ID", ex);
            }
        }
        public async Task<bool> UpdateCheckbox(int id, bool isChecked)
        {
            return await UOW.UserRepository.UpdateCheckbox(id, isChecked);
        }





    }
}
