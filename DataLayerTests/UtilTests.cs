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
}