﻿using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class PermissonRoleMapping
{
    public int RoleId { get; set; }

    public int PermissionId { get; set; }

    public int Id { get; set; }

    public virtual Permission Permission { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;
}
