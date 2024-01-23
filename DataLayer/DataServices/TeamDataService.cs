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
                .Include(x => x.League)
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToList(),
            db.Teams.Count());
    }

    public Team? GetTeam(int id)
    {
        var db = new Database();
        return db.Teams
            .Include(x => x.Players)
            .Include(x => x.League)
            .FirstOrDefault(x => x.Id == id);
    }
    
    public (List<Game>, int) GetGames(int teamId, int page, int pageSize)
    {
        var db = new Database();
        var games = db.Games
            .Include(x => x.BlueSide)
            .Include(x => x.RedSide)
            .Include(x => x.Winner)
            .Where(x => x.Id == teamId);

        return (games
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToList(),
            games.Count());
    }
}