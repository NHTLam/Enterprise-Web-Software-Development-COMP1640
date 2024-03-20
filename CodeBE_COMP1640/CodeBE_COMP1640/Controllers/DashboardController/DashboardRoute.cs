using CodeBE_COMP1640.Enums;
using System.ComponentModel;
using System.Reflection;

namespace CodeBE_COMP1640.Controllers.DashboardController
{
    [DisplayName("Dashboard")]
    public class DashboardRoute
    {
        public const string Module = "/dashboard";
        public const string GetData = Module + "/get-data";

        public static Dictionary<string, List<string>> DictionaryPath = new Dictionary<string, List<string>> 
        {
            { ActionEnum.READ.Name, new List<string>()
                {
                    GetData
                }
            }
        };
    }
}
