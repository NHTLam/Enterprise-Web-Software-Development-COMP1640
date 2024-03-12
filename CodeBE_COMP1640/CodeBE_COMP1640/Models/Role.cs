using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class Role
{
    public int RoleId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<PermissonRoleMapping> PermissonRoleMappings { get; } = new List<PermissonRoleMapping>();

    public virtual ICollection<RoleUserMapping> RoleUserMappings { get; } = new List<RoleUserMapping>();
}
