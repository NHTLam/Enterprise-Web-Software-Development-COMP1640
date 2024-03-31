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
using CodeBE_COMP1640.Services.PermissionS;
using CodeBE_COMP1640.Controllers.PermissionController;

namespace CodeBE_COMP1640.Controllers.FeedbackController
{
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        private readonly IEmailSender _emailSender;

        private readonly IUserService _userService;

        private readonly IPermissionService PermissionService;

        public FeedbackController(IFeedbackService feedbackService, IEmailSender emailSender, IUserService userService, IPermissionService PermissionService)
        {
            _feedbackService = feedbackService ?? throw new ArgumentNullException(nameof(feedbackService));
            this._emailSender = emailSender;
            this.PermissionService = PermissionService;
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));

        }

        [Route(FeedbackRoute.List), HttpGet, Authorize]
        public async Task<ActionResult<List<Feedback>>> GetAllFeedbacks()
        {
            if (!await PermissionService.HasPermission(FeedbackRoute.List, PermissionService.GetUserId()))
            {
                return Forbid();
            }

            var feedbacks = await _feedbackService.GetFeedbacks();
            return Ok(feedbacks);
        }

        [Route(FeedbackRoute.Get), HttpGet, Authorize]
        public async Task<ActionResult<Feedback>> GetFeedbackById(int id)
        {
            if (!await PermissionService.HasPermission(FeedbackRoute.Get, PermissionService.GetUserId()))
            {
                return Forbid();
            }

            var feedback = await _feedbackService.GetFeedbackById(id);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }
        [Route(FeedbackRoute.GetbyArticleID), HttpGet, Authorize]
        public async Task<ActionResult<Feedback>> GetFeedbackByArticleId(int articleId)
        {
            var feedback = await _feedbackService.GetFeedbackByArticleId(articleId);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }

        [Route(FeedbackRoute.Create), HttpPost, Authorize]
        public async Task<IActionResult> CreateFeedback(FeedbackDTO feedbackDTO)
        {
            if (!await PermissionService.HasPermission(FeedbackRoute.Create, PermissionService.GetUserId()))
            {
                return Forbid();
            }

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
            if (!await PermissionService.HasPermission(FeedbackRoute.Update, PermissionService.GetUserId()))
            {
                return Forbid();
            }

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
            if (!await PermissionService.HasPermission(FeedbackRoute.Delete, PermissionService.GetUserId()))
            {
                return Forbid();
            }

            await _feedbackService.DeleteFeedback(id);
            return NoContent();
        }
    }
}
