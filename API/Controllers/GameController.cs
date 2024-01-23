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
public class GameController(GameDataService dataService, LinkGenerator linkGenerator, IMapper mapper) : GenericControllerBase(linkGenerator, mapper)
{
    [HttpGet(Name = nameof(GetGames))]
    public IActionResult GetGames(int page = 0, int pageSize = 10)
    {
        var (teams, total) = dataService.GetGames(page, pageSize);

        return Ok(Paging(teams, total, new PagingValues { Page = page, PageSize = pageSize }, nameof(GetGames)));
    }

    [HttpGet("{id}", Name = nameof(GetGame))]
    public IActionResult GetGame(int id)
    {
        var game = dataService.GetGame(id);
        if (game == null) return NotFound();

        return Ok(MapGame(game));
    }

    [HttpPost("play", Name = nameof(PlayGame))]
    public IActionResult PlayGame(GameModel gameModel)
    {
        dataService.PlayGame(gameModel.BlueSideTeamId, gameModel.RedSideTeamId, gameModel.Date);
        return Ok();
    }
}