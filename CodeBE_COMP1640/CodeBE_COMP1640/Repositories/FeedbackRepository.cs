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

            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateFeedback(Feedback feedback)
        {
            if (feedback == null)
            {
                throw new ArgumentNullException(nameof(feedback));
            }

            _context.Feedbacks.Update(feedback);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFeedback(int id)
        {
            var feedbackToDelete = await _context.Feedbacks.FindAsync(id);
            if (feedbackToDelete == null)
            {
                throw new KeyNotFoundException($"Feedback with id {id} not found.");
            }

            _context.Feedbacks.Remove(feedbackToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
