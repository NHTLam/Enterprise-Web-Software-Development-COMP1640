using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;

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
    }
    public class UserService : IUserService
    {
        private IUOW UOW;
        private readonly IConfiguration Configuration;

        public UserService(
            IUOW UOW,
            IConfiguration Configuration
        )
        {
            this.UOW = UOW;
            this.Configuration = Configuration;
        }
        public async Task<bool> Create(User User)
        {
            try
            {
                var Users = await UOW.UserRepository.List();
                List<string> Usernames = Users.Select(a => a.Username).ToList();
                if (Usernames.Contains(User.Username))
                {
                    return false;
                }
                User.Password = BCrypt.Net.BCrypt.HashPassword(User.Password);
                await UOW.UserRepository.Create(User);
                User = await UOW.UserRepository.Get(User.UserId);
                return true;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<User?> GetPasswordHash(User User)
        {
            try
            {
                var Users = await UOW.UserRepository.List();
                List<string> Usernames = Users.Select(a => a.Username).ToList();
                if (Usernames.Contains(User.Username))
                {
                    var passHash = Users.Where(u => u.Username.Equals(User.Username))?.FirstOrDefault()?.Password;
                    if (passHash != null)
                    {
                        User CurrentUser = new User();
                        CurrentUser.Username = User.Username;
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
            try
            {
                await UOW.UserRepository.Delete(User);
                return User;
            }
            catch (Exception)
            {
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
            try
            {
                var oldData = await UOW.UserRepository.Get(User.UserId);

                await UOW.UserRepository.Update(User);

                User = await UOW.UserRepository.Get(User.UserId);
                return User;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<string> CreateToken(User user)
        {
            List<Claim> claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Username) };
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
    }
}
