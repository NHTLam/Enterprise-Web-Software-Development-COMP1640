using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int UserId { get; set; }

    public int ArticleId { get; set; }

    public string? FeedbackContent { get; set; }

    public DateTime? FeedbackTime { get; set; }

    public virtual Article Article { get; set; } = null!;
}
