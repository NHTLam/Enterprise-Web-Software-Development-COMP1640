using CodeBE_COMP1640.Controllers.PermissionController;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Services.DashboardS;
using CodeBE_COMP1640.Services.PermissionS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CodeBE_COMP1640.Controllers.DashboardController
{
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private IDashboardService DashboardService;
        private IPermissionService PermissionService;

        public DashboardController(
            IDashboardService DashboardService,
            IPermissionService PermissionService
        )
        {
            this.DashboardService = DashboardService;
            this.PermissionService = PermissionService;
        }

        [Route(DashboardRoute.GetData), HttpPost, Authorize]
        public async Task<ActionResult<DashboardDTO>> GetData()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await PermissionService.HasPermission(PermissionRoute.ListPermission, PermissionService.GetUserId()))
            {
                return Forbid();
            }

            Dashboard Dashboard = await DashboardService.GetData();
            DashboardDTO DashboardDTO = new DashboardDTO(Dashboard);
            return DashboardDTO;
        }

    }
}
