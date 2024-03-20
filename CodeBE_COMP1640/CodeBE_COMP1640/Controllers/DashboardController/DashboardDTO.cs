using CodeBE_COMP1640.Controllers.PermissionController;
using CodeBE_COMP1640.Models;
using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Controllers.DashboardController;

public partial class DashboardDTO
{
    public List<dynamic> PieChartSimplifys { get; set; }

    public List<dynamic> BarChartSimplifys { get; set; }

    public List<dynamic> LineChartSimplifys { get; set; }

    public List<PieChartDTO> PieCharts { get; set; }

    public List<BarChartDTO> BarCharts { get; set; }

    public List<LineChartDTO> LineCharts { get; set; }

    public DashboardDTO() { }
    public DashboardDTO(Dashboard Dashboard)
    {
        this.PieChartSimplifys = Dashboard.PieChartSimplifys == null ? null : Dashboard.PieChartSimplifys;
        this.BarChartSimplifys = Dashboard.BarChartSimplifys == null ? null : Dashboard.BarChartSimplifys;
        this.LineChartSimplifys = Dashboard.LineChartSimplifys == null ? null : Dashboard.LineChartSimplifys;
        this.PieCharts = Dashboard.PieCharts == null ? null : Dashboard.PieCharts.Select(x => new PieChartDTO(x)).ToList();
        this.BarCharts = Dashboard.BarCharts == null ? null : Dashboard.BarCharts.Select(x => new BarChartDTO(x)).ToList();
        this.LineCharts = Dashboard.LineCharts == null ? null : Dashboard.LineCharts.Select(x => new LineChartDTO(x)).ToList();
    }
}

public partial class PieChartDTO
{
    public string SliceName { get; set; }

    public float Value { get; set; }

    
    public PieChartDTO() { }

    public PieChartDTO(PieChart PieChart)
    {
        this.SliceName = PieChart.SliceName;
        this.Value = PieChart.Value;
    }
}

public partial class BarChartDTO
{
    public string BarName { get; set; }

    public float Value { get; set; }

    public string Color { get; set; }

    public BarChartDTO() { }

    public BarChartDTO(BarChart BarChart)
    {
        this.BarName = BarChart.BarName;
        this.Value = BarChart.Value;
        this.Color = BarChart.Color;
    }
}

public partial class LineChartDTO
{
    public List<float> Value { get; set; }

    public LineChartDTO() { }

    public LineChartDTO(LineChart LineChart)
    {
        this.Value = LineChart.Value == null ? null : LineChart.Value;
    }
}
