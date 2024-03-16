
using CodeBE_COMP1640.Models;

namespace CodeBE_COMP1640.Repositories
{
    public interface IUOW
    {
        IUserRepository UserRepository { get; }
        IPermissionRepository PermissionRepository { get; }
        IFeedbackRepository FeedbackRepository { get; }
         
    }
    public class UOW : IUOW
    {
        private DataContext DataContext;
        public IUserRepository UserRepository { get; private set; }
        public IPermissionRepository PermissionRepository { get; private set; }
        private IFeedbackRepository _feedbackRepository ;

        public UOW(DataContext DataContext)
        {
            this.DataContext = DataContext;
            UserRepository = new UserRepository(DataContext);
            PermissionRepository = new PermissionRepository(DataContext);
            
        }
        public IFeedbackRepository FeedbackRepository
        {
            get
            {
                return _feedbackRepository ??= new FeedbackRepository(DataContext);
            }
        }
    }
}
