using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Models;

public partial class Log
{
    public int LogId { get; set; }

    public string Response { get; set; } = null!;

    public string PayLoad { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string Path { get; set; } = null!;

    public string Method { get; set; } = null!;
}
