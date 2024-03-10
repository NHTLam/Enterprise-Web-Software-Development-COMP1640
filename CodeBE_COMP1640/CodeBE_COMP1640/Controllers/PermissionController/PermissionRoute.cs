using CodeBE_COMP1640.Enums;
using Microsoft.Win32;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace CodeBE_COMP1640.Controllers.PermissionController
{
    [DisplayName("Permission")]
    public class PermissionRoute
    {
        public const string Module = "/permission";
        public const string Init = Module + "/init";
        public const string ListAllPath = Module + "/list-all-path";
        public const string ListPath = Module + "/list-path";

        public const string ListRole = Module + "/role" + "/list-role";
        public const string GetRole = Module + "/role" + "/get-role";
        public const string CreateRole = Module + "/role" + "/create-role";
        public const string UpdateRole = Module + "/role" + "/update-role";
        public const string DeleteRole = Module + "/role" + "/delete-role";

        public static Dictionary<string, List<string>> DictionaryPath = new Dictionary<string, List<string>>
        {
            { ActionEnum.CREATE_ROLE.Name, new List<string>()
                {
                    CreateRole
                }
            },
            { ActionEnum.UPDATE_ROLE.Name, new List<string>()
                {
                    UpdateRole
                }
            },
            { ActionEnum.DELETE_ROLE.Name, new List<string>()
                {
                    DeleteRole
                }
            },
            { ActionEnum.READ_ROLE.Name, new List<string>()
                {
                    ListRole, GetRole
                }
            }
        };
    }
}
