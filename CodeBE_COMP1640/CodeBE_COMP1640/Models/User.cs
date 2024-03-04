using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Username { get; set; }

    public string? UserType { get; set; }

    public string? Profile { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<Article> Articles { get; } = new List<Article>();

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual ICollection<Report> Reports { get; } = new List<Report>();
}
