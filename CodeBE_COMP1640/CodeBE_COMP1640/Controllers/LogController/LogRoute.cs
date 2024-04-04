using CodeBE_COMP1640.Enums;
using System.ComponentModel;
using System.Reflection;

namespace CodeBE_COMP1640.Controllers.LogController
{
    [DisplayName("Log")]
    public class LogRoute
    {
        public const string Module = "/log";
        public const string List = Module + "/list";

        public static Dictionary<string, List<string>> DictionaryPath = new Dictionary<string, List<string>> 
        {
            { ActionEnum.READ.Name, new List<string>()
                {
                    List
                }
            }
        };
    }
}
