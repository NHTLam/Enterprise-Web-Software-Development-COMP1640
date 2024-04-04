using CodeBE_COMP1640.Controllers.PermissionController;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Services.PermissionS;
using CodeBE_COMP1640.Services.LogS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CodeBE_COMP1640.Controllers.LogController
{
    [ApiController]
    public class LogController : ControllerBase
    {
        private ILogService LogService;
        private IPermissionService PermissionService;

        public LogController(
            ILogService LogService,
            IPermissionService PermissionService
        )
        {
            this.LogService = LogService;
            this.PermissionService = PermissionService;
        }

        [Route(LogRoute.List), HttpPost, Authorize]
        public async Task<ActionResult<List<Log>>> List()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await PermissionService.HasPermission(LogRoute.List, PermissionService.GetUserId()))
            {
                return Forbid();
            }

            List<Log> Logs = await LogService.List();
            return Logs;
        }
    }
}
