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
        var player = PlayerBuilder.RandomPlayer(Gender.Male,  new List<Nationality> { Nationality.DK });
        Assert.NotNull(player);
        _testOutputHelper.WriteLine($"{player.FirstName} '{player.Alias}' {player.LastName}: {player.Age}{player.Gender.First()}, {player.Nationality}. Overall: {player.Overall}");
    }
    
    [Fact]
    public void RandomPlayer_100_NewPlayers()
    {
        var players = new List<Player>();

        for (int i = 0; i < 100; i++)
        {
            players.Add(PlayerBuilder.RandomPlayer(Gender.Male,  new List<Nationality> { Nationality.DK }));
        }

        foreach (var player in players)
        {
            Assert.NotNull(player);
            _testOutputHelper.WriteLine($"{player.FirstName} '{player.Alias}' {player.LastName}: {player.Age}{player.Gender.First()}, {player.Nationality}. Overall: {player.Overall}");    
        }
    }
}