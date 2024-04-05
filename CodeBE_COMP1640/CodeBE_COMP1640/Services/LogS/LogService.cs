using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using CodeBE_COMP1640.Models;
using CodeBE_COMP1640.Repositories;

namespace CodeBE_COMP1640.Services.LogS
{
    public interface ILogService
    {
        Task<List<Log>> List();
        Task<Log> Get(long Id);
        Task<bool> Create(Log Log);
        Task<Log> Delete(Log Log);
        Task Log(string Response, string PayLoad, string Status, string Path, string Method);  
    }
    public class LogService : ILogService
    {
        private IUOW UOW;
        private readonly IConfiguration Configuration;

        public LogService(
            IUOW UOW,
            IConfiguration Configuration
        )
        {
            this.UOW = UOW;
            this.Configuration = Configuration;
        }
        public async Task<bool> Create(Log Log)
        {
            try
            {
                await UOW.LogRepository.Create(Log);
                Log = await UOW.LogRepository.Get(Log.LogId);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public async Task<Log> Delete(Log Log)
        {
            try
            {
                await UOW.LogRepository.Delete(Log);
                return Log;
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public async Task<Log> Get(long Id)
        {
            Log Log = await UOW.LogRepository.Get(Id);
            if (Log == null)
                return null;
            return Log;
        }

        public async Task<List<Log>> List()
        {
            try
            {
                List<Log> Logs = await UOW.LogRepository.List();
                return Logs;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
       
        public async Task<Log> Update(Log Log)
        {
            try
            {
                var oldData = await UOW.LogRepository.Get(Log.LogId);

                await UOW.LogRepository.Update(Log);

                Log = await UOW.LogRepository.Get(Log.LogId);
                return Log;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task Log(string Response, string PayLoad, string Status, string Path, string Method)
        {
            try
            {
                Log log = new Log();
                log.Response = Response;
                log.PayLoad = PayLoad;
                log.Status = Status;
                log.Path = Path;
                log.Method = Method;
                await Create(log);
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    }
}
