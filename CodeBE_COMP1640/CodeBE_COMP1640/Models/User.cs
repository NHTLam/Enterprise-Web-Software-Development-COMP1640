using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Class { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public int DepartmentId { get; set; }

    public virtual ICollection<Article> Articles { get; } = new List<Article>();

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual Department Department { get; set; } = null!;

    public virtual ICollection<RoleUserMapping> RoleUserMappings { get; set; } = new List<RoleUserMapping>();
}
