using CodeBE_COMP1640.Controllers.PermissionController;
using CodeBE_COMP1640.Models;
using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Controllers.BadWordController;

public partial class BadWordDTO
{
    public int BadWordId { get; set; }

    public string? Name { get; set; } = null!;

    public BadWordDTO() { }
    public BadWordDTO(BadWord BadWord)
    {
        this.BadWordId = BadWord.BadWordId;
        this.Name = BadWord.Name;
    }
}
