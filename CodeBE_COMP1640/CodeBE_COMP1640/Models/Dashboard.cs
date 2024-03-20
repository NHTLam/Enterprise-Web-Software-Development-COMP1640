namespace CodeBE_COMP1640.Models
{
    public class Dashboard
    {
        public List<dynamic> PieChartSimplifys { get; set; }

        public List<dynamic> BarChartSimplifys { get; set; }

        public List<dynamic> LineChartSimplifys { get; set; }

        public List<PieChart> PieCharts { get; set; }

        public List<BarChart> BarCharts { get; set; }

        public List<LineChart> LineCharts { get; set; }
    }

    public partial class PieChart
    {
        public string SliceName { get; set; }

        public float Value { get; set; }
    }

    public partial class BarChart
    {
        public string BarName { get; set; }

        public float Value { get; set; }

        public string Color { get; set; }
    }

    public partial class LineChart
    {
        public List<float> Value { get; set; }
    }
}
