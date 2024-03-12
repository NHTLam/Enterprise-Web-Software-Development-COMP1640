using CodeBE_COMP1640.Enums;
using System.ComponentModel;
using System.Reflection;

namespace CodeBE_COMP1640.Controllers.UserController
{
    [DisplayName("User")]
    public class UserRoute
    {
        public const string Module = "/app-user";
        public const string Register = Module + "/create";
        public const string Get = Module + "/get";
        public const string List = Module + "/list";
        public const string Update = Module + "/update";
        public const string Delete = Module + "/delete";
        public const string Login = Module + "/login";

        public static Dictionary<string, List<string>> DictionaryPath = new Dictionary<string, List<string>> 
        {
            { ActionEnum.CREATE.Name, new List<string>() 
                {
                    Register, Login
                } 
            },
            { ActionEnum.UPDATE.Name, new List<string>()
                {
                    Update, Login
                }
            },
            { ActionEnum.DELETE.Name, new List<string>()
                {
                    Delete, Login
                }
            },
            { ActionEnum.READ.Name, new List<string>()
                {
                    List, Get, Login
                }
            }
        };
    }
}
