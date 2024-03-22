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
using CodeBE_COMP1640.Controllers.PermissionController;
using System.Linq;
using CodeBE_COMP1640.Controllers.FeedbackController;
using CodeBE_COMP1640.Controllers.DashboardController;
using CodeBE_COMP1640.Controllers.CommentController;
using CodeBE_COMP1640.Controllers.ArticleController;

namespace CodeBE_COMP1640.Services.PermissionS
{
    public interface IPermissionService
    {
        Task Init();
        Task<List<string>> ListPath(User User);
        Task<List<string>> ListAllPath();
        Task<List<Role>> ListRole();
        Task<List<Permission>> ListPermission();
        Task<Role> GetRole(long Id);
        Task<bool> CreateRole (Role Role);
        Task<Role> UpdateRole(Role Role);
        Task<Role> DeleteRole(Role Role);
        Task<bool> HasPermission(string Path, int UserId);
        int GetUserId();
    }
    public class PermissionService : IPermissionService
    {
        private IUOW UOW;
        private readonly IConfiguration Configuration;
        private IHttpContextAccessor HttpContextAccessor;

        public PermissionService(
            IUOW UOW,
            IConfiguration Configuration,
            IHttpContextAccessor HttpContextAccessor
        )
        {
            this.UOW = UOW;
            this.Configuration = Configuration;
            this.HttpContextAccessor = HttpContextAccessor;
        }

        public async Task Init()
        {
            try
            {
                var PermissionDbs = await UOW.PermissionRepository.ListPermission();
                Dictionary<string, List<string>> DictionaryPaths = new Dictionary<string, List<string>>();
                DictionaryPaths = ConcatMyDictionaryRoute(DictionaryPaths, UserRoute.DictionaryPath);
                DictionaryPaths = ConcatMyDictionaryRoute(DictionaryPaths, PermissionRoute.DictionaryPath);
                DictionaryPaths = ConcatMyDictionaryRoute(DictionaryPaths, FeedbackRoute.DictionaryPath);
                DictionaryPaths = ConcatMyDictionaryRoute(DictionaryPaths, DashboardRoute.DictionaryPath);
                DictionaryPaths = ConcatMyDictionaryRoute(DictionaryPaths, CommentRoute.DictionaryPath);
                DictionaryPaths = ConcatMyDictionaryRoute(DictionaryPaths, ArticleRoute.DictionaryPath);
                List<Permission> Permissions = new List<Permission>();
                foreach (var DictionaryPath in DictionaryPaths)
                {
                    foreach (var path in DictionaryPath.Value)
                    {
                        string modelName = path.Split('/')[1];
                        int? PermissionId = PermissionDbs.FirstOrDefault(x => x.Path.Trim() == path.Trim() && x.Name == DictionaryPath.Key)?.PermissionId;
                        Permission permission = new Permission();
                        permission.PermissionId = PermissionId ?? 0;
                        permission.Name = DictionaryPath.Key;
                        permission.Path = path;
                        permission.Description = $"Cho phép thực hiện hành động {DictionaryPath.Key} ở màn quản lý {modelName}";
                        permission.MenuName = modelName;
                        Permissions.Add(permission);
                    }
                }
                await UOW.PermissionRepository.Init(Permissions);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<List<string>> ListPath(User User)
        {
            try
            {
                User = await UOW.UserRepository.Get(User.UserId);
                List<long> RoleIds = new List<long>();
                if (User.RoleUserMappings != null && User.RoleUserMappings.Count > 0)
                {
                    foreach (var userRoleMapping in User.RoleUserMappings)
                    {
                        RoleIds.Add(userRoleMapping.RoleId);
                    }
                }

                List<Role> Roles = await UOW.PermissionRepository.ListRole();
                Roles = Roles.Where(x => RoleIds.Contains(x.RoleId)).ToList();

                List<int> permissionIds = new List<int>();
                foreach (var Role in Roles)
                {
                    if (Role.PermissonRoleMappings != null && Role.PermissonRoleMappings.Count > 0)
                        permissionIds.AddRange(Role.PermissonRoleMappings.Select(x => x.PermissionId).ToList());
                }
                permissionIds = permissionIds.Distinct().ToList();

                List<Permission> AllowPermission = await UOW.PermissionRepository.ListPermission();
                List<string> AllowPath = AllowPermission.Where(x => permissionIds.Contains(x.PermissionId)).Select(x => x.Path).ToList();
                return AllowPath;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<List<Permission>> ListPermission()
        {
            try
            {
                return await UOW.PermissionRepository.ListPermission();
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<bool> HasPermission(string Path, int UserId)
        {
            User User = new User();
            User.UserId = UserId;
            List<string> AllowPath = await ListPath(User);
            if (AllowPath.Contains(Path))
            {
                return true;
            }
            return false;
        }

        public async Task<List<string>> ListAllPath()
        {
            try
            {
                return await UOW.PermissionRepository.ListAllPath();
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<bool> CreateRole(Role Role)
        {
            try
            {
                await UOW.PermissionRepository.CreateRole(Role);
                Role = await UOW.PermissionRepository.GetRole(Role.RoleId);
                return true;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Role> DeleteRole(Role Role)
        {
            try
            {
                await UOW.PermissionRepository.DeleteRole(Role);
                return Role;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Role> GetRole(long Id)
        {
            Role Role = await UOW.PermissionRepository.GetRole(Id);
            if (Role == null)
                return null;
            return Role;
        }

        public async Task<List<Role>> ListRole()
        {
            try
            {
                List<Role> Roles = await UOW.PermissionRepository.ListRole();
                return Roles;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Role> UpdateRole(Role Role)
        {
            try
            {
                var oldData = await UOW.PermissionRepository.GetRole(Role.RoleId);

                await UOW.PermissionRepository.UpdateRole(Role);

                Role = await UOW.PermissionRepository.GetRole(Role.RoleId);
                return Role;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        private Dictionary<string, List<string>> ConcatMyDictionaryRoute(Dictionary<string, List<string>> CurrentDictionaryPath, Dictionary<string, List<string>> NewDictionaryPath)
        {
            if (CurrentDictionaryPath != null && CurrentDictionaryPath.Count != 0)
            {
                foreach (var Dictionary in NewDictionaryPath)
                {
                    if (CurrentDictionaryPath.Select(x => x.Key).ToList().Contains(Dictionary.Key))
                    {
                        CurrentDictionaryPath[Dictionary.Key].AddRange(Dictionary.Value);
                    }
                    else
                    {
                        CurrentDictionaryPath.Add(Dictionary.Key, Dictionary.Value);
                    }
                }
                return CurrentDictionaryPath;
            }
            else
            {
                return NewDictionaryPath;
            }
        }

        public int GetUserId()
        {
            int userId = 0;
            if (HttpContextAccessor.HttpContext is not null)
            {
                userId = int.TryParse(HttpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier), out int id) ? id : 0;
            }
            return userId;
        }
    }
}
