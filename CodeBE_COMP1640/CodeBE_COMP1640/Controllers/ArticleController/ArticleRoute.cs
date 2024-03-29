using CodeBE_COMP1640.Enums;
using System.ComponentModel;

namespace CodeBE_COMP1640.Controllers.ArticleController
{
    [DisplayName("Article")]
    public class ArticleRoute
    {
        public const string Module = "/article";
        public const string Create = Module + "/create";
        public const string Get = Module + "/get/{id}";
        public const string GetByUser = Module + "/get-by-user/{userId}";
        public const string GetByDepartment = Module + "/get-by-department/{departmentId}";
        public const string List = Module + "/list";
        public const string Update = Module + "/update/{id}";
        public const string Delete = Module + "/delete/{id}";
        public const string UploadFile = Module + "/upload-file";

        public const string GetUploadedFiles = Module + "/GetUpLoadedFiles";

        public const string GetFile = Module + "/GetFile";
        public const string Export = Module + "/export";
        public const string ListArticle = Module + "/GetAllArticle";
        public const string Approve = Module + "/Approved";




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
                    List, Get, GetByUser, GetFile, ListArticle
                }
            },
            { ActionEnum.EXPORT.Name, new List<string>()
                {
                    Export,
                }
            },
            { ActionEnum.READ.Name, new List<string>()
                {
                    GetUploadedFiles,
                }
            },
            { ActionEnum.UPLOAD_FILE.Name, new List<string>()
                {
                    UploadFile
                }
            }
        };
    }
}
