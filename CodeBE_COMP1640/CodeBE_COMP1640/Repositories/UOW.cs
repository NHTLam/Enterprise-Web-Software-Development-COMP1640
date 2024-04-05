
using CodeBE_COMP1640.Models;

namespace CodeBE_COMP1640.Repositories
{
    public interface IUOW
    {
        IUserRepository UserRepository { get; }
        IPermissionRepository PermissionRepository { get; }
        ICommentRepository CommentRepository { get; }
        IFeedbackRepository FeedbackRepository { get; }
        IDashboardRepository DashboardRepository { get; }
        ILogRepository LogRepository { get; }
        IBadWordRepository BadWordRepository { get; }

    }
    public class UOW : IUOW
    {
        private DataContext DataContext;
        public IUserRepository UserRepository { get; private set; }
        public IPermissionRepository PermissionRepository { get; private set; }
        public ICommentRepository CommentRepository { get; private set; }
        public IDashboardRepository DashboardRepository { get; private set; }
        public ILogRepository LogRepository { get; private set; }
        public IBadWordRepository BadWordRepository { get; private set; }
        private IFeedbackRepository _feedbackRepository;

        public UOW(DataContext DataContext)
        {
            this.DataContext = DataContext;
            UserRepository = new UserRepository(DataContext);
            PermissionRepository = new PermissionRepository(DataContext);
            CommentRepository = new CommentRepository(DataContext);
            DashboardRepository = new DashboardRepository(DataContext);
            LogRepository = new LogRepository(DataContext);
            BadWordRepository = new BadWordRepository(DataContext);
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
