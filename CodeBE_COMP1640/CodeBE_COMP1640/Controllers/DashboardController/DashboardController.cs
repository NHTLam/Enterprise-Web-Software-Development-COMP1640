using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Services.DashboardS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CodeBE_COMP1640.Controllers.DashboardController
{
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private IDashboardService DashboardService;

        public DashboardController(
            IDashboardService DashboardService
        )
        {
            this.DashboardService = DashboardService;
        }

        [Route(DashboardRoute.GetData), HttpPost]
        public async Task<ActionResult<DashboardDTO>> GetData()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Dashboard Dashboard = await DashboardService.GetData();
            DashboardDTO DashboardDTO = new DashboardDTO(Dashboard);
            return DashboardDTO;
        }

    }
}
