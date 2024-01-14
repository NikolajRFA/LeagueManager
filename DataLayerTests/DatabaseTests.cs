using DataLayer;
using DataLayer.Entities;
using DataLayer.Utils;
using Microsoft.EntityFrameworkCore;
using Xunit.Abstractions;

namespace DataLayerTests;

public class DatabaseTests
{
    private readonly ITestOutputHelper _testOutputHelper;

    public DatabaseTests(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
    }

    [Fact]
    public void Connect_NoArgs_Success()
    {
        var db = new Database();
        db.Database.ExecuteSqlRaw("SELECT count(*) FROM player");
    }

    [Fact]
    public void CheckAllTables_NoArgs_Success()
    {
        var db = new Database();
        var player = db.Players
            .Include(x => x.Teams)
            .FirstOrDefault();
        var team = db.Teams
            .Include(x => x.Players)
            .Include(x => x.League)
            .FirstOrDefault();
        var league = db.Leagues
            .Include(x => x.Teams)
            .FirstOrDefault();
        var member = db.Members
            .Include(x => x.Player)
            .Include(x => x.Team)
            .FirstOrDefault();
    }

    [Fact]
    public void InsertPlayers_10_Success()
    {
        var db = new Database();
        var beforeInsert = db.Players.Count();
        
        var players = new List<Player>();
        for (int i = 0; i < 10; i++)
        {
            players.Add(PlayerBuilder.RandomPlayer());
        }
        
        db.Players.AddRange(players);
        db.SaveChanges();
        Assert.Equal(beforeInsert + 10, db.Players.Count());
    }

    [Fact]
    public void GetParticipations_GameId1_AllParticipations()
    {
        var db = new Database();
        var participations = db.Participations
            .Include(x => x.Player)
            .Include(x => x.Team)
            .Where(x => x.GameId == 1).ToList();

        foreach (var participation in participations)
        {
            _testOutputHelper.WriteLine($"{participation.Player.FirstName} {participation.Player.LastName}: {participation.Role} for {participation.Team.Name}");
        }
    }

    [Fact]
    public void GetPlayersFromGame_GameId1_Success()
    {
        var db = new Database();
        var players = db.Games
            .Include(x => x.Players)
            .FirstOrDefault()?.Players;
        
        Assert.NotNull(players);
        
        foreach (var player in players) 
        {
            _testOutputHelper.WriteLine($"{player.FirstName} {player.LastName} {player.Age} {player.Nationality}");
        }
    }
}