using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class EventDataService
{
    public Event? GetEvent(int id)
    {
        var db = new Database();
        return db.Events.SingleOrDefault(x => x.Id == id);
    }

    public (List<Event>, int) GetEvents(int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var events = db.Events;

        return (events.Skip(page * pageSize).Take(pageSize).ToList(), events.Count());
    }

    public (List<Series>, int) GetSeriesFromEvent(int eventId, int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var series = db.Series
            .Include(x => x.Games)
            .Include(x => x.BlueSide)
            .Include(x => x.RedSide)
            .Include(x => x.Winner)
            .Where(x => x.EventId == eventId);

        return (series.Skip(page * pageSize).Take(pageSize).ToList(), series.Count());
    }
}