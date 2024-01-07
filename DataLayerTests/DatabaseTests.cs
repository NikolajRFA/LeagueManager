using DataLayer;
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
}