using DataLayer.DataServices;

namespace DataLayerTests;

public class GameDataserviceTests
{
    [Fact]
    public void GetGamesFromPlayer_Id1_Success()
    {
        var dataService = new GameDataService();
        Assert.NotNull(dataService.GetGamesFromPlayer(1));
    }

    [Fact]
    public void GetGamesFromPlayer_NonExistent_ReturnsNull()
    {
        var dataService = new GameDataService();
        Assert.Null(dataService.GetGamesFromPlayer(-1));
    }
}