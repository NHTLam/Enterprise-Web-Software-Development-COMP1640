using CodeBE_COMP1640.Controllers.PermissionController;
using CodeBE_COMP1640.Models;
using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Controllers.UserController;

public partial class UserDTO
{
    public int UserId { get; set; }

    public string? Username { get; set; } = null!;

    public string? Password { get; set; } = null!;

    public string? Email { get; set; } = null!;

    public string? Class { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public int? DepartmentId { get; set; }

    public List<RoleUserMappingDTO>? RoleUserMappings { get; set; }

    public UserDTO() { }
    public UserDTO(User user)
    {
        this.UserId = user.UserId;
        this.Username = user.Username;
        this.Password = user.Password;
        this.Email = user.Email;
        this.Class = user.Class?.Trim();
        this.Phone = user.Phone?.Trim();
        this.Address = user.Address?.Trim();
        this.DepartmentId = user.DepartmentId;
        this.RoleUserMappings = user.RoleUserMappings == null ? null : user.RoleUserMappings.Select(x => new RoleUserMappingDTO(x)).ToList();
    }
}

public partial class RoleUserMappingDTO
{
    public int RoleId { get; set; }

    public int UserId { get; set; }

    public int Id { get; set; }

    public string? RoleName { get; set; }
    
    public RoleUserMappingDTO() { }

    public RoleUserMappingDTO(RoleUserMapping RoleUserMapping) 
    {
        this.Id = RoleUserMapping.Id;
        this.RoleId = RoleUserMapping.RoleId;
        this.UserId = RoleUserMapping.UserId;
    }
}
