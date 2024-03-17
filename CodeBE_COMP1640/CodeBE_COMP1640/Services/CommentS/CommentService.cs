using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;

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

        public CommentService(
            IUOW UOW,
            IConfiguration Configuration
        )
        {
            this.UOW = UOW;
            this.Configuration = Configuration;
        }
        public async Task<bool> Create(Comment Comment)
        {
            try
            {
                await UOW.CommentRepository.Create(Comment);
                Comment = await UOW.CommentRepository.Get(Comment.CommentId);
                return true;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<Comment> Delete(Comment Comment)
        {
            try
            {
                await UOW.CommentRepository.Delete(Comment);
                return Comment;
            }
            catch (Exception)
            {
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
            try
            {
                var oldData = await UOW.CommentRepository.Get(Comment.CommentId);

                await UOW.CommentRepository.Update(Comment);

                Comment = await UOW.CommentRepository.Get(Comment.CommentId);
                return Comment;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
    }
}
