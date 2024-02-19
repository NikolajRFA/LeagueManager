using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class PlayerDataService
{
    public (List<Player>, int) GetPlayers(int page = 0, int pageSize = 10)
    {
        var db = new Database();
        return (db.Players
                .Include(x => x.Members)
                .ThenInclude(x => x.Team)
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToList(),
            db.Players.Count());
    }

    public Player? GetPlayer(int id)
    {
        var db = new Database();
        return db.Players
            .Include(x => x.Members)
            .ThenInclude(x => x.Team)
            .FirstOrDefault(x => x.Id == id);
    }

    public (List<Participation>, int) GetGamesFromPlayer(int playerId, int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var participations = db.Participations
            .Where(x => x.PlayerId == playerId)
            .Include(x => x.Game)
            .ThenInclude(x => x.BlueSide)
            .Include(x => x.Game)
            .ThenInclude(x => x.RedSide)
            .Include(x => x.Game)
            .ThenInclude(x => x.Winner)
            .Include(x => x.Game)
            .ThenInclude(x => x.Event);

        return (participations.Skip(page * pageSize).Take(pageSize).ToList(), participations.Count());
    }
}