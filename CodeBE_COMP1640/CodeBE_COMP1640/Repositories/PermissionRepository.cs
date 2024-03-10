using CodeBE_COMP1640.Controllers.PermissionController;
using CodeBE_COMP1640.Controllers.UserController;
using CodeBE_COMP1640.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CodeBE_COMP1640.Repositories
{
    public interface IPermissionRepository
    {
        Task Init(List<Permission> Permissions);
        Task<List<string>> ListPath(User User);
        Task<List<string>> ListAllPath();
        Task<List<Role>> ListRole();
        Task<Role> GetRole(long Id);
        Task<bool> CreateRole(Role Role);
        Task<bool> UpdateRole(Role Role);
        Task<bool> DeleteRole(Role Role);
    }

    public class PermissionRepository : IPermissionRepository
    {
        private DataContext DataContext;

        public PermissionRepository(DataContext DataContext)
        {
            this.DataContext = DataContext;
        }

        public async Task<List<string>> ListPath(User User)
        {
            IQueryable<Permission> query = DataContext.Permissions.AsNoTracking();
            List<string> Paths = await query.AsNoTracking().Select(x => x.Path).ToListAsync();
            return Paths;
        }

        public async Task<List<string>> ListAllPath()
        {
            IQueryable<Permission> query = DataContext.Permissions.AsNoTracking();
            List<string> Paths = await query.AsNoTracking().Select(x => x.Path).ToListAsync();
            return Paths;
        }

        public async Task Init(List<Permission> Permissions)
        {
            await DataContext.Permissions.DeleteFromQueryAsync();            
            await DataContext.Permissions.BulkInsertAsync(Permissions);
        }

        public async Task<List<Role>> ListRole()
        {
            IQueryable<Role> query = DataContext.Roles.AsNoTracking();
            List<Role> Roles = await query.AsNoTracking().Select(x => new Role
            {
                RoleId = x.RoleId,
                Name = x.Name,
            }).ToListAsync();

            return Roles;
        }

        public async Task<Role> GetRole(long Id)
        {
            Role? Role = await DataContext.Roles.AsNoTracking()
            .Where(x => x.RoleId == Id)
            .Select(x => new Role()
            {
                RoleId = x.RoleId,
                Name = x.Name,
            }).FirstOrDefaultAsync();

            if (Role == null)
                return null;

            return Role;
        }

        public async Task<bool> CreateRole(Role Role)
        {
            DataContext.Roles.Add(Role);
            await DataContext.SaveChangesAsync();
            Role.RoleId = Role.RoleId;
            //await SaveReference(Role);
            return true;
        }

        public async Task<bool> UpdateRole(Role Role)
        {
            Role? NewRole = DataContext.Roles
                .Where(x => x.RoleId == Role.RoleId)
                .FirstOrDefault();
            if (NewRole == null)
                return false;
            NewRole.RoleId = Role.RoleId;
            NewRole.Name = Role.Name;
            await DataContext.SaveChangesAsync();
            //await SaveReference(Role);
            return true;
        }

        public async Task<bool> DeleteRole(Role Role)
        {
            Role? CurrentRole = DataContext.Roles
                .Where(x => x.RoleId == Role.RoleId)
                .FirstOrDefault();
            if (Role == null)
                return false;
            DataContext.Roles.Remove(CurrentRole);
            await DataContext.SaveChangesAsync();
            //await SaveReference(Role);
            return true;
        }
    }
}
