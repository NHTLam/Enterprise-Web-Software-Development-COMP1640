using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class Report
{
    public int ReportId { get; set; }

    public int? UserId { get; set; }

    public string? ReportContent { get; set; }

    public virtual User? User { get; set; }
}
