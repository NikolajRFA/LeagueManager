using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class PlayerDataService
{
    public (List<Player>, int) GetPlayers(int page = 0, int pageSize = 10)
    {
        var db = new Database();
        return (db.Players
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToList(),
            db.Players.Count());
    }

    public Player? GetPlayer(int id)
    {
        var db = new Database();
        return db.Players
            .FirstOrDefault(x => x.Id == id);
    }
    
    public (List<Game>, int) GetGamesFromPlayer(int playerId, int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var games = db.Players
            .Include(x => x.Games)
            .ThenInclude(x => x.BlueSide)
            .Include(x => x.Games)
            .ThenInclude(x => x.RedSide)
            .Include(x => x.Games)
            .ThenInclude(x => x.Winner)
            .FirstOrDefault(x => x.Id == playerId)?.Games;
        if (games == null) games = new List<Game>();
        
        return (games.Skip(page * pageSize).Take(pageSize).ToList(), games.Count);
    }
}