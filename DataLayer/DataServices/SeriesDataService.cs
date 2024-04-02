using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class SeriesDataService
{
    public (List<Series>, int) GetSeries(int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var series = db.Series
            .Include(x => x.Games)
            .Include(x => x.BlueSide)
            .Include(x => x.RedSide)
            .Include(x => x.Winner);

        return (series.Skip(page * pageSize).Take(pageSize).ToList(), series.Count());
    }
    
    public Series? GetSingleSeries(int id)
    {
        var db = new Database();
        return db.Series
            .Include(x => x.Games)
            .Include(x => x.BlueSide)
            .Include(x => x.RedSide)
            .Include(x => x.Winner)
            .SingleOrDefault(x => x.Id == id);
    }
    
    public (List<Participation>, int) GetPlayersFromSeries(int seriesId, int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var participations = db.Participations
            .Include(x => x.Player)
            .Include(x => x.Team)
            .Include(x => x.Series)
            .Where(x => x.SeriesId == seriesId);

        return (participations.Skip(page * pageSize).Take(pageSize).ToList(), participations.Count());
    }

    public void PlaySeries(int blueSideId, int redSideId, int bestOf, DateOnly date)
    {
        var db = new Database();
        db.Database.ExecuteSql($"CALL play_series({blueSideId}, {redSideId}, {bestOf}, {date})");
    }
}