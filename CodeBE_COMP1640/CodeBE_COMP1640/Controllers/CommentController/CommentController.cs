﻿using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Services.CommentS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CodeBE_COMP1640.Controllers.CommentController
{
    [ApiController]
    public class CommentController : ControllerBase
    {
        private ICommentService CommentService;

        public CommentController(
            ICommentService CommentService
        )
        {
            this.CommentService = CommentService;
        }

        [Route(CommentRoute.List), HttpPost, Authorize]
        public async Task<ActionResult<List<CommentDTO>>> List()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            List<Comment> Comments = await CommentService.List();
            List<CommentDTO> CommentDTOs = Comments.Select(x => new CommentDTO(x)).ToList();
            return CommentDTOs;
        }

        [Route(CommentRoute.ListByAtical), HttpPost, Authorize]
        public async Task<ActionResult<List<CommentDTO>>> ListByAtical([FromBody] CommentDTO CommentDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            List<Comment> Comments = await CommentService.List(CommentDTO.ArticleId ?? 0);
            List<CommentDTO> CommentDTOs = Comments.Select(x => new CommentDTO(x)).ToList();
            return CommentDTOs;
        }

        [Route(CommentRoute.Get), HttpPost, Authorize]
        public async Task<ActionResult<CommentDTO>> Get([FromBody] CommentDTO CommentDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Comment Comment = ConvertDTOToEntity(CommentDTO);
            Comment = await CommentService.Get(Comment.CommentId);
            CommentDTO = new CommentDTO(Comment);
            return CommentDTO;
        }

        [Route(CommentRoute.Create), HttpPost, Authorize]
        public async Task<ActionResult<bool>> Create([FromBody] CommentDTO CommentDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Comment Comment = ConvertDTOToEntity(CommentDTO);
            bool isRegisterSuccess = await CommentService.Create(Comment);
            if (isRegisterSuccess)
                return true;
            else
                return BadRequest("Commentname already exists");
        }

        [Route(CommentRoute.Update), HttpPost, Authorize]
        public async Task<ActionResult<CommentDTO>> Update([FromBody] CommentDTO CommentDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Comment Comment = ConvertDTOToEntity(CommentDTO);
            Comment = await CommentService.Update(Comment);
            CommentDTO = new CommentDTO(Comment);
            if (Comment != null)
                return CommentDTO;
            else
                return BadRequest(Comment);
        }

        [Route(CommentRoute.Delete), HttpPost, Authorize]
        public async Task<ActionResult<CommentDTO>> Delete([FromBody] CommentDTO CommentDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Comment Comment = ConvertDTOToEntity(CommentDTO);
            Comment = await CommentService.Delete(Comment);
            CommentDTO = new CommentDTO(Comment);
            if (Comment != null)
                return CommentDTO;
            else
                return BadRequest(Comment);
        }

        private Comment ConvertDTOToEntity(CommentDTO CommentDTO)
        {
            Comment Comment = new Comment();
            Comment.CommentId = CommentDTO.CommentId;
            Comment.ArticleId = CommentDTO.ArticleId ?? 0;
            Comment.UserId = CommentDTO.UserId ?? 0;
            Comment.CommentContent = CommentDTO.CommentContent;
            Comment.CommentTime = CommentDTO.CommentTime;
            return Comment;
        }
    }
}
