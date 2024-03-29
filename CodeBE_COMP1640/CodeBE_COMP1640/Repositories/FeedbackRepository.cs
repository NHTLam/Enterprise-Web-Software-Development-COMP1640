using CodeBE_COMP1640.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeBE_COMP1640.Repositories
{
    public interface IFeedbackRepository
    {
        Task<List<Feedback>> GetAllFeedbacks();
        Task<Feedback> GetFeedbackById(int id);
        Task CreateFeedback(Feedback feedback);
        Task UpdateFeedback(Feedback feedback);
        Task DeleteFeedback(int id);
        Task<List<Feedback>> GetFeedbackByArticleId(int articleId);
    }

    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly DataContext _context;

        public FeedbackRepository(DataContext context)
        {
            _context = context;
        }

         public async Task<List<Feedback>> GetAllFeedbacks()
        {
            return await _context.Feedbacks.ToListAsync();
        }

        public async Task<Feedback> GetFeedbackById(int id)
        {
            return await _context.Feedbacks.FindAsync(id);
        }

        public async Task CreateFeedback(Feedback feedback)
        {
            if (feedback == null)
            {
                throw new ArgumentNullException(nameof(feedback));
            }

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateFeedback(Feedback feedback)
        {
            if (feedback == null)
            {
                throw new ArgumentNullException(nameof(feedback));
            }

            _context.Entry(feedback).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFeedback(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null)
            {
                throw new Exception("Feedback not found");
            }

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
        }
         public async Task<List<Feedback>> GetFeedbackByArticleId(int articleId)
    {
        return await _context.Feedbacks.Where(u => u.ArticleId == articleId ).ToListAsync();
    }
    }
}
