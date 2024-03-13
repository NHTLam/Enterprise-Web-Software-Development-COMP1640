using CodeBE_COMP1640.Models;
using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Controllers.PermissionController;

public partial class RoleDTO
{
    public int RoleId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public List<PermissonRoleMappingDTO> PermissonRoleMappings { get; set; }

    public RoleDTO() { }

    public RoleDTO(Role Role)
    {
        this.RoleId = Role.RoleId;
        this.Name = Role.Name;
        this.Description = Role.Description;
        this.PermissonRoleMappings = Role.PermissonRoleMappings == null ? null : Role.PermissonRoleMappings.Select(x => new PermissonRoleMappingDTO(x)).ToList();
    }
}

public class PermissonRoleMappingDTO
{
    public int RoleId { get; set; }

    public int PermissionId { get; set; }

    public int Id { get; set; }

    public PermissionDTO Permission { get; set; }

    public PermissonRoleMappingDTO() { }

    public PermissonRoleMappingDTO(PermissonRoleMapping PermissonRoleMapping)
    {
        this.RoleId = PermissonRoleMapping.RoleId;
        this.PermissionId = PermissonRoleMapping.PermissionId;
        this.Id = PermissonRoleMapping.Id;
        this.Permission = PermissonRoleMapping.Permission == null ? null : new PermissionDTO(PermissonRoleMapping.Permission);
    }

}

public class PermissionDTO
{
    public int PermissionId { get; set; }

    public string Name { get; set; } = null!;

    public string Path { get; set; } = null!;

    public string? Description { get; set; }

    public string? MenuName { get; set; }

    public PermissionDTO() { }

    public PermissionDTO(Permission permission)
    {
        this.PermissionId = permission.PermissionId;
        this.Name = permission.Name;
        this.Path = permission.Path;
        this.Description = permission.Description;
        this.MenuName = permission.MenuName;
    }
}

