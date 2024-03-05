using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

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

    public UserDTO() { }
    public UserDTO(User user)
    {
        this.UserId = user.UserId;
        this.Username = user.Username;
        this.Password = user.Password;
        this.Email = user.Email;
        this.Class = user.Class;
        this.Phone = user.Phone;
        this.Address = user.Address;
        this.DepartmentId = user.DepartmentId;
    }
}
