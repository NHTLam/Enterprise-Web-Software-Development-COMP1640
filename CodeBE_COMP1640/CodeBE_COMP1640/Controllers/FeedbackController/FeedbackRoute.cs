using System.Collections.Generic;
using CodeBE_COMP1640.Enums;

namespace CodeBE_COMP1640.Controllers.FeedbackController

{
    public static class FeedbackRoute
    {
        public const string Module = "/api/feedback";
        public const string GetAllFeedbacks = Module + "/all";
        public const string GetFeedbackById = Module + "/{id}";
        public const string CreateFeedback = Module + "/create";
        public const string UpdateFeedback = Module + "/update/{id}";
        public const string DeleteFeedback = Module + "/delete/{id}";

        public static Dictionary<string, List<string>> DictionaryPath = new Dictionary<string, List<string>>
        {
            { ActionEnum.READ.Name, new List<string> { GetAllFeedbacks, GetFeedbackById } },
            { ActionEnum.CREATE.Name, new List<string> { CreateFeedback } },
            { ActionEnum.UPDATE.Name, new List<string> { UpdateFeedback } },
            { ActionEnum.DELETE.Name, new List<string> { DeleteFeedback } }
        };
    }
}
