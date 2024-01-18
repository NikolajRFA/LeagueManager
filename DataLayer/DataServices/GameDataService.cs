﻿using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.DataServices;

public class GameDataService
{
    public (List<Game>, int) GetGames(int page = 0, int pageSize = 10)
    {
        var db = new Database();
        return (db.Games
            .Skip(page * pageSize)
            .Take(pageSize)
            .ToList(), db.Games.Count());
    }

    public Game? GetGame(int id)
    {
        var db = new Database();
        return db.Games.FirstOrDefault(x => x.Id == id);
    }

    public List<Game>? GetGamesFromPlayer(int playerId)
    {
        var db = new Database();
        return db.Players
            .Include(x => x.Games)
            .FirstOrDefault(x => x.Id == playerId)?.Games;
    }

    public List<Player>? GetPlayersFromGame(int gameId)
    {
        var db = new Database();
        return db.Games
            .Include(x => x.Players)
            .FirstOrDefault(x => x.Id == gameId)?.Players;
    }
}