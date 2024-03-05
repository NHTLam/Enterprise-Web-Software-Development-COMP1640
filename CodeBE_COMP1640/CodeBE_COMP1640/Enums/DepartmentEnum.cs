
using CodeBE_COMP1640.Models;
using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Enums;

public partial class DepartmentEnum
{
    public static Department BAE = new Department(1, "BAE", "Business and Economics");
    public static Department E = new Department(2, "E", "Engineering");
    public static Department AAH = new Department(3, "AAH", "Arts and Humanities");
    public static Department L = new Department(4, "L", "Law");
    public static Department S = new Department(5, "S", "Science");
    public static List<Department> DepartmentEnumList = new List<Department>
    {
        BAE, E, AAH, L, S
    };
}
