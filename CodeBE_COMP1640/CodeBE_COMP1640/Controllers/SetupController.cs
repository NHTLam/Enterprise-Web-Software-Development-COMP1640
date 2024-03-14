using CodeBE_COMP1640.Enums;
using CodeBE_COMP1640.Models;
using Microsoft.AspNetCore.Mvc;

namespace CodeBE_COMP1640.Controllers
{
    public class SetupController : ControllerBase
    {
        private DataContext DataContext;
        public SetupController(DataContext DataContext)
        {
            this.DataContext = DataContext;
        }

        [HttpGet, Route("/setup/init-enum")]
        public ActionResult InitEnum()
        {
            InitDepartmentEnum();
            return Ok();
        }

        private async void InitDepartmentEnum()
        {
            List<Department> DepartmentEnumList = DepartmentEnum.DepartmentEnumList.Select(item => new Department
            {
                DepartmentId = item.DepartmentId,
                Code = item.Code,
                DepartmentName = item.DepartmentName,
            }).ToList();
            DataContext.Departments.BulkSynchronize(DepartmentEnumList);
        }
    }

    public interface ICurrentContext
    {
        public int UserId { get; set; }
    }

    public class CurrentContext : ICurrentContext
    {
        public int UserId { get; set; }
    }
}
