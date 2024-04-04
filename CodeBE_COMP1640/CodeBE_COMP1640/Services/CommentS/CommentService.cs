using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;
using CodeBE_COMP1640.Services.LogS;
using CodeBE_COMP1640.Controllers.CommentController;

namespace CodeBE_COMP1640.Services.CommentS
{
    public interface ICommentService
    {
        Task<List<Comment>> List();
        Task<List<Comment>> List(long ArticalId);
        Task<Comment> Get(long Id);
        Task<bool> Create(Comment Comment);
        Task<Comment> Update(Comment Comment);
        Task<Comment> Delete(Comment Comment);
    }
    public class CommentService : ICommentService
    {
        private IUOW UOW;
        private readonly IConfiguration Configuration;
        private readonly ILogService LogService;

        public CommentService(
            IUOW UOW,
            IConfiguration Configuration,
            ILogService LogService
        )
        {
            this.UOW = UOW;
            this.Configuration = Configuration;
            this.LogService = LogService;
        }
        public async Task<bool> Create(Comment Comment)
        {
            string payload = Comment.ToString() ?? "";
            try
            {
                Comment.CommentTime = DateTime.Now;
                await UOW.CommentRepository.Create(Comment);
                Comment = await UOW.CommentRepository.Get(Comment.CommentId);
                await LogService.Log(Comment.ToString() ?? "", payload, "200", CommentRoute.Create, "POST");
                return true;
            }
            catch (Exception ex)
            {
                await LogService.Log(ex.ToString() ?? "", payload, "500", CommentRoute.Create, "POST");
                throw new Exception();
            }
        }

        public async Task<Comment> Delete(Comment Comment)
        {
            string payload = Comment?.ToString() ?? "";
            try
            {
                await UOW.CommentRepository.Delete(Comment);
                await LogService.Log(Comment.ToString() ?? "", payload, "200", CommentRoute.Delete, "POST");
                return Comment;
            }
            catch (Exception ex)
            {
                await LogService.Log(ex.ToString() ?? "", payload, "500", CommentRoute.Delete, "POST");
                throw new Exception();
            }
        }

        public async Task<Comment> Get(long Id)
        {
            Comment Comment = await UOW.CommentRepository.Get(Id);
            if (Comment == null)
                return null;
            return Comment;
        }

        public async Task<List<Comment>> List()
        {
            try
            {
                List<Comment> Comments = await UOW.CommentRepository.List();
                return Comments;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<List<Comment>> List(long ArticalId)
        {
            try
            {
                List<Comment> Comments = await UOW.CommentRepository.List(ArticalId);
                return Comments;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Comment> Update(Comment Comment)
        {
            string payload = Comment?.ToString() ?? "";
            try
            {
                var oldData = await UOW.CommentRepository.Get(Comment.CommentId);
                Comment.CommentTime = DateTime.Now;
                await UOW.CommentRepository.Update(Comment);

                await LogService.Log(Comment.ToString() ?? "", payload, "200", CommentRoute.Update, "POST");
                Comment = await UOW.CommentRepository.Get(Comment.CommentId);
                return Comment;
            }
            catch (Exception ex)
            {
                await LogService.Log(ex.ToString() ?? "", payload, "500", CommentRoute.Update, "POST");
                throw new Exception();
            }
        }
    }
}
