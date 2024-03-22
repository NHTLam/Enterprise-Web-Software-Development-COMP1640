using CodeBE_COMP1640.Enums;
using System.ComponentModel;
using System.Reflection;

namespace CodeBE_COMP1640.Controllers.ArticleController
{
    [DisplayName("Article")]
    public class ArticleRoute
    {
        public const string Module = "/article";
        public const string Create = Module + "/create";
        public const string Get = Module + "/get";
        public const string GetByUser = Module + "/get-by-user";
        public const string List = Module + "/list";
        public const string Update = Module + "/update";
        public const string Delete = Module + "/delete";
        public const string UploadFile = Module + "/upload-file";
        public const string Export = Module + "/export";

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
                    List, Get, GetByUser
                }
            },
            { ActionEnum.EXPORT.Name, new List<string>()
                {
                    Export,
                }
            },
            { ActionEnum.UPLOAD_FILE.Name, new List<string>()
                {
                    UploadFile
                }
            },
        };
    }
}
