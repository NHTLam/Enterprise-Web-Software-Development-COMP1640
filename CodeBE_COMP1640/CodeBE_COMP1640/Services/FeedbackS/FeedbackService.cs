using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;
using CodeBE_COMP1640.Controllers.FeedbackController;



namespace CodeBE_COMP1640.Services.FeedbackS
{
    public interface IFeedbackService
    {
        Task<List<Feedback>> GetFeedbacks();
        Task<Feedback> GetFeedbackById(int id);
        Task CreateFeedback(Feedback feedback);
        Task UpdateFeedback(Feedback feedback);
        Task DeleteFeedback(int id);
        Task<List<FeedbackDTO>> GetFeedbackByArticleId(int articleId);
    }

  public class FeedbackService : IFeedbackService
    {
        private readonly IUOW _uow;

        public FeedbackService(IUOW uow)
        {
            _uow = uow;
        }

        public async Task<List<Feedback>> GetFeedbacks()
        {
            return await _uow.FeedbackRepository.GetAllFeedbacks();
        }

        public async Task<Feedback> GetFeedbackById(int id)
        {
            return await _uow.FeedbackRepository.GetFeedbackById(id);
        }

        public async Task CreateFeedback(Feedback feedback)
        {
            if (feedback == null)
            {
                throw new ArgumentNullException(nameof(feedback));
            }

            await _uow.FeedbackRepository.CreateFeedback(feedback);
        }

        public async Task UpdateFeedback(Feedback feedback)
        {
            if (feedback == null)
            {
                throw new ArgumentNullException(nameof(feedback));
            }

            await _uow.FeedbackRepository.UpdateFeedback(feedback);
        }

        public async Task DeleteFeedback(int id)
        {
            await _uow.FeedbackRepository.DeleteFeedback(id);
        }
         public async Task<List<FeedbackDTO>> GetFeedbackByArticleId(int articleId)
{
    var feedbacks = await _uow.FeedbackRepository.GetFeedbackByArticleId(articleId);
    var feedbackDTOs = feedbacks.Select(feedback => new FeedbackDTO
    {
        UserId = feedback.UserId,
        ArticleId = feedback.ArticleId,
        FeedbackContent = feedback.FeedbackContent,
        FeedbackTime = feedback.FeedbackTime.GetValueOrDefault(),
        Username = feedback.User?.Username
    }).ToList();

        return feedbackDTOs;
}
    }
}
