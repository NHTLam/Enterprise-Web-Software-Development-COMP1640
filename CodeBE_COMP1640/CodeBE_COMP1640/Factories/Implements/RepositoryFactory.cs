using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;

namespace CodeBE_COMP1640.Factories.Implements
{
    public class RepositoryFactory
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public RepositoryFactory(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            ArticleRepository = new ArticleRepository(context, configuration);
        }

        public ArticleRepository ArticleRepository { get; set; }
    }
}
