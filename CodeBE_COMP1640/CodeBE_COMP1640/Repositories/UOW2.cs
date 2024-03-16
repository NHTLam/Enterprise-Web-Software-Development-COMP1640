using System;
using System.Threading.Tasks;
using CodeBE_COMP1640.Models;

namespace CodeBE_COMP1640.Repositories
{
    public interface IUOWs : IDisposable
    {
        IFeedbackRepository FeedbackRepository { get; }
        Task<int> SaveChangesAsync();
    }

    public class UOWs : IUOWs
    {
        private readonly DataContext _context;
        private IFeedbackRepository _feedbackRepository;

        public UOWs(DataContext context)
        {
            _context = context;
        }

        public IFeedbackRepository FeedbackRepository
        {
            get
            {
                return _feedbackRepository ??= new FeedbackRepository(_context);
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
