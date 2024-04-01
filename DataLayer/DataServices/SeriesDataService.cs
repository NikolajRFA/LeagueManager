using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class SeriesDataService
{
    public Series GetSeries(int id)
    {
        var db = new Database();
        return db.Series
            .Include(x => x.Games)
            .Single(x => x.Id == id);
    }
}