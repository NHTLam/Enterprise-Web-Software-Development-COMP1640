using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = null!;

    public string Code { get; set; } = null!;

    public Department() { }
    public Department(int departmentId, string departmentCode, string departmentName) 
    {
        this.DepartmentId = departmentId;
        this.Code = departmentCode;
        this.DepartmentName = departmentName;
    }

    public virtual ICollection<Article> Articles { get; } = new List<Article>();

    public virtual ICollection<User> Users { get; } = new List<User>();
}
