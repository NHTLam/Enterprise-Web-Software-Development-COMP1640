using CodeBE_COMP1640.Models;

namespace CodeBE_COMP1640.Controllers.ArticleController
{
    public class ArticleRequest
    {
    }

    public class ArticlePost
    {
        public int DepartmentId { get; set; }
        public int UserId { get; set; }
        public string Content { get; set; } = null!;
        public byte[]? FileData { get; set; }
        public DateTime? SubmissionTime { get; set; }
        public bool? IsLateSubmissionAllowed { get; set; }
        public bool IsApproved { get; set; }
        public bool IsTopic { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Title { get; set; }
        public Article ToEntity() => new Article
        {
            DepartmentId = DepartmentId,
            UserId = UserId,
            Content = Content,
            SubmissionTime = SubmissionTime,
            IsLateSubmissionAllowed = IsLateSubmissionAllowed,
            IsApproved = IsApproved,
            IsTopic = IsTopic,
            StartDate = StartDate,
            EndDate = EndDate,
            Title = Title
        };
    }
    public class ArticlePut : ArticlePost
    {
    }
}
