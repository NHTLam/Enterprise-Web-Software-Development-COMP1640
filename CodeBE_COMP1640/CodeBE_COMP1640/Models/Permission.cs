using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class Permission
{
    public int PermissionId { get; set; }

    public string Name { get; set; } = null!;

    public string Path { get; set; } = null!;

    public string? Description { get; set; }

    public string? MenuName { get; set; }

    public virtual ICollection<PermissonRoleMapping> PermissonRoleMappings { get; } = new List<PermissonRoleMapping>();
}
