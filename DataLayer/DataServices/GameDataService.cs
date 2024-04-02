using DataLayer.Entities;
using DataLayer.Utils;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class GameDataService
{
    public (List<Game>, int) GetGames(int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var games = db.Games;
        return (games
            .Skip(page * pageSize)
            .Take(pageSize)
            .ToList(), games.Count());
    }

    public Game? GetGame(int id)
    {
        var db = new Database();
        return db.Games
            .SingleOrDefault(x => x.Id == id);
    }

    public void PlayGame(int blueSideTeamId, int redSideTeamId, DateOnly gameDate)
    {
        var db = new Database();
        db.Database.ExecuteSqlRaw("call play_game({0}, {1}, {2})", blueSideTeamId, redSideTeamId, gameDate);
    }
}