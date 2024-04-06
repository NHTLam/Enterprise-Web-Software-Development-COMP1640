using CodeBE_COMP1640.Models;

namespace CodeBE_COMP1640.Controllers.FeedbackController;

    public class FeedbackDTO
    {
    public int UserId { get; set; }
    public int FeedbackId { get; set; }

    public int ArticleId { get; set; }
    public string FeedbackContent { get; set; }
    public DateTime FeedbackTime { get; set; }

    public string Username { get; set; } = "defaultUsername";

    }
