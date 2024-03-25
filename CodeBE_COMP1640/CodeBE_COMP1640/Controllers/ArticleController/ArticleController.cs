using CodeBE_COMP1640.Factories.Implements;
using CodeBE_COMP1640.Services.EmailS;
using CodeBE_COMP1640.Services.UserS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO.Compression;
using System.Net.Mail;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace CodeBE_COMP1640.Controllers.ArticleController
{
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;
        private readonly RepositoryFactory _repositoryFactory;
        private readonly IEmailSender _emailSender;
     
         private readonly IUserService _userService;
        private readonly JsonSerializerOptions _jsonSerializerOptions;

        public ArticleController(IServiceProvider serviceProvider, IConfiguration configuration,IEmailSender emailSender,IUserService userService)
        {
            _serviceProvider = serviceProvider;
            _configuration = configuration;
            _repositoryFactory = serviceProvider.GetService<RepositoryFactory>();
             this._emailSender = emailSender;
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _jsonSerializerOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                MaxDepth = 16
                
                // Các tuỳ chọn khác có thể được cấu hình tại đây nếu cần
            };
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
        public async Task<IActionResult> Add(ArticlePost request)
        {
            
                var data = _repositoryFactory.ArticleRepository.Create(request.ToEntity());
               await SendEmailToUsersWithMatchingDepartmentID(request.DepartmentId);
           
        
            return Ok(new
            {
                Data = data,
            });
                
            
        }
        private async Task SendEmailToUsersWithMatchingDepartmentID(int departmentId)
        {
            try
            {
                var users = await _userService.GetUsersByDepartmentId(departmentId);

                if (users != null && users.Count > 0)
                {
                    var emailRecipients = new List<string>();
                    foreach (var user in users)
                    {
                        emailRecipients.Add(user.Email);
                    }

                    var subject = "New Article Created";
                    var message = "A new article has been created in your department. Please check it out!";

                    await _emailSender.SendEmailAsync(emailRecipients, subject, message);
                }
            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ nếu cần
                Console.WriteLine($"Error sending email: {ex.Message}");
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
        
        [Route(ArticleRoute.GetByDepartment), HttpGet, Authorize]
        public IActionResult GetByDepartment(int departmentId)
        {
            try
            {
                var data = _repositoryFactory.ArticleRepository.GetListByDepartmentId(departmentId);
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
