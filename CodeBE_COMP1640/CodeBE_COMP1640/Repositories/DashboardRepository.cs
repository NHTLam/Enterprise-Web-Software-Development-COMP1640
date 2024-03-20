using CodeBE_COMP1640.Models;
using Microsoft.EntityFrameworkCore;

namespace CodeBE_COMP1640.Repositories
{
    public interface IDashboardRepository
    {
        Task<List<Article>> ListArticles();
    }
    public class DashboardRepository : IDashboardRepository
    {
        private DataContext DataContext;

        public DashboardRepository(DataContext DataContext)
        {
            this.DataContext = DataContext;
        }

        public async Task<List<Article>> ListArticles()
        {
            List<Article> Articles = await DataContext.Articles.AsNoTracking().ToListAsync();

            return Articles;
        }
    }
}
