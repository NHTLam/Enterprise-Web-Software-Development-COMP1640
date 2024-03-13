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
                Description = x.Description,
            }).ToListAsync();

            var PermissonRoleMappingQuery = DataContext.PermissonRoleMappings.AsNoTracking();
            List<PermissonRoleMapping> PermissonRoleMappings = await PermissonRoleMappingQuery
                .Select(x => new PermissonRoleMapping
                {
                    Id = x.Id,
                    RoleId = x.RoleId,
                    PermissionId = x.PermissionId,
                }).ToListAsync();

            foreach (Role Role in Roles)
            {
                Role.PermissonRoleMappings = PermissonRoleMappings
                    .Where(x => x.RoleId == Role.RoleId)
                    .ToList();
            }

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
                Description = x.Description,
            }).FirstOrDefaultAsync();

            if (Role == null)
                return null;
            Role.PermissonRoleMappings = await DataContext.PermissonRoleMappings.AsNoTracking()
                .Where(x => x.RoleId == Role.RoleId)
                .Select(x => new PermissonRoleMapping
                {
                    Id = x.Id,
                    RoleId = x.RoleId,
                    PermissionId = x.PermissionId,
                }).ToListAsync();

            return Role;
        }

        public async Task<bool> CreateRole(Role Role)
        {
            DataContext.Roles.Add(Role);
            await DataContext.SaveChangesAsync();
            Role.RoleId = Role.RoleId;
            await SaveReference(Role);
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
            NewRole.Description = Role.Description;
            await DataContext.SaveChangesAsync();
            await SaveReference(Role);
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
            await SaveReference(Role);
            return true;
        }

        private async Task SaveReference(Role Role)
        {
            if (Role.PermissonRoleMappings == null || Role.PermissonRoleMappings.Count == 0)
                await DataContext.PermissonRoleMappings
                    .Where(x => x.RoleId == Role.RoleId)
                    .DeleteFromQueryAsync();
            else
            {
                List<PermissonRoleMapping> PermissonRoleMappings = new List<PermissonRoleMapping>();
                var PermissonRoleMappingIds = Role.PermissonRoleMappings.Select(x => x.Id).Distinct().ToList();
                await DataContext.PermissonRoleMappings
                    .Where(x => x.RoleId == Role.RoleId)
                    .Where(x => PermissonRoleMappingIds.Contains(x.Id))
                    .DeleteFromQueryAsync();
                foreach (PermissonRoleMapping PermissonRoleMapping in Role.PermissonRoleMappings)
                {
                    PermissonRoleMapping NewPermissonRoleMapping = new PermissonRoleMapping();
                    NewPermissonRoleMapping.RoleId = Role.RoleId;
                    NewPermissonRoleMapping.PermissionId = PermissonRoleMapping.PermissionId;
                    PermissonRoleMappings.Add(NewPermissonRoleMapping);
                }
                await DataContext.BulkMergeAsync(PermissonRoleMappings);
            }
        }
    }
}
