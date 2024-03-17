using CodeBE_COMP1640.Enums;
using System.ComponentModel;
using System.Reflection;

namespace CodeBE_COMP1640.Controllers.CommentController
{
    [DisplayName("Comment")]
    public class CommentRoute
    {
        public const string Module = "/comment";
        public const string Create = Module + "/create";
        public const string Get = Module + "/get";
        public const string List = Module + "/list";
        public const string ListByAtical = Module + "/list-by-artical-id";
        public const string Update = Module + "/update";
        public const string Delete = Module + "/delete";

        public static Dictionary<string, List<string>> DictionaryPath = new Dictionary<string, List<string>> 
        {
            { ActionEnum.CREATE.Name, new List<string>() 
                {
                    Create,
                } 
            },
            { ActionEnum.UPDATE.Name, new List<string>()
                {
                    Update,
                }
            },
            { ActionEnum.DELETE.Name, new List<string>()
                {
                    Delete,
                }
            },
            { ActionEnum.READ.Name, new List<string>()
                {
                    List, Get, ListByAtical
                }
            }
        };
    }
}
