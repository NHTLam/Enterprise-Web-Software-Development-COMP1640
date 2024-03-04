using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class Article
{
    public int ArticleId { get; set; }

    public int? DepartmentId { get; set; }

    public int? UserId { get; set; }

    public string? Content { get; set; }

    public byte[]? FileData { get; set; }

    public DateTime? SubmissionTime { get; set; }

    public bool? IsLateSubmissionAllowed { get; set; }

    public bool? IsApproved { get; set; }

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual Department? Department { get; set; }

    public virtual User? User { get; set; }
}
