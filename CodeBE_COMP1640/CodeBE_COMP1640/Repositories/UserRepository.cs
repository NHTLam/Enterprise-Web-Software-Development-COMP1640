using CodeBE_COMP1640.Models;
using Microsoft.EntityFrameworkCore;

namespace CodeBE_COMP1640.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> List();
        Task<User> Get(long Id);
        Task<bool> Create(User User);
        Task<bool> Update(User User);
        Task<bool> Delete(User User);
    }

    public class UserRepository : IUserRepository
    {
        private DataContext DataContext;

        public UserRepository(DataContext DataContext)
        {
            this.DataContext = DataContext;
        }

        public async Task<List<User>> List()
        {
            IQueryable<User> query = DataContext.Users.AsNoTracking();
            List<User> Users = await query.AsNoTracking().Select(x => new User
            {
                UserId = x.UserId,
                Username = x.Username,
                UserType = x.UserType,
                Password = x.Password,
            }).ToListAsync();

            return Users;
        }

        public async Task<User> Get(long Id)
        {
            User? User = await DataContext.Users.AsNoTracking()
            .Where(x => x.UserId == Id)
            .Select(x => new User()
            {
                UserId = x.UserId,
                Username = x.Username,
                UserType = x.UserType,
                Password = x.Password,
            }).FirstOrDefaultAsync();

            if (User == null)
                return null;

            return User;
        }

        public async Task<bool> Create(User User)
        {
            DataContext.Users.Add(User);
            await DataContext.SaveChangesAsync();
            User.UserId = User.UserId;
            //await SaveReference(User);
            return true;
        }

        public async Task<bool> Update(User User)
        {
            User? NewUser = DataContext.Users
                .Where(x => x.UserId == User.UserId)
                .FirstOrDefault();
            if (NewUser == null)
                return false;
            NewUser.UserId = User.UserId;
            NewUser.Username = User.Username;
            NewUser.Password = User.Password;
            NewUser.UserType = User.UserType;
            await DataContext.SaveChangesAsync();
            //await SaveReference(User);
            return true;
        }

        public async Task<bool> Delete(User User)
        {
            User? CurrentUser = DataContext.Users
                .Where(x => x.UserId == User.UserId)
                .FirstOrDefault();
            if (User == null)
                return false;
            DataContext.Users.Remove(CurrentUser);
            await DataContext.SaveChangesAsync();
            //await SaveReference(User);
            return true;
        }
    }
}
