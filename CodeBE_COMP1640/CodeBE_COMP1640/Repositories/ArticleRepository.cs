using CodeBE_COMP1640.Bases;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.SearchModels;
using Microsoft.EntityFrameworkCore.Storage;
namespace CodeBE_COMP1640.Repositories
{
    public class ArticleRepository : RepositoryBase<Article, ArticleSearchModel>
    {
        public ArticleRepository(DataContext context, IConfiguration configuration) : base(context, configuration)
        {
        }

        public override Article Create(Article item)
        {
            _context.Articles.Add(item);
            _context.SaveChanges();
            return item;
        }

        public override Article Delete(int id)
        {
            var entity = _context.Articles.FirstOrDefault(x => x.ArticleId == id);
            _context.Articles.Remove(entity);
            _context.SaveChanges();
            return entity;
        }

        public override Article Get(int id)
        {
            return _context.Articles.FirstOrDefault(x => x.ArticleId == id);
        }

        public override IEnumerable<Article> GetList(ArticleSearchModel model)
        {
            return _context.Articles.Where(x =>
                (!model.SearchId.HasValue || model.SearchId == x.ArticleId) &&
                (!model.SearchUserId.HasValue || model.SearchUserId == x.UserId) &&
                (!model.SearchDepartmentId.HasValue || model.SearchDepartmentId == x.DepartmentId) &&
                (!model.IsLateSubmissionAllowed.HasValue || model.IsLateSubmissionAllowed == x.IsLateSubmissionAllowed) &&
                (!model.IsApproved.HasValue || model.IsApproved == x.IsApproved) &&
                (!model.SubmissionTimeFrom.HasValue || model.SubmissionTimeFrom <= x.SubmissionTime) &&
                (!model.SubmissionTimeTo.HasValue || model.SubmissionTimeTo > x.SubmissionTime));
        }

        public override Article Update(Article item)
        {
            var existingArticle = _context.Articles.FirstOrDefault(x => x.ArticleId == item.ArticleId);
            if (existingArticle != null)
            {
                existingArticle.DepartmentId = item.DepartmentId;
                existingArticle.UserId = item.UserId;
                existingArticle.Content = item.Content;
                existingArticle.SubmissionTime = item.SubmissionTime;
                existingArticle.IsLateSubmissionAllowed = item.IsLateSubmissionAllowed;
                existingArticle.IsApproved = item.IsApproved;
                existingArticle.IsTopic = item.IsTopic;
                existingArticle.TopicId = item.TopicId;

                // Update other properties if needed

                _context.SaveChanges();
            }
            return existingArticle; // Trả về null nếu không tìm thấy bản ghi
        }

        //public IEnumerable<Article> GetListByTopicId(int topicId)
        //{
        //    return _context.Articles.Where(x => x.TopicId == topicId);
        //}

        public IEnumerable<Article> GetListByUserId(int userId)
        {
            return _context.Articles.Where(x => x.UserId == userId);
        }
        public IEnumerable<Article> GetListByDepartmentId(int departmentId)
        {
            return _context.Articles.Where(x => x.DepartmentId == departmentId);
        }

        public IEnumerable<Article> GetAll()
        {
            return _context.Articles.ToList();
        }

    }
}
