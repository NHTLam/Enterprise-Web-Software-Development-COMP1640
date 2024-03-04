using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string? DepartmentName { get; set; }

    public virtual ICollection<Article> Articles { get; } = new List<Article>();
}
