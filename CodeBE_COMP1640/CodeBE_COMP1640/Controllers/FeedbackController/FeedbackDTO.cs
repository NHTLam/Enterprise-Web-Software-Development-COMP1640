using CodeBE_COMP1640.Models;

namespace CodeBE_COMP1640.Controllers.FeedbackController;

    public class FeedbackDTO
    {
        public int FeedbackId { get; set; }

        public int UserId { get; set; }

        public int ArticleId { get; set; }

        public string? FeedbackContent { get; set; }

        public DateTime? FeedbackTime { get; set; }
            public FeedbackDTO() { }
    public FeedbackDTO(Feedback feedback)
    {
        this.FeedbackId = feedback.FeedbackId;
        this.UserId = feedback.UserId;
        this.ArticleId = feedback.ArticleId;
        this.FeedbackContent = feedback.FeedbackContent;
         this.FeedbackTime = feedback.FeedbackTime;
        
      
    }
    }
