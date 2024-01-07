using DataLayer;
using DataLayer.Entities;
using DataLayer.Utils;
using Microsoft.EntityFrameworkCore;

namespace DataLayerTests;

public class DatabaseTests
{
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
}