using API.Models;
using AutoMapper;
using DataLayer.DataServices;
using Microsoft.AspNetCore.Mvc;

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

    [HttpPost("play", Name = nameof(PlayGame))]
    public IActionResult PlayGame(GameModel gameModel)
    {
        dataService.PlayGame(gameModel.BlueSideTeamId, gameModel.RedSideTeamId, gameModel.Date);
        return Ok();
    }
}