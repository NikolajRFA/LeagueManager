using DataLayer.Entities;
using DataLayer.Utils;
using Xunit.Abstractions;

namespace DataLayerTests;

public class UtilTests(ITestOutputHelper testOutputHelper)
{
    [Fact]
    public void RandomPlayer_Single_NewPlayer()
    {
        var player = PlayerBuilder.RandomPlayer();
        Assert.NotNull(player);
    }

    [Fact]
    public void RandomPlayer_Generate10_Success()
    {
        var players = new List<Player>();
        for (var i = 0; i < 10; i++)
        {
            players.Add(PlayerBuilder.RandomPlayer());
        }
        Assert.Equal(10, players.Count);
        foreach (var player in players)
        {
            testOutputHelper.WriteLine($"{player.FirstName} '{player.Alias}' {player.LastName}: {player.Age} {player.Nationality}");
        }
    }
}