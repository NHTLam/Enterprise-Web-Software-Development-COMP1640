using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;
using CodeBE_COMP1640.Controllers.UserController;
using CodeBE_COMP1640.Services.LogS;
using CodeBE_COMP1640.Controllers.BadWordController;

namespace CodeBE_COMP1640.Services.BadWordS
{
    public interface IBadWordService
    {
        Task<List<BadWord>> List();
        Task<BadWord> Get(long Id);
        Task<bool> Create(BadWord BadWord);
        Task<BadWord> Update(BadWord BadWord);
        Task<BadWord> Delete(BadWord BadWord);
    }
    public class BadWordService : IBadWordService
    {
        private IUOW UOW;
        private readonly IConfiguration Configuration;
        private readonly ILogService LogService;

        public BadWordService(
            IUOW UOW,
            IConfiguration Configuration,
            ILogService LogService
        )
        {
            this.UOW = UOW;
            this.Configuration = Configuration;
            this.LogService = LogService;
        }
        public async Task<bool> Create(BadWord BadWord)
        {
            string payload = BadWord.ToString() ?? "";
            try
            {
                await UOW.BadWordRepository.Create(BadWord);
                BadWord = await UOW.BadWordRepository.Get(BadWord.BadWordId);
                await LogService.Log(BadWord.ToString() ?? "", payload, "200", BadWordRoute.Create, "POST");
                return true;
            }
            catch (Exception ex)
            {
                await LogService.Log(ex.ToString() ?? "", payload, "500", BadWordRoute.Create, "POST");
                throw new Exception();
            }
        }

        public async Task<BadWord> Delete(BadWord BadWord)
        {
            string payload = BadWord.ToString() ?? "";
            try
            {
                await UOW.BadWordRepository.Delete(BadWord);
                await LogService.Log(BadWord.ToString() ?? "", payload, "200", BadWordRoute.Delete, "POST");
                return BadWord;
            }
            catch (Exception ex)
            {
                await LogService.Log(ex.ToString() ?? "", payload, "500", BadWordRoute.Delete, "POST");
                throw new Exception();
            }
        }

        public async Task<BadWord> Get(long Id)
        {
            BadWord BadWord = await UOW.BadWordRepository.Get(Id);
            if (BadWord == null)
                return null;
            return BadWord;
        }

        public async Task<List<BadWord>> List()
        {
            try
            {
                List<BadWord> BadWords = await UOW.BadWordRepository.List();
                return BadWords;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
       
        public async Task<BadWord> Update(BadWord BadWord)
        {
            string payload = BadWord.ToString() ?? "";
            try
            {
                var oldData = await UOW.BadWordRepository.Get(BadWord.BadWordId);

                await UOW.BadWordRepository.Update(BadWord);

                BadWord = await UOW.BadWordRepository.Get(BadWord.BadWordId);
                await LogService.Log(BadWord.ToString() ?? "", payload, "200", BadWordRoute.Update, "POST");
                return BadWord;
            }
            catch (Exception ex)
            {
                await LogService.Log(ex.ToString() ?? "", payload, "500", BadWordRoute.Update, "POST");
                throw new Exception();
            }
        }
    }
}
