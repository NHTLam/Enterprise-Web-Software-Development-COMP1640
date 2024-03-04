
using CodeBE_COMP1640.Models;

namespace CodeBE_COMP1640.Repositories
{
    public interface IUOW
    {
        IUserRepository UserRepository { get; }
    }
    public class UOW : IUOW
    {
        private DataContext DataContext;
        public IUserRepository UserRepository { get; private set; }
        public UOW(DataContext DataContext)
        {
            this.DataContext = DataContext;
            UserRepository = new UserRepository(DataContext);
        }
    }
}
