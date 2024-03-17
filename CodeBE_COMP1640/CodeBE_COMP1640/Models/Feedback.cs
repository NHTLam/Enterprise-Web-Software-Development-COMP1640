using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CodeBE_COMP1640.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int UserId { get; set; }

    public int ArticleId { get; set; }

    public string? FeedbackContent { get; set; }

    public DateTime? FeedbackTime { get; set; }

    [JsonIgnore]

    public virtual Article Article { get; set; } = null!;

    [JsonIgnore]

    public virtual User User { get; set; } = null!;
    [JsonIgnore]

    public virtual ICollection<User> Articles { get; } = new List<User>();
    }
    

