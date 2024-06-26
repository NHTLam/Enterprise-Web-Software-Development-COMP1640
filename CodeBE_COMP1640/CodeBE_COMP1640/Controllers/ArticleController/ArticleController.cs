﻿using CodeBE_COMP1640.Factories.Implements;
using CodeBE_COMP1640.Services.EmailS;
using CodeBE_COMP1640.Services.PermissionS;
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
        private readonly IPermissionService PermissionService;
        private readonly JsonSerializerOptions _jsonSerializerOptions;
        private static readonly Dictionary<string, List<(string originalFileName, byte[] fileBytes)>> _articleFiles = new Dictionary<string, List<(string originalFileName, byte[] fileBytes)>>();

        public ArticleController(IServiceProvider serviceProvider, IConfiguration configuration, IEmailSender emailSender, IUserService userService, IPermissionService permissionService)
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
            PermissionService = permissionService;
        }

        [Route(ArticleRoute.Get), HttpGet, Authorize]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                if (!await PermissionService.HasPermission(ArticleRoute.Get, PermissionService.GetUserId()))
                {
                    return Forbid();
                }

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
                if (!await PermissionService.HasPermission(ArticleRoute.Create, PermissionService.GetUserId()))
                {
                    return Forbid();
                }

                // Always set IsApproved to false
                request.IsApproved = false;
                request.Isfeedback = false;

                // Tạo entity từ request và đặt IsApproved là false
                var articleEntity = request.ToEntity();
                articleEntity.SubmissionTime = DateTime.Now;
                articleEntity.StartDate = request.StartDate;
                articleEntity.EndDate = request.EndDate;
                articleEntity.TopicId = request.TopicId;

                if (!string.IsNullOrEmpty(request.Title))
                {
                    articleEntity.Title = request.Title;
                }
                // Không gán giá trị cho IsApproved trong đối tượng articleEntity

                var data = _repositoryFactory.ArticleRepository.Create(articleEntity);
                articleEntity = _repositoryFactory.ArticleRepository.Get(data.ArticleId);
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
        public async Task<IActionResult> Update(int id, ArticlePut request)
        {
            try
            {
                if (!await PermissionService.HasPermission(ArticleRoute.Update, PermissionService.GetUserId()))
                {
                    return Forbid();
                }

                // Chuyển đổi dữ liệu từ request thành đối tượng Article
                var articleEntity = request.ToEntity();

                // Đặt thời gian gửi lại là thời gian hiện tại
                articleEntity.SubmissionTime = DateTime.Now;

                // Đặt ID của bài viết là ID được truyền
                articleEntity.ArticleId = id;

                // Cập nhật thông tin của bài viết trong cơ sở dữ liệu
                var updatedArticle = _repositoryFactory.ArticleRepository.Update(articleEntity);

                // Kiểm tra xem việc cập nhật đã thành công hay không
                if (updatedArticle != null)
                {
                    return Ok(new
                    {
                        Data = updatedArticle,
                    });
                }
                else
                {
                    return NotFound("Article not found or could not be updated");
                }
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
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (!await PermissionService.HasPermission(ArticleRoute.Delete, PermissionService.GetUserId()))
                {
                    return Forbid();
                }

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

        [Route(ArticleRoute.ListArticle), HttpGet]
        public IActionResult GetAllArticles()
        {
            try
            {
                var allArticles = _repositoryFactory.ArticleRepository.GetAll();

                // Lấy danh sách UserId từ tất cả các bài viết
                var userIds = allArticles.Select(a => a.UserId).Distinct();

                // Lấy thông tin về người dùng dựa trên danh sách UserId đã lấy
                var users = _repositoryFactory.ArticleRepository.GetUsersByIds(userIds);

                // Tạo một Dictionary để lưu thông tin về người dùng theo UserId
                var userDictionary = users.ToDictionary(u => u.UserId);

                // Bổ sung thông tin về người dùng vào mỗi bài viết
                foreach (var article in allArticles)
                {
                    if (userDictionary.ContainsKey(article.UserId))
                    {
                        article.User = userDictionary[article.UserId];
                    }
                }

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
        public async Task<IActionResult> GetByUser(int userId)
        {
            try
            {
                if (!await PermissionService.HasPermission(ArticleRoute.GetByUser, PermissionService.GetUserId()))
                {
                    return Forbid();
                }

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
        public async Task<IActionResult> GetByDepartment(int departmentId)
        {
            try
            {
                if (!await PermissionService.HasPermission(ArticleRoute.GetByDepartment, PermissionService.GetUserId()))
                {
                    return Forbid();
                }

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
        [Route(ArticleRoute.Approve), HttpPut, Authorize]
        public async Task<IActionResult> ApproveArticle(ArticleRequest request)
        {
            try
            {
                if (!await PermissionService.HasPermission(ArticleRoute.Approve, PermissionService.GetUserId()))
                {
                    return Forbid();
                }

                // Lấy article từ repository
                var article = _repositoryFactory.ArticleRepository.Get(request.ArticleId);
                if (article == null)
                {
                    return NotFound("Article not found");
                }

                article.IsApproved = true; // Đặt trường IsApproved thành true
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
                if (!await PermissionService.HasPermission(ArticleRoute.UploadFile, PermissionService.GetUserId()))
                {
                    return Forbid();
                }

                if (string.IsNullOrEmpty(articleId))
                    return BadRequest("Invalid articleId");

                if (files == null || files.Count == 0)
                    return Ok();

                if (_articleFiles.ContainsKey(articleId))
                {
                    _articleFiles[articleId].Clear();
                }

                foreach (var file in files)
                {
                    if (file == null || file.Length == 0)
                        continue;

                    var allowedContentTypes = new[] { "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png", "image/gif" };
                    if (!allowedContentTypes.Contains(file.ContentType))
                        return BadRequest($"Invalid file format for file {file.FileName}. Only docx, jpeg, png, or gif files are allowed.");

                    var originalFileName = file.FileName;
                    var fileBytes = await file.GetBytesAsync();

                    if (!_articleFiles.ContainsKey(articleId))
                    {
                        _articleFiles[articleId] = new List<(string originalFileName, byte[] fileBytes)>();
                    }
                    var filePath = Path.Combine(uploadFolder, file.FileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    _articleFiles[articleId].Add((originalFileName, fileBytes));
                }

                return Ok($"Files uploaded successfully for ArticleId: {articleId}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to upload files: {ex.Message}");
            }
        }

        [Route(ArticleRoute.GetFile), HttpPost, Authorize]
        public async Task<IActionResult> GetFile(string articleId)
        {
            if (!await PermissionService.HasPermission(ArticleRoute.GetFile, PermissionService.GetUserId()))
            {
                return Forbid();
            }

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

        [Route(ArticleRoute.GetUploadedFiles), HttpPost, Authorize]
        public async Task<IActionResult> GetUploadedFiles(string articleId)
        {
            if (!await PermissionService.HasPermission(ArticleRoute.GetUploadedFiles, PermissionService.GetUserId()))
            {
                return Forbid();
            }

            if (_articleFiles.ContainsKey(articleId))
            {
                var fileList = _articleFiles[articleId];
                if (fileList != null && fileList.Any())
                {
                    var uploadedFiles = new List<UploadedFileDto>();

                    foreach (var fileData in fileList)
                    {
                        var uploadedFile = new UploadedFileDto
                        {
                            FileName = fileData.originalFileName,
                            DownloadUrl = Url.Action("DownloadFile", "Article", new { articleId = articleId, fileName = fileData.originalFileName })
                        };

                        if (IsImageFile(fileData.originalFileName))
                        {
                            uploadedFile.ImageUrl = Url.Action("DownloadFile", "Article", new { articleId = articleId, fileName = fileData.originalFileName });
                        }

                        uploadedFiles.Add(uploadedFile);
                    }

                    return Ok(new
                    {
                        Data = uploadedFiles
                    });
                }
            }

            return NotFound("No file found for the specified ArticleId");
        }

        private bool IsImageFile(string fileName)
        {
            var imageExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            return imageExtensions.Contains(extension);
        }
    }

    public class UploadedFileDto
    {
        public string FileName { get; set; }
        public string DownloadUrl { get; set; }
        public string ImageUrl { get; set; }
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
