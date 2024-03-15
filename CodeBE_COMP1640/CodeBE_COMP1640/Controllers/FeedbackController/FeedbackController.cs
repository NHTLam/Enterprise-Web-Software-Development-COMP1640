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
public async Task<ActionResult<List<Feedback>>> GetFeedbacks()
{
    var feedbacks = await _feedbackService.GetFeedbacks();
    return Ok(feedbacks);
}

[HttpPost("get-by-id")]
public async Task<ActionResult<Feedback>> GetFeedbackById([FromBody] int id)
{
    var feedback = await _feedbackService.GetFeedbackById(id);
    if (feedback == null)
    {
        return NotFound();
    }
    return Ok(feedback);
}

[HttpPost]
public async Task<ActionResult<Feedback>> CreateFeedback([FromBody] Feedback feedback)
{
    await _feedbackService.CreateFeedback(feedback);
    return CreatedAtAction(nameof(GetFeedbackById), new { id = feedback.FeedbackId }, feedback);
}

[HttpPost("update")]
public async Task<IActionResult> UpdateFeedback([FromBody] Feedback feedback)
{
    await _feedbackService.UpdateFeedback(feedback);
    return NoContent();
}

[HttpPost("delete")]
public async Task<IActionResult> DeleteFeedback([FromBody] int id)
{
    var feedback = await _feedbackService.GetFeedbackById(id);
    if (feedback == null)
    {
        return NotFound();
    }
    await _feedbackService.DeleteFeedback(id);
    return NoContent();
}
    }
}
