using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;

namespace CodeBE_COMP1640.Services.CommentS
{
    public interface ICommentValidator
    {
        Task Get(Comment Comment);
        Task<bool> Create(Comment Comment);
        Task<bool> Update(Comment Comment);
        Task<bool> Delete(Comment Comment);
    }
    public class CommentValidator : ICommentValidator
    {
        private IUOW UOW;

        public CommentValidator(IUOW UOW)
        {
            this.UOW = UOW;
        }

        public async Task Get(Comment Comment)
        {
        }

        public async Task<bool> Create(Comment Comment)
        {
            return true;
        }

        public async Task<bool> Update(Comment Comment)
        {
            return true;
        }

        public async Task<bool> Delete(Comment Comment)
        {
            return true;
        }
    }
}
