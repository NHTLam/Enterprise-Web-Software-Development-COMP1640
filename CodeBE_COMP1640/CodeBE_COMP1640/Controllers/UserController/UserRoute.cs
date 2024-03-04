using System.ComponentModel;
using System.Reflection;

namespace CodeBE_COMP1640.Controllers.UserController
{
    [DisplayName("User")]
    public class UserRoute
    {
        public const string Module = "/app-user";
        public const string Register = Module + "/register";
        public const string Get = Module + "/get";
        public const string List = Module + "/list";
        public const string Update = Module + "/update";
        public const string Delete = Module + "/delete";
        public const string Login = Module + "/login";
    }
}
