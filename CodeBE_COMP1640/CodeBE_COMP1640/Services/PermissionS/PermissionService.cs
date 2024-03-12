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

namespace CodeBE_COMP1640.Services.PermissionS
{
    public interface IPermissionService
    {
        Task Init();
        Task<List<string>> ListPath(User User);
        Task<List<string>> ListAllPath();
        Task<List<Role>> ListRole();
        Task<Role> GetRole(long Id);
        Task<bool> CreateRole (Role Role);
        Task<Role> UpdateRole(Role Role);
        Task<Role> DeleteRole(Role Role);
    }
    public class PermissionService : IPermissionService
    {
        private IUOW UOW;
        private readonly IConfiguration Configuration;

        public PermissionService(
            IUOW UOW,
            IConfiguration Configuration
        )
        {
            this.UOW = UOW;
            this.Configuration = Configuration;
        }

        public async Task Init()
        {
            try
            {
                Dictionary<string, List<string>> DictionaryPaths = new Dictionary<string, List<string>>();
                DictionaryPaths = ConcatMyDictionaryRoute(DictionaryPaths, UserRoute.DictionaryPath);
                DictionaryPaths = ConcatMyDictionaryRoute(DictionaryPaths, PermissionRoute.DictionaryPath);
                List<Permission> Permissions = new List<Permission>();
                foreach (var DictionaryPath in DictionaryPaths)
                {
                    foreach (var path in DictionaryPath.Value)
                    {
                        string modelName = path.Split('/')[1];
                        Permission permission = new Permission();
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
                return await UOW.PermissionRepository.ListPath(User);
            }
            catch (Exception)
            {
                throw new Exception();
            }
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
    }
}
