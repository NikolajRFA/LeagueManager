using DataLayer.Entities;

namespace DataLayer.DataServices;

public class GameDataService
{
    public (List<Game>, int) GetGames(int page = 0, int pageSize = 10)
    {
        var db = new Database();
        return (db.Games
            .Skip(page * pageSize)
            .Take(pageSize)
            .ToList(), db.Games.Count());
    }

    public Game? GetGame(int id)
    {
        var db = new Database();
        return db.Games.FirstOrDefault(x => x.Id == id);
    }
}