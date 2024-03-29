using CodeBE_COMP1640.Enums;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;
using CodeBE_COMP1640.Services.PermissionS;
using Microsoft.AspNetCore.Mvc;

namespace CodeBE_COMP1640.Controllers
{
    public class SetupController : ControllerBase
    {
        private DataContext DataContext; 
        private IPermissionService PermissionService; 
        private IUOW UOW; 
        public SetupController(DataContext DataContext, IPermissionService PermissionService, IUOW uOW)
        {
            this.DataContext = DataContext;
            this.PermissionService = PermissionService;
            UOW = uOW;
        }

        [HttpGet, Route("/setup/init")]
        public async Task<ActionResult> InitEnum()
        {
            //await InitDepartmentEnum();
            await InitPermission();
            await InitPermissionForAdmin();
            return Ok();
        }

        private async Task InitDepartmentEnum()
        {
            List<Department> DepartmentEnumList = DepartmentEnum.DepartmentEnumList.Select(item => new Department
            {
                DepartmentId = item.DepartmentId,
                Code = item.Code,
                DepartmentName = item.DepartmentName,
            }).ToList();
            await DataContext.BulkMergeAsync(DepartmentEnumList);
        }

        private async Task InitPermission()
        {
            await PermissionService.Init();
        }

        private async Task InitPermissionForAdmin()
        {
            await DataContext.PermissonRoleMappings.Where(x => x.RoleId == 1).DeleteFromQueryAsync();
            List<Permission> AllPermissions = await PermissionService.ListPermission();
            List<PermissonRoleMapping> PermissonRoleMappings = new List<PermissonRoleMapping>();
            foreach (Permission permission in AllPermissions)
            {
                PermissonRoleMapping permissonRoleMapping = new PermissonRoleMapping();
                permissonRoleMapping.RoleId = 1; //Fix cứng id của admin là 1
                permissonRoleMapping.PermissionId = permission.PermissionId;
                PermissonRoleMappings.Add(permissonRoleMapping);
            }
            await DataContext.BulkMergeAsync(PermissonRoleMappings);

            var User = await UOW.UserRepository.Get(2);
            if (User.RoleUserMappings == null || User.RoleUserMappings.Count == 0)
            {
                RoleUserMapping RoleUserMapping = new RoleUserMapping();
                RoleUserMapping.RoleId = 1;
                RoleUserMapping.UserId = 2;
                DataContext.RoleUserMappings.Add(RoleUserMapping);
                await DataContext.SaveChangesAsync();
            }     
        }
    }
}
