using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class TeamDataService
{
    public (List<Team>, int) GetTeams(int page = 0, int pageSize = 10)
    {
        var db = new Database();
        return (db.Teams
                .Include(x => x.Players)
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToList(),
            db.Teams.Count());
    }

    public Team? GetTeam(int id)
    {
        var db = new Database();
        return db.Teams
            .FirstOrDefault(x => x.Id == id);
    }
}