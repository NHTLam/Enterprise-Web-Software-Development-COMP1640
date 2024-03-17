using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Services.FeedbackS;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CodeBE_COMP1640.Controllers.FeedbackController
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService ?? throw new ArgumentNullException(nameof(feedbackService));
        }

        [HttpGet]
        public async Task<ActionResult<List<Feedback>>> GetAllFeedbacks()
        {
            var feedbacks = await _feedbackService.GetFeedbacks();
            return Ok(feedbacks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> GetFeedbackById(int id)
        {
            var feedback = await _feedbackService.GetFeedbackById(id);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }

        [HttpPost]
        public async Task<IActionResult> CreateFeedback(FeedbackDTO feedbackDTO)
{
                // Tạo mới đối tượng Feedback từ dữ liệu trong request body
                var feedback = new Feedback
                {
                    UserId = feedbackDTO.UserId,
                    ArticleId = feedbackDTO.ArticleId,
                    FeedbackContent = feedbackDTO.FeedbackContent,
                    FeedbackTime = feedbackDTO.FeedbackTime
                };

                // Gọi phương thức tạo mới feedback từ service
                await _feedbackService.CreateFeedback(feedback);

                return CreatedAtAction(nameof(GetFeedbackById), new { id = feedback.FeedbackId }, feedback);
            }

        [HttpPut("{id}")]
       public async Task<IActionResult> UpdateFeedback(int id, FeedbackDTO feedbackDTO)
        {
            var existingFeedback = await _feedbackService.GetFeedbackById(id);
            if (existingFeedback == null)
            {
                return NotFound();
            }

            // Cập nhật thông tin của feedback với các giá trị từ DTO
            existingFeedback.FeedbackContent = feedbackDTO.FeedbackContent;
            existingFeedback.FeedbackTime = feedbackDTO.FeedbackTime;
            existingFeedback.UserId = feedbackDTO.UserId; // Cập nhật userId
            existingFeedback.ArticleId = feedbackDTO.ArticleId; // Cập nhật articleId

            await _feedbackService.UpdateFeedback(existingFeedback);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            await _feedbackService.DeleteFeedback(id);
            return NoContent();
        }
    }
}
