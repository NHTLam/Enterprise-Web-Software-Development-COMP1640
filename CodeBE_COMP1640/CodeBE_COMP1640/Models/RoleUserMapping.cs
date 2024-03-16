using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class RoleUserMapping
{
    public int RoleId { get; set; }

    public int UserId { get; set; }

    public int Id { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
