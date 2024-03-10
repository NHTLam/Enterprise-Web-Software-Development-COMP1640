using CodeBE_COMP1640.Controllers.UserController;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CodeBE_COMP1640.Controllers
{
    public class PermissionController : ControllerBase
    {
        private IUOW UOW;
        private DataContext DataContext;

        public PermissionController(IUOW UOW, DataContext DataContext)
        {
            this.UOW = UOW;
            this.DataContext = DataContext;
        }

        [HttpPost, Route("/permission/list-path")]
        public async Task<List<string>> ListPath()
        {
            IQueryable<Permission> query = DataContext.Permissions.AsNoTracking();
            List<string> Paths = await query.AsNoTracking().Select(x => x.Path).ToListAsync();
            return Paths;
        }

        [HttpPost, Route("/permission/init")]
        public async Task Init()
        {
            await DataContext.Permissions.DeleteFromQueryAsync();
            Dictionary<string, List<string>> DictionaryPaths = new Dictionary<string, List<string>>();
            DictionaryPaths = DictionaryPaths.Concat(UserRoute.DictionaryPath).ToDictionary(x => x.Key, x => x.Value);
            List<Permission> Permissions = new List<Permission>();
            foreach(var DictionaryPath in DictionaryPaths)
            {
                foreach(var path in DictionaryPath.Value)
                {
                    Permission permission = new Permission();
                    permission.Name = DictionaryPath.Key;
                    permission.Path = path;
                    Permissions.Add(permission);
                }
            }
            await DataContext.Permissions.BulkInsertAsync(Permissions);
        }
    }
}
