using CodeBE_COMP1640.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CodeBE_COMP1640.Repositories
{
    public interface IBadWordRepository
    {
        Task<List<BadWord>> List();
        Task<BadWord> Get(long Id);
        Task<bool> Create(BadWord BadWord);
        Task<bool> Update(BadWord BadWord);
        Task<bool> Delete(BadWord BadWord);

    }

    public class BadWordRepository : IBadWordRepository
    {
        private DataContext DataContext;

        public BadWordRepository(DataContext DataContext)
        {
            this.DataContext = DataContext;
        }

        public async Task<List<BadWord>> List()
        {
            List<BadWord> BadWords = await DataContext.BadWords.AsNoTracking().ToListAsync();

            return BadWords;
        }

        public async Task<BadWord> Get(long Id)
        {
            BadWord? BadWord = await DataContext.BadWords.AsNoTracking()
            .Where(x => x.BadWordId == Id).FirstOrDefaultAsync();

            if (BadWord == null)
                return null;

            return BadWord;
        }

        public async Task<bool> Create(BadWord BadWord)
        {
            DataContext.BadWords.Add(BadWord);
            await DataContext.SaveChangesAsync();
            BadWord.BadWordId = BadWord.BadWordId;
            return true;
        }

        public async Task<bool> Update(BadWord BadWord)
        {
            BadWord? NewBadWord = DataContext.BadWords
                .Where(x => x.BadWordId == BadWord.BadWordId)
                .FirstOrDefault();
            if (NewBadWord == null)
                return false;
            NewBadWord.BadWordId = BadWord.BadWordId;
            NewBadWord.Name = BadWord.Name;
            await DataContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(BadWord BadWord)
        {
            BadWord? CurrentBadWord = DataContext.BadWords
                .Where(x => x.BadWordId == BadWord.BadWordId)
                .FirstOrDefault();
            if (BadWord == null)
                return false;
            DataContext.BadWords.Remove(CurrentBadWord);
            await DataContext.SaveChangesAsync();
            return true;
        }
    }
}
