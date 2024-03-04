using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string UserType { get; set; } = null!;

    public string Profile { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<Article> Articles { get; } = new List<Article>();

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual ICollection<Feedback> Feedbacks { get; } = new List<Feedback>();
}
