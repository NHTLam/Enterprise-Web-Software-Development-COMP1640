using CodeBE_COMP1640.Bases;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.SearchModels;

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
            _context.Articles.Update(item);
            _context.SaveChanges();
            return item;
        }
    }
}
