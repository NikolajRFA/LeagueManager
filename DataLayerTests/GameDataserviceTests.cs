﻿using DataLayer.DataServices;

namespace DataLayerTests;

public class GameDataserviceTests
{
    [Fact]
    public void GetGamesFromPlayer_Id1_Success()
    {
        var dataService = new PlayerDataService();
        var (games, total) = dataService.GetGamesFromPlayer(1);
        Assert.NotNull(games);
    }

    [Fact]
    public void GetGamesFromPlayer_NonExistent_ReturnsNull()
    {
        var dataService = new PlayerDataService();
        var (games, total) = dataService.GetGamesFromPlayer(-1);
        Assert.Null(games);
    }

    [Fact]
    public void GetPlayersFromGame_Id1_Success()
    {
        var dataService = new GameDataService();
        Assert.NotNull(dataService.GetPlayersFromGame(1));
    }
    
    [Fact]
    public void GetPlayersFromGame_NonExistent_ReturnsNull()
    {
        var dataService = new GameDataService();
        Assert.Null(dataService.GetPlayersFromGame(-1));
    }

    [Fact]
    public void PlayGame_Team1AndTeam2_Success()
    {
        var dataService = new GameDataService();
        dataService.PlayGame(1, 2, DateOnly.FromDateTime(DateTime.Now));
    }
}