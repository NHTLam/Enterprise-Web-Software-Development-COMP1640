using CodeBE_COMP1640.Factories.Implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO.Compression;

namespace CodeBE_COMP1640.Controllers.ArticleController
{
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;
        private readonly RepositoryFactory _repositoryFactory;

        public ArticleController(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            _serviceProvider = serviceProvider;
            _configuration = configuration;
            _repositoryFactory = serviceProvider.GetService<RepositoryFactory>();
        }

        [Route(ArticleRoute.Get), HttpGet, Authorize]
        public IActionResult Get(int id)
        {
            try
            {
                var data = _repositoryFactory.ArticleRepository.Get(id);
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

        [Route(ArticleRoute.Create), HttpPost, Authorize]
        public IActionResult Add(ArticlePost request)
        {
            try
            {
                var data = _repositoryFactory.ArticleRepository.Create(request.ToEntity());
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

        [Route(ArticleRoute.Update), HttpPut, Authorize]
        public IActionResult Update(int id, ArticlePut request)
        {
            try
            {
                var entity = request.ToEntity();
                entity.ArticleId = id;
                var data = _repositoryFactory.ArticleRepository.Update(request.ToEntity());
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

        [Route(ArticleRoute.Delete), HttpDelete, Authorize]
        public IActionResult Delete(int id)
        {
            try
            {
                var data = _repositoryFactory.ArticleRepository.Delete(id);
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

        //[HttpGet("byTopic/{topicId}")]
        //public IActionResult GetByTopic(int topicId)
        //{
        //    try
        //    {
        //        var data = _repositoryFactory.ArticleRepository.GetListByTopicId(topicId);
        //        return Ok(new
        //        {
        //            Data = data,
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Ok(new
        //        {
        //            Error = ex,
        //        });
        //    }
        //}

        [Route(ArticleRoute.GetByUser), HttpGet, Authorize]
        public IActionResult GetByUser(int userId)
        {
            try
            {
                var data = _repositoryFactory.ArticleRepository.GetListByUserId(userId);
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

        [Route(ArticleRoute.UploadFile), HttpPost, Authorize]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            string _uploadFolder = "./UploadFile";
            if (file == null || file.Length == 0)
                return BadRequest("File not selected");

            if (!Directory.Exists(_uploadFolder))
                Directory.CreateDirectory(_uploadFolder);

            var filePath = Path.Combine(_uploadFolder, file.FileName);

            if (System.IO.File.Exists(filePath))
                return Conflict("File already exists");

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Ok("File uploaded successfully");
        }

        [Route(ArticleRoute.Export), HttpGet, Authorize]
        public IActionResult ExportFiles()
        {
            string _uploadFolder = "./UploadFile";

            if (!Directory.Exists(_uploadFolder) || !Directory.EnumerateFiles(_uploadFolder).Any())
                return NotFound("No files found to export");

            var zipFileName = $"ExportedFiles_{DateTime.Now.ToString("yyyyMMddHHmmss")}.zip";
            var zipFilePath = Path.Combine(Directory.GetCurrentDirectory(), zipFileName);

            using (var zipArchive = ZipFile.Open(zipFilePath, ZipArchiveMode.Create))
            {
                var files = Directory.GetFiles(_uploadFolder);
                foreach (var file in files)
                {
                    zipArchive.CreateEntryFromFile(file, Path.GetFileName(file));
                }
            }

            var memory = new MemoryStream();
            using (var stream = new FileStream(zipFilePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;

            // Xóa tệp ZIP sau khi đã truyền dữ liệu từ nó
            System.IO.File.Delete(zipFilePath);

            return File(memory, "application/zip", zipFileName);
        }

    }
}
