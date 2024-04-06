using CodeBE_COMP1640.Controllers.PermissionController;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Services.PermissionS;
using CodeBE_COMP1640.Services.BadWordS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CodeBE_COMP1640.Controllers.BadWordController
{
    [ApiController]
    public class BadWordController : ControllerBase
    {
        private IBadWordService BadWordService;
        private IPermissionService PermissionService;

        public BadWordController(
            IBadWordService BadWordService,
            IPermissionService PermissionService
        )
        {
            this.BadWordService = BadWordService;
            this.PermissionService = PermissionService;
        }

        [Route(BadWordRoute.List), HttpPost, Authorize]
        public async Task<ActionResult<List<BadWordDTO>>> List()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await PermissionService.HasPermission(BadWordRoute.List, PermissionService.GetUserId()))
            {
                return Forbid();
            }

            List<BadWord> BadWords = await BadWordService.List();
            List<BadWordDTO> BadWordDTOs = BadWords.Select(x => new BadWordDTO(x)).ToList();
            return BadWordDTOs;
        }

        [Route(BadWordRoute.Create), HttpPost, Authorize]
        public async Task<ActionResult<bool>> Create([FromBody] BadWordDTO BadWordDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await PermissionService.HasPermission(BadWordRoute.Create, PermissionService.GetUserId()))
            {
                return Forbid();
            }

            BadWord BadWord = ConvertDTOToEntity(BadWordDTO);
            bool isRegisterSuccess = await BadWordService.Create(BadWord);
            if (isRegisterSuccess)
                return true;
            else
                return BadRequest("BadWordname already exists");
        }

        [Route(BadWordRoute.Update), HttpPost, Authorize]
        public async Task<ActionResult<BadWordDTO>> Update([FromBody] BadWordDTO BadWordDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await PermissionService.HasPermission(BadWordRoute.Update, PermissionService.GetUserId()))
            {
                return Forbid();
            }

            BadWord BadWord = ConvertDTOToEntity(BadWordDTO);
            BadWord = await BadWordService.Update(BadWord);
            BadWordDTO = new BadWordDTO(BadWord);
            if (BadWord != null)
                return BadWordDTO;
            else
                return BadRequest(BadWord);
        }

        [Route(BadWordRoute.Delete), HttpPost, Authorize]
        public async Task<ActionResult<BadWordDTO>> Delete([FromBody] BadWordDTO BadWordDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await PermissionService.HasPermission(BadWordRoute.Delete, PermissionService.GetUserId()))
            {
                return Forbid();
            }

            BadWord BadWord = ConvertDTOToEntity(BadWordDTO);
            BadWord = await BadWordService.Delete(BadWord);
            BadWordDTO = new BadWordDTO(BadWord);
            if (BadWord != null)
                return BadWordDTO;
            else
                return BadRequest(BadWord);
        }

        private BadWord ConvertDTOToEntity(BadWordDTO BadWordDTO)
        {
            BadWord BadWord = new BadWord();
            BadWord.BadWordId = BadWordDTO.BadWordId;
            BadWord.Name = BadWordDTO.Name;

            return BadWord;
        }
    }
}
