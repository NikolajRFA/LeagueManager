using DataLayer.Utils;

namespace DataLayerTests;

public class UtilTests
{
    [Fact]
    public void RandomPlayer_Single_NewPlayer()
    {
        var player = PlayerBuilder.RandomPlayer();
        Assert.NotNull(player);
    }
}