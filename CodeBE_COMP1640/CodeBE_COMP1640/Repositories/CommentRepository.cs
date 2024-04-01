using CodeBE_COMP1640.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;
using System.Data;

namespace CodeBE_COMP1640.Repositories
{
    public interface ICommentRepository
    {
        Task<List<Comment>> List();
        Task<List<Comment>> List(long ArticalId);
        Task<Comment> Get(long Id);
        Task<bool> Create(Comment Comment);
        Task<bool> Update(Comment Comment);
        Task<bool> Delete(Comment Comment);
    }

    public class CommentRepository : ICommentRepository
    {
        private DataContext DataContext;

        public CommentRepository(DataContext DataContext)
        {
            this.DataContext = DataContext;
        }

        public async Task<List<Comment>> List()
        {
            List<Comment> Comments = await DataContext.Comments.AsNoTracking().Select(x => new Comment()
            {
                CommentId = x.CommentId,
                ArticleId = x.ArticleId,
                UserId = x.UserId,
                CommentContent = x.CommentContent,
                CommentTime = x.CommentTime,
                User = x.User == null ? null : new User()
                {
                    UserId = x.User.UserId,
                    Username = x.User.Username,
                },
            }).ToListAsync();
            return Comments;
        }

        public async Task<List<Comment>> List(long ArticalId)
        {
            List<Comment> Comments = (await List()).Where(x => x.ArticleId == ArticalId).Select(x => new Comment()
            {
                CommentId = x.CommentId,
                ArticleId = x.ArticleId,
                UserId = x.UserId,
                CommentContent = x.CommentContent,
                CommentTime = x.CommentTime,
                User = x.User == null ? null : new User()
                {
                    UserId = x.User.UserId,
                    Username = x.User.Username,
                },
            }).ToList();
            return Comments;
        }

        public async Task<Comment> Get(long Id)
        {
            Comment? Comment = await DataContext.Comments.AsNoTracking().Where(x => x.CommentId == Id).FirstOrDefaultAsync();

            if (Comment == null)
                return null;

            return Comment;
        }

        public async Task<bool> Create(Comment Comment)
        {
            DataContext.Comments.Add(Comment);
            await DataContext.SaveChangesAsync();
            Comment.CommentId = Comment.CommentId;
            await SaveReference(Comment);
            return true;
        }

        public async Task<bool> Update(Comment Comment)
        {
            Comment? NewComment = DataContext.Comments
                .Where(x => x.CommentId == Comment.CommentId)
                .FirstOrDefault();
            if (NewComment == null)
                return false;
            NewComment.CommentId = Comment.CommentId;
            NewComment.ArticleId = Comment.ArticleId;
            NewComment.UserId = Comment.UserId;
            NewComment.CommentContent = Comment.CommentContent;
            NewComment.CommentTime = Comment.CommentTime;
            await DataContext.SaveChangesAsync();
            await SaveReference(Comment);
            return true;
        }

        public async Task<bool> Delete(Comment Comment)
        {
            Comment? CurrentComment = DataContext.Comments
                .Where(x => x.CommentId == Comment.CommentId)
                .FirstOrDefault();
            if (Comment == null)
                return false;
            DataContext.Comments.Remove(CurrentComment);
            await DataContext.SaveChangesAsync();
            await SaveReference(Comment);
            return true;
        }

        private async Task SaveReference(Comment Comment)
        {
        }
    }
}
