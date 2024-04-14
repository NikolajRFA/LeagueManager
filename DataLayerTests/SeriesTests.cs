using DataLayer.DataServices;
using Xunit.Abstractions;

namespace DataLayerTests;

public class SeriesTests
{
    private readonly ITestOutputHelper _testOutputHelper;

    public SeriesTests(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
    }

    [Fact]
    public void GetSeries_Id1_Success()
    {
        var dataService = new SeriesDataService();
        var series = dataService.GetSingleSeries(1);
        Assert.NotNull(series);
    }

    [Fact]
    public void GetPlayersFromGame_Id1_Success()
    {
        var dataService = new SeriesDataService();
        Assert.NotNull(dataService.GetPlayersFromSeries(1).Item1);
    }

    [Fact]
    public void GetPlayersFromGame_NonExistent_ReturnsNull()
    {
        var dataService = new SeriesDataService();
        Assert.Empty(dataService.GetPlayersFromSeries(-1).Item1);
    }
}