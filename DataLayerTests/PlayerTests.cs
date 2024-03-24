using DataLayer.DataServices;
using DataLayer.Entities;
using DataLayer.Utils;
using RandomUserSharp.Models;
using Xunit.Abstractions;

namespace DataLayerTests;

public class PlayerTests
{
    private readonly ITestOutputHelper _testOutputHelper;

    public PlayerTests(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
    }

    [Fact]
    public void RandomPlayer_Single_NewPlayer()
    {
        var player = PlayerBuilder.RandomPlayer(gender: Gender.Male,  nationalities: new List<Nationality> { Nationality.DK });
        Assert.NotNull(player);
        _testOutputHelper.WriteLine($"{player.FirstName} '{player.Alias}' {player.LastName}: {player.Age}{player.Gender.First()}, {player.Nationality}. Overall: {player.Overall}");
    }
    
    [Fact]
    public void RandomPlayer_100_NewPlayers()
    {
        var players = new List<Player>();

        for (int i = 0; i < 100; i++)
        {
            players.Add(PlayerBuilder.RandomPlayer(gender: Gender.Male,  nationalities: new List<Nationality> { Nationality.DK }));
        }

        foreach (var player in players)
        {
            Assert.NotNull(player);
            _testOutputHelper.WriteLine($"{player.FirstName} '{player.Alias}' {player.LastName}: {player.Age}{player.Gender.First()}, {player.Nationality}. Overall: {player.Overall}");    
        }
    }

    [Fact]
    public void AddPlayer_RandomPlayer_Success()
    {
        var dataService = new PlayerDataService();
        var player = PlayerBuilder.RandomPlayer();
        Assert.True(dataService.AddPlayer(player));
    }

    [Fact]
    public void IsMember_PlayerWithId1_True()
    {
        var memberDataService = new MemberDataService();
        Assert.True(memberDataService.IsMember(5));
    }

    [Fact]
    public void TerminateMember_Player7Team1_False()
    {
        var memberDataService = new MemberDataService();
        Assert.False(memberDataService.TerminateMember(1, 7, DateOnly.FromDateTime(DateTime.Now)));
    }
    
    [Fact]
    public void TerminateMember_Player7Team2_True()
    {
        var memberDataService = new MemberDataService();
        Assert.True(memberDataService.TerminateMember(2, 7, DateOnly.FromDateTime(DateTime.Now)));
    }

    [Fact]
    public void AddMember_Player7Team2_True()
    {
        var memberDataService = new MemberDataService();
        Assert.True(memberDataService.AddMember(2, 7, DateOnly.FromDateTime(DateTime.Now.AddDays(1))));
    }
}