using CodeBE_COMP1640.Controllers.ArticleController;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Services.FeedbackS;
using Microsoft.AspNetCore.Authorization;
using CodeBE_COMP1640.Services.UserS;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using CodeBE_COMP1640.Services.EmailS;


namespace CodeBE_COMP1640.Controllers.FeedbackController
{
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        private readonly IEmailSender _emailSender;

        private readonly IUserService _userService;

        public FeedbackController(IFeedbackService feedbackService, IEmailSender emailSender, IUserService userService)
        {
            _feedbackService = feedbackService ?? throw new ArgumentNullException(nameof(feedbackService));

            this._emailSender = emailSender;
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));

        }

        [Route(FeedbackRoute.List), HttpGet, Authorize]
        public async Task<ActionResult<List<Feedback>>> GetAllFeedbacks()
        {
            var feedbacks = await _feedbackService.GetFeedbacks();
            return Ok(feedbacks);
        }

        [Route(FeedbackRoute.Get), HttpGet, Authorize]
        public async Task<ActionResult<Feedback>> GetFeedbackById(int id)
        {
            var feedback = await _feedbackService.GetFeedbackById(id);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }

        [Route(FeedbackRoute.Create), HttpPost, Authorize]
        public async Task<IActionResult> CreateFeedback(FeedbackDTO feedbackDTO)
{               
               
                
                // Tạo mới đối tượng Feedback từ dữ liệu trong request body
                var feedback = new Feedback
                
                {
                    UserId = feedbackDTO.UserId,
                    ArticleId = feedbackDTO.ArticleId,
                    FeedbackContent = feedbackDTO.FeedbackContent,
                    FeedbackTime = feedbackDTO.FeedbackTime,
                    
                };
                // Gọi phương thức tạo mới feedback từ service
                await _feedbackService.CreateFeedback(feedback);
                 // Lấy thông tin người dùng từ UserService
                var user = await _userService.Get(feedbackDTO.UserId);
                
                //gửi email
                 if (user != null)
                    {   
                        var receivers = new List<string>();
                        receivers.Add(user.Email);
                        var subject = "Test";
                        var message = "Hello";
                        await _emailSender.SendEmailAsync(receivers, subject, message);
                    }
            
                return CreatedAtAction(nameof(GetFeedbackById), new { id = feedback.FeedbackId }, feedback);
                
        

          
        }



        [Route(FeedbackRoute.Update), HttpPut, Authorize]
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

        [Route(FeedbackRoute.Delete), HttpDelete, Authorize]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            await _feedbackService.DeleteFeedback(id);
            return NoContent();
        }
    }
}
