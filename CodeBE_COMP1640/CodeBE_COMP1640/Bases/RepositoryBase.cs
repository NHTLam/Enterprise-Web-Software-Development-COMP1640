using CodeBE_COMP1640.Models;

namespace CodeBE_COMP1640.Bases
{
    public abstract class RepositoryBase<E, M> where M : SearchModel<E>
    {
        protected IConfiguration _configuration;
        protected readonly DataContext _context;

        protected RepositoryBase(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public abstract IEnumerable<E> GetList(M model);
        public abstract E Get(int id);
        public abstract E Delete(int id);
        public abstract E Create(E entity);
        public abstract E Update(E entity);
    }
}
