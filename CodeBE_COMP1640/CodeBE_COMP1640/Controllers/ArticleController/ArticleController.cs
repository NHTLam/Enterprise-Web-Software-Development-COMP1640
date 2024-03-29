﻿using CodeBE_COMP1640.Factories.Implements;
using CodeBE_COMP1640.Services.EmailS;
using CodeBE_COMP1640.Services.UserS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO.Compression;
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
        private static readonly Dictionary<string, List<(string originalFileName, byte[] fileBytes)>> _articleFiles = new Dictionary<string, List<(string originalFileName, byte[] fileBytes)>>();

        public ArticleController(IServiceProvider serviceProvider, IConfiguration configuration, IEmailSender emailSender, IUserService userService)
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
            try
            {
                // Tạo entity từ request và đặt IsApproved là false
                var articleEntity = request.ToEntity();
                articleEntity.IsApproved = false;

                var data = _repositoryFactory.ArticleRepository.Create(articleEntity);
                await SendEmailToUsersWithMatchingDepartmentID(request.DepartmentId);

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

        [Route(ArticleRoute.ListArticle), HttpGet, Authorize]
        public IActionResult GetAllArticles()
        {
            try
            {
                var allArticles = _repositoryFactory.ArticleRepository.GetAll();
                return Ok(new
                {
                    Data = allArticles,
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
        [Route(ArticleRoute.Approve), HttpPut, Authorize(Roles = "Admin")]
        public IActionResult ApproveArticle(int articleId)
        {
            try
            {
                // Lấy article từ repository
                var article = _repositoryFactory.ArticleRepository.Get(articleId);

                // Kiểm tra xem article có tồn tại không
                if (article == null)
                {
                    return NotFound("Article not found");
                }

                // Cập nhật trạng thái IsApproved thành true
                article.IsApproved = true;
                _repositoryFactory.ArticleRepository.Update(article);

                return Ok(new
                {
                    Message = "Article approved successfully",
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
        public async Task<IActionResult> UploadFile(string articleId, List<IFormFile> files)
        {
            string uploadFolder = "./UploadFile";

            try
            {
                if (string.IsNullOrEmpty(articleId))
                    return BadRequest("Invalid articleId");

                if (files == null || files.Count == 0)
                    return BadRequest("No files selected");

                if (_articleFiles.ContainsKey(articleId))
                {
                    _articleFiles[articleId].Clear();
                }

                foreach (var file in files)
                {
                    if (file == null || file.Length == 0)
                        return BadRequest("File not selected");

                    // Kiểm tra định dạng của file
                    var allowedContentTypes = new[] { "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png", "image/gif" };
                    if (!allowedContentTypes.Contains(file.ContentType))
                        return BadRequest($"Invalid file format for file {file.FileName}. Only docx, jpeg, png, or gif files are allowed.");

                    var originalFileName = file.FileName;
                    var fileBytes = await file.GetBytesAsync();

                    // Kiểm tra xem có danh sách các file đã được tải lên cho articleId này chưa
                    if (!_articleFiles.ContainsKey(articleId))
                    {
                        // Nếu chưa có, tạo mới danh sách các file và thêm vào từ điển
                        _articleFiles[articleId] = new List<(string originalFileName, byte[] fileBytes)>();
                    }
                    var filePath = Path.Combine(uploadFolder, file.FileName);

                    // Lưu trữ tệp tin trên máy chủ local
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    // Thêm cặp giá trị (tên file gốc và dữ liệu byte) vào danh sách các file cho articleId này
                    _articleFiles[articleId].Add((originalFileName, fileBytes));
                }

                return Ok($"Files uploaded successfully for ArticleId: {articleId}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upload files: {ex.Message}");
            }
        }

        [Route(ArticleRoute.GetFile), HttpGet, Authorize]
        public IActionResult GetFile(string articleId)
        {
            if (_articleFiles.ContainsKey(articleId))
            {
                var fileList = _articleFiles[articleId];
                if (fileList != null && fileList.Any())
                {
                    var firstFileData = fileList.First();

                    var memory = new MemoryStream();
                    using (var zipArchive = new ZipArchive(memory, ZipArchiveMode.Create, true))
                    {
                        foreach (var fileData in fileList)
                        {
                            var entry = zipArchive.CreateEntry(fileData.originalFileName);

                            using (var entryStream = entry.Open())
                            {
                                entryStream.Write(fileData.fileBytes, 0, fileData.fileBytes.Length);
                            }
                        }
                    }
                    memory.Position = 0;

                    return File(memory, "application/zip", $"{firstFileData.originalFileName}.zip");
                }
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

