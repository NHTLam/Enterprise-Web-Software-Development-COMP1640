using System.Collections.Generic;
using CodeBE_COMP1640.Enums;

namespace CodeBE_COMP1640.Controllers.FeedbackController

{
    public static class FeedbackRoute
    {
        public const string Module = "/feedback";
        public const string List = Module + "/list";
        public const string Get = Module + "/get/{id}";
        public const string GetbyArticleID = Module + "/getbyarticleID";
        
        public const string Create = Module + "/create";
        public const string Update = Module + "/update/{id}";
        public const string Delete = Module + "/delete/{id}";

        public static Dictionary<string, List<string>> DictionaryPath = new Dictionary<string, List<string>>
        {   { ActionEnum.CREATE.Name, new List<string> { Create } },
            { ActionEnum.UPDATE.Name, new List<string> { Update } },
            { ActionEnum.DELETE.Name, new List<string> { Delete } },
            { ActionEnum.READ.Name, new List<string> { List, Get } }
        };
    }
}
