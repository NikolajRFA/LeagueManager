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
}