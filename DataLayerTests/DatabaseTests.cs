using System.Text.RegularExpressions;
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
            //.Include(x => x.League)
            .FirstOrDefault();
        /*var league = db.Leagues
            .Include(x => x.Teams)
            .FirstOrDefault();*/
        var member = db.Members
            .Include(x => x.Player)
            .Include(x => x.Team)
            .FirstOrDefault();
    }

    [Fact]
    public void GetParticipations_SeriesId1_AllParticipations()
    {
        var db = new Database();
        var participations = db.Participations
            .Include(x => x.Player)
            .Include(x => x.Team)
            .Where(x => x.SeriesId == 1).ToList();

        foreach (var participation in participations)
        {
            _testOutputHelper.WriteLine($"{participation.Player.FirstName} {participation.Player.LastName}: {participation.Role} for {participation.Team.Name}");
        }
    }

    [Fact]
    public void GetSeriesFromPlayer_PlayerId1_Success()
    {
        var db = new Database();
        var games = db.Players
            .Include(x => x.Series)
            .FirstOrDefault(x => x.Id == 1)!.Series;
        
        Assert.NotNull(games);

        foreach (var game in games)
        {
            _testOutputHelper.WriteLine($"{game.Id}");
        }
    }

    [Fact]
    public void GetDateFromSeries_SeriesId1_Success()
    {
        var db = new Database();
        var date = db.Series.FirstOrDefault(x => x.Id == 1)!.Date;
        
        Assert.Matches(@"\d{2}-\d{2}-\d{4}", date.ToString());
        
        _testOutputHelper.WriteLine(date.ToString());
    }
}