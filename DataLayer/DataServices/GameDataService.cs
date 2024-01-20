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
        // Find previous max game id
        var maxGameId = db.Games.Max(x => x.Id);
        // Create new game with the teams
        var game = new Game
        {
            Id = maxGameId + 1,
            BlueSideId = blueSideTeamId,
            RedSideId = redSideTeamId,
            Date = gameDate
        };
        
        db.Games.Add(game);
        
        // Find active members of the teams on the game date
        var gameTeamsActiveMembers = db.Members
            .Where(x => (x.TeamId == blueSideTeamId || x.TeamId == redSideTeamId)
                        && x.Role != "benched"
                        && x.FromDate <= gameDate
                        && (x.ToDate >= gameDate || x.ToDate == null)
            ).ToList();

        // Add members to participations
        var participations = new List<Participation>();
        foreach (var member in gameTeamsActiveMembers)
        {
            participations.Add(new Participation
            {
                GameId = maxGameId + 1,
                PlayerId = member.PlayerId,
                Role = member.Role,
                TeamId = member.TeamId
            });
        }
        
        db.Participations.AddRange(participations);
        db.SaveChanges();
        
        // Get minimum team skill levels based on the number of players in the teams
        var minTotalSkillBlueSide = 
            Settings.MinSkillLvl * 
            participations.Count(x => x.TeamId == blueSideTeamId) *
            Settings.PlayerAmountOfSkills;
        var minTotalSkillRedSide = 
            Settings.MinSkillLvl * 
            participations.Count(x => x.TeamId == redSideTeamId) *
            Settings.PlayerAmountOfSkills;

        // Calculate team total skill levels based on the teams players
        var totalSkillBlueSide =
            participations
                .Where(x => x.TeamId == blueSideTeamId)
                .Select(x => db.TotalSkillResults
                    .FromSqlRaw("SELECT get_total_player_skill({0}) AS total_skill", x.PlayerId)
                    .SingleOrDefault()!.TotalSkill)
                .Sum();
        var totalSkillRedSide =
            participations
                .Where(x => x.TeamId == redSideTeamId)
                .Select(x => db.TotalSkillResults
                    .FromSqlRaw("SELECT get_total_player_skill({0}) AS total_skill", x.PlayerId)
                    .SingleOrDefault()!.TotalSkill)
                .Sum();

        // Use randomness to find a game winner
        var rand = new Random();
        var blueSidePerformance = rand.Next(minTotalSkillBlueSide, totalSkillBlueSide);
        var redSidePerformance = rand.Next(minTotalSkillRedSide, totalSkillRedSide);
        
        // Add winning team to winner_id
        db.Games.Single(x => x.Id == maxGameId + 1).WinnerId =
            blueSidePerformance > redSidePerformance ? blueSideTeamId : redSideTeamId;
        db.SaveChanges();
        
        return db.Games.Single(x => x.Id == maxGameId + 1);
    }
}