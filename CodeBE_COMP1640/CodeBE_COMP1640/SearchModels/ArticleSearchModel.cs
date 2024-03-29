using CodeBE_COMP1640.Bases;
using CodeBE_COMP1640.Models;

namespace CodeBE_COMP1640.SearchModels
{
    public abstract class ArticleSearchModel : SearchModel<Article>
    {
        public int? SearchDepartmentId { get; set; }
        public int? SearchUserId { get; set; }
        public bool? IsLateSubmissionAllowed { get; set; }
        public DateTime? SubmissionTimeFrom { get; set; }
        public DateTime? SubmissionTimeTo { get; set; }
        public bool? IsApproved { get; set; }
        public bool IsTopic { get; set; }
        public string Title { get; set; }
    }
}
