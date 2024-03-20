using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace DataLayer.DataServices;

public class PlayerDataService
{
    public (List<Player>, int) GetPlayers(string? order, string? dir, int page = 0, int pageSize = 10)
    {
        var db = new Database();
        var players = db.Players
            .Include(x => x.Members)
            .ThenInclude(x => x.Team);

        var playerReturn = players.Where(x => true);

        // Default to no ordering if 'order' is null or whitespace
        if (!string.IsNullOrWhiteSpace(order))
        {
            // Construct the order by string dynamically
            var orderByString = $"{order} {dir}";
            playerReturn = players.OrderBy(orderByString);
        }

        return (playerReturn.Skip(page * pageSize)
            .Take(pageSize)
            .ToList(), db.Players.Count());
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
            .ThenInclude(x => x.Event)
            .OrderByDescending(x => x.Game.Date);

        return (participations.Skip(page * pageSize).Take(pageSize).ToList(), participations.Count());
    }

    public bool AddPlayer(Player player)
    {
        var db = new Database();
        db.Players.Add(player);
        return db.SaveChanges() > 0;
    }
}