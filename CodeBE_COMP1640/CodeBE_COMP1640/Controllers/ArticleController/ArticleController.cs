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
        private static readonly Dictionary<int, (string originalFileName, byte[] fileBytes)> _articleFiles = new Dictionary<int, (string originalFileName, byte[] fileBytes)>();

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
        [HttpGet("byUser/{userId}")]
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
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("File not selected");

                var originalFileName = file.FileName;
                var fileBytes = await file.GetBytesAsync();

                _articleFiles[articleId] = (originalFileName, fileBytes);

                return Ok($"File uploaded successfully for ArticleId: {articleId}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upload file: {ex.Message}");
            }
        }

        [HttpGet("File/{articleId}")]
        public IActionResult GetFile(int articleId)
        {
            if (_articleFiles.TryGetValue(articleId, out (string originalFileName, byte[] fileBytes) fileData))
            {
                var memory = new MemoryStream();
                using (var zipArchive = new ZipArchive(memory, ZipArchiveMode.Create, true))
                {
                    var entry = zipArchive.CreateEntry(fileData.originalFileName);

                    using (var entryStream = entry.Open())
                    {
                        entryStream.Write(fileData.fileBytes, 0, fileData.fileBytes.Length);
                    }
                }
                memory.Position = 0;

                return File(memory, "application/octet-stream", $"Article_{articleId}_Files.zip");
            }

            return NotFound("No file found for the specified ArticleId");
        }

        [Route(ArticleRoute.Export), HttpGet, Authorize]
        public IActionResult ExportFiles()
        {
            string uploadFolder = "./UploadFile";

            if (!Directory.Exists(uploadFolder) || !Directory.EnumerateFiles(uploadFolder).Any())
                return NotFound("No files found to export");

            var zipFileName = $"ExportedFiles_{DateTime.Now.ToString("yyyyMMddHHmmss")}.zip";
            var zipFilePath = Path.Combine(Directory.GetCurrentDirectory(), zipFileName);

            using (var zipArchive = ZipFile.Open(zipFilePath, ZipArchiveMode.Create))
            {
                var files = Directory.GetFiles(uploadFolder);
                foreach (var file in files)
                {
                    var fileBytes = System.IO.File.ReadAllBytes(file);
                    var entry = zipArchive.CreateEntry(Path.GetFileName(file));
                    using (var entryStream = entry.Open())
                    {
                        entryStream.Write(fileBytes, 0, fileBytes.Length);
                    }
                }
            }

            var memory = new MemoryStream();
            using (var stream = new FileStream(zipFilePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;

            System.IO.File.Delete(zipFilePath);

            return File(memory, "application/zip", zipFileName);
        }

        /*private string GetFileExtension(byte[] fileBytes)
        {
            if (fileBytes.Length >= 2 && fileBytes[0] == 0x25 && fileBytes[1] == 0x50)
            {
                return "pdf";
            }
            else if (fileBytes.Length >= 4 && fileBytes[0] == 0x50 && fileBytes[1] == 0x4B && fileBytes[2] == 0x03 && fileBytes[3] == 0x04)
            {
                return "zip";
            }
            else
            {
                return "dat"; 
            }
        }*/

        [HttpGet("List/{departmentId}")]
        public IActionResult GetByDepartment(int departmentId)
        {
            try
            {
                var data = _repositoryFactory.ArticleRepository.GetArticlesDepartmentId(departmentId);
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

    public static class FormFileExtensions
    {
        public static async Task<byte[]> GetBytesAsync(this IFormFile file)
        {
            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                return ms.ToArray();
            }
        }
    }
}