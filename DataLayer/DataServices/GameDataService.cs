using DataLayer.Entities;
using DataLayer.Utils;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class GameDataService
{
    public (List<Game>, int) GetGames(int page = 0, int pageSize = 10)
    {
        var db = new Database();
        return (db.Games
            .Include(x => x.BlueSide)
            .Include(x => x.RedSide)
            .Include(x => x.Winner)
            .Include(x => x.Event)
            .Skip(page * pageSize)
            .Take(pageSize)
            .ToList(), db.Games.Count());
    }

    public Game? GetGame(int id)
    {
        var db = new Database();
        return db.Games
            .Include(x => x.BlueSide)
            .Include(x => x.RedSide)
            .Include(x => x.Winner)
            .Include(x => x.Event)
            .FirstOrDefault(x => x.Id == id);
    }

    public List<Player>? GetPlayersFromGame(int gameId)
    {
        var db = new Database();
        return db.Games
            .Include(x => x.Players)
            .FirstOrDefault(x => x.Id == gameId)?.Players;
    }

    public void PlayGame(int blueSideTeamId, int redSideTeamId, DateOnly gameDate)
    {
        var db = new Database();
        db.Database.ExecuteSqlRaw("call play_game({0}, {1}, {2})", blueSideTeamId, redSideTeamId, gameDate);
    }
}