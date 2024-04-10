using DataLayer.Entities;

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
}