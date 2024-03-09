using CodeBE_COMP1640.Factories.Implements;
using Microsoft.AspNetCore.Mvc;

namespace CodeBE_COMP1640.Controllers.ArticleController
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;
        private readonly RepositoryFactory _reposifactory;

        public ArticleController(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            _serviceProvider = serviceProvider;
            _configuration = configuration;
            _reposifactory = serviceProvider.GetService<RepositoryFactory>();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var data = _reposifactory.ArticleRepository.Get(id);
                return Ok(new
                {
                    Data = data,
                });
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    Error = ex,
                });
            }
        }

        [HttpPost]
        public IActionResult Add(ArticlePost request)
        {
            try
            {
                var data = _reposifactory.ArticleRepository.Create(request.ToEntity());
                return Ok(new
                {
                    Data = data,
                });
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    Error = ex,
                });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, ArticlePut request)
        {

            try
            {
                var entity = request.ToEntity();
                entity.ArticleId = id;
                var data = _reposifactory.ArticleRepository.Update(request.ToEntity());
                return Ok(new
                {
                    Data = data,
                });
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    Error = ex,
                });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var data = _reposifactory.ArticleRepository.Delete(id);
                return Ok(new
                {
                    Data = data,
                });
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    Error = ex,
                });
            }
        }
    }

}
