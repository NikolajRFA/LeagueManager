using API.DataTransferObjects;
using API.Models;
using AutoMapper;
using DataLayer.DataServices;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.JSInterop.Infrastructure;

namespace API.Controllers;

[Route("games")]
[ApiController]
public class GameController(GameDataService dataService, LinkGenerator linkGenerator, IMapper mapper)
    : GenericControllerBase(linkGenerator, mapper)
{
    [HttpGet(Name = nameof(GetGames))]
    public IActionResult GetGames(int page = 0, int pageSize = 10)
    {
        var (games, total) = dataService.GetGames(page, pageSize);
        var dtos = new List<GameDto>();

        foreach (var game in games)
        {
            dtos.Add(MapGame(game));
        }

        return Ok(Paging(dtos, total, new PagingValues(page, pageSize), nameof(GetGames)));
    }

    [HttpGet("{id}", Name = nameof(GetGame))]
    public IActionResult GetGame(int id)
    {
        var game = dataService.GetGame(id);
        if (game == null) return NotFound();

        return Ok(MapGame(game));
    }

    private GameDto MapGame(Game game)
    {
        return new GameDto
        {
            Url = GetUrl(nameof(GetGame), new { game.Id }),
            SeriesUrl = GetUrl(nameof(SeriesController.GetSingleSeries), new { Id = game.SeriesId }),
            BlueSideWon = game.BlueSideWon
        };
    }
}