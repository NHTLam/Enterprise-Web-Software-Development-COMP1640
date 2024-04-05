using CodeBE_COMP1640.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CodeBE_COMP1640.Repositories
{
    public interface ILogRepository
    {
        Task<List<Log>> List();
        Task<Log> Get(long Id);
        Task<bool> Create(Log Log);
        Task<bool> Update(Log Log);
        Task<bool> Delete(Log Log);

    }

    public class LogRepository : ILogRepository
    {
        private DataContext DataContext;

        public LogRepository(DataContext DataContext)
        {
            this.DataContext = DataContext;
        }

        public async Task<List<Log>> List()
        {
            List<Log> Logs = await DataContext.Logs.AsNoTracking().ToListAsync();

            return Logs;
        }

        public async Task<Log> Get(long Id)
        {
            Log? Log = await DataContext.Logs.AsNoTracking()
            .Where(x => x.LogId == Id).FirstOrDefaultAsync();

            if (Log == null)
                return null;

            return Log;
        }

        public async Task<bool> Create(Log Log)
        {
            DataContext.Logs.Add(Log);
            await DataContext.SaveChangesAsync();
            Log.LogId = Log.LogId;
            return true;
        }

        public async Task<bool> Update(Log Log)
        {
            Log? NewLog = DataContext.Logs
                .Where(x => x.LogId == Log.LogId)
                .FirstOrDefault();
            if (NewLog == null)
                return false;
            NewLog.LogId = Log.LogId;
            NewLog.Response = Log.Response;
            NewLog.PayLoad = Log.PayLoad;
            NewLog.Status = Log.Status;
            NewLog.Path = Log.Path;
            NewLog.Method = Log.Method;
            await DataContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(Log Log)
        {
            Log? CurrentLog = DataContext.Logs
                .Where(x => x.LogId == Log.LogId)
                .FirstOrDefault();
            if (Log == null)
                return false;
            DataContext.Logs.Remove(CurrentLog);
            await DataContext.SaveChangesAsync();
            return true;
        }
    }
}
