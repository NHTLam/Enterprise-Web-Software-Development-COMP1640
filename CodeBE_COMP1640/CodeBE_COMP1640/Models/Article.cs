﻿namespace CodeBE_COMP1640.Models;

public partial class Article
{
    public int ArticleId { get; set; }

    public int DepartmentId { get; set; }

    public int UserId { get; set; }

    public string Content { get; set; } = null!;

    public byte[]? FileData { get; set; }

    public DateTime? SubmissionTime { get; set; }

    public bool? IsLateSubmissionAllowed { get; set; }

    public bool IsApproved { get; set; }

    public bool? IsTopic { get; set; }

    public bool Isfeedback { get; set; }

    public int? TopicId { get; set; }

    public string? FileUrl { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? Title { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual ICollection<Feedback> Feedbacks { get; } = new List<Feedback>();
}
