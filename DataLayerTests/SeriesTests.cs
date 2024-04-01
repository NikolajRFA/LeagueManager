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
        _testOutputHelper.WriteLine("Test");
    }
}