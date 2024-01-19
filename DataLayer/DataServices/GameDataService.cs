using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

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

    public List<Game>? GetGamesFromPlayer(int playerId)
    {
        var db = new Database();
        return db.Players
            .Include(x => x.Games)
            .FirstOrDefault(x => x.Id == playerId)?.Games;
    }

    public List<Player>? GetPlayersFromGame(int gameId)
    {
        var db = new Database();
        return db.Games
            .Include(x => x.Players)
            .FirstOrDefault(x => x.Id == gameId)?.Players;
    }

    public Game PlayGame(int blueSideTeamId, int redSideTeamId, DateOnly gameDate)
    {
        var db = new Database();
        var game = new Game
        {
            BlueSideId = blueSideTeamId,
            RedSideId = redSideTeamId
        };
        var dbGame = db.Games.Add(game);

        var gameTeamsActiveMembers = db.Members
            .Where(x => (x.TeamId == blueSideTeamId || x.TeamId == redSideTeamId)
                        && x.Role != null
                        && x.FromDate < gameDate
                        && x.ToDate > gameDate
            ).ToList();

        var participations = new List<Participation>();
        foreach (var member in gameTeamsActiveMembers)
        {
            participations.Add(new Participation
            {
                GameId = dbGame.Entity.Id,
                PlayerId = member.PlayerId,
                Role = member.Role!,
                TeamId = member.TeamId
            });
        }
        
        db.Participations.AddRange(participations);
        
        // TODO: Calculate who won
    }
}