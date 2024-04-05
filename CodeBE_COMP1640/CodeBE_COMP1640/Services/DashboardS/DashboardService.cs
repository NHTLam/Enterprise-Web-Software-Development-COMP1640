using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodeBE_COMP1640.Controllers.UserController;
using CodeBE_COMP1640.Controllers.DashboardController;
using System.Linq;
using CodeBE_COMP1640.Enums;
using NuGet.Protocol.Plugins;
using Newtonsoft.Json.Linq;
using CodeBE_COMP1640.Controllers.CommentController;
using CodeBE_COMP1640.Services.LogS;

namespace CodeBE_COMP1640.Services.DashboardS
{
    public interface IDashboardService
    {
        Task<Dashboard> GetData();
    }
    public class DashboardService : IDashboardService
    {
        private IUOW UOW;
        private ILogService LogService;

        public DashboardService(
            IUOW UOW,
            ILogService LogService
        )
        {
            this.UOW = UOW;
            this.LogService = LogService;
        }

        public async Task<Dashboard> GetData()
        {
            try
            {
                List<Article> Articles = await UOW.DashboardRepository.ListArticles();

                Dashboard Dashboard = new Dashboard();

                Dashboard.PieCharts = GetDataForPieChart(Articles);
                Dashboard.PieChartSimplifys = SimplifyPieChartData(Dashboard.PieCharts);

                Dashboard.BarCharts = GetDataForBarChart(Articles);
                Dashboard.BarChartSimplifys = SimplifyBarChartData(Dashboard.BarCharts);

                Dashboard.LineCharts = GetDataForLineChart(Articles);
                Dashboard.LineChartSimplifys = SimplifyLineChartData(Dashboard.LineCharts);

                await LogService.Log(Dashboard.ToString() ?? "", "", "200", DashboardRoute.GetData, "POST");
                return Dashboard;
            }
            catch ( Exception ex )
            {
                await LogService.Log(ex.ToString(), "", "500", DashboardRoute.GetData, "POST");
                throw new Exception();
            }

        }

        private List<LineChart> GetDataForLineChart(List<Article> Articles)
        {
            List<LineChart> LineCharts = new List<LineChart>();
            var NewArticles = Articles.Where(x => x.SubmissionTime.Value.Year == DateTime.Now.Year).ToList();
            int MinMonth = NewArticles?.MinBy(x => x.SubmissionTime)?.SubmissionTime?.Month ?? 1;
            int MaxMonth = NewArticles?.MaxBy(x => x.SubmissionTime)?.SubmissionTime?.Month ?? 12;
            
            for (int i = MinMonth; i <= MaxMonth; i++)
            {
                List<float> Values = new List<float>();
                Values.Add(i);
                foreach (var faculty in DepartmentEnum.DepartmentEnumList)
                {
                    int Value = Articles.Count(x => x.DepartmentId == faculty.DepartmentId && i == x.SubmissionTime.Value.Month);
                    Values.Add(Value);
                }
                LineChart LineChart = new LineChart();
                LineChart.Value = Values;
                LineCharts.Add(LineChart);
            }

            return LineCharts;
        }
        private List<dynamic> SimplifyLineChartData(List<LineChart> LineCharts)
        {
            List<dynamic> LineChartSimplifys = new List<dynamic>();
            foreach (LineChart LineChart in LineCharts)
            {
                List<float> Values = new List<float>();
                Values.AddRange(LineChart.Value);
                LineChartSimplifys.Add(Values);
            }
            return LineChartSimplifys;
        }

        private List<BarChart> GetDataForBarChart(List<Article> Articles)
        {
            List<BarChart> BarCharts = new List<BarChart>();
            List<string> UsedColor = new List<string>();
            foreach (var faculty in DepartmentEnum.DepartmentEnumList)
            {
                int Value = Articles.Count(x => x.DepartmentId == faculty.DepartmentId);
                BarChart BarChart = new BarChart();
                BarChart.BarName = faculty.DepartmentName;
                BarChart.Value = Value;
                BarChart.Color = GetRandomColor(UsedColor);
                UsedColor.Add(BarChart.Color);
                BarCharts.Add(BarChart);
            }

            return BarCharts;
        }

        private List<dynamic> SimplifyBarChartData(List<BarChart> BarCharts)
        {
            List<dynamic> BarChartSimplifys = new List<dynamic>();
            foreach (BarChart BarChart in BarCharts)
            {
                List<dynamic> Values = new List<dynamic>();
                Values.Add(BarChart.BarName);
                Values.Add(BarChart.Value);
                Values.Add(BarChart.Color);
                BarChartSimplifys.Add(Values);
            }
            return BarChartSimplifys;
        }

        private List<PieChart> GetDataForPieChart(List<Article> Articles)
        {
            List<PieChart> PieCharts = new List<PieChart>();
            foreach (var faculty in DepartmentEnum.DepartmentEnumList)
            {
                int Value = Articles.Count(x => x.DepartmentId == faculty.DepartmentId);
                PieChart PieChart = new PieChart();
                PieChart.SliceName = faculty.DepartmentName;
                PieChart.Value = Value;
                PieCharts.Add(PieChart);
            }

            return PieCharts;
        }

        private List<dynamic> SimplifyPieChartData(List<PieChart> PieCharts)
        {
            List<dynamic> PieChartSimplifys = new List<dynamic>();
            foreach (PieChart pieChart in PieCharts)
            {
                List<dynamic> Values = new List<dynamic>();
                Values.Add(pieChart.SliceName);
                Values.Add(pieChart.Value);
                PieChartSimplifys.Add(Values);
            }
            return PieChartSimplifys;
        }

        public static string GetRandomColor(List<string> UsedColor)
        {
            char[] HexChars = "0123456789ABCDEF".ToCharArray();

            string Color = "#";
            for (int i = 0; i < 6; i++)
            {
                int RandomIndex = new Random().Next(HexChars.Length);
                Color += HexChars[RandomIndex];
            }

            if (UsedColor.Contains(Color))
                return GetRandomColor(UsedColor);
            return Color;
        }
    }
}
