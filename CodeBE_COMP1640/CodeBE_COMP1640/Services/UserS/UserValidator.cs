using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;

namespace CodeBE_COMP1640.Services.UserS
{
    public interface IUserValidator
    {
        Task Get(User User);
        Task<bool> Create(User User);
        Task<bool> Update(User User);
        Task<bool> Delete(User User);
    }
    public class UserValidator : IUserValidator
    {
        private IUOW UOW;

        public UserValidator(IUOW UOW)
        {
            this.UOW = UOW;
        }

        public async Task Get(User User)
        {
        }

        public async Task<bool> Create(User User)
        {
            return true;
        }

        public async Task<bool> Update(User User)
        {
            return true;
        }

        public async Task<bool> Delete(User User)
        {
            return true;
        }
    }
}
