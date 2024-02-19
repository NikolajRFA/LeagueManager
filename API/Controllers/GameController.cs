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

    [HttpGet("{id}/players", Name = nameof(GetPlayersFromGame))]
    public IActionResult GetPlayersFromGame(int id, int page = 0, int pageSize = 10)
    {
        var (participations, total) = dataService.GetPlayersFromGame(id, page, pageSize);

        var dtos = new List<GamePlayerDto>();
        foreach (var participation in participations)
        {
            dtos.Add(new GamePlayerDto
            {
                PlayerUrl = GetUrl(nameof(PlayerController.GetPlayer), new {Id = participation.PlayerId}),
                Team = participation.Team.Name,
                TeamUrl = GetUrl(nameof(TeamController.GetTeam), new {Id = participation.TeamId}),
                Side = participation.Game.BlueSideId == participation.TeamId ? "Blue" : "Red",
                FirstName = participation.Player.FirstName,
                LastName = participation.Player.LastName,
                Alias = participation.Player.Alias,
                Role = participation.Role
            });
        }
        
        return Ok(Paging(dtos, total, new IdPagingValues{Id = id, Page = page, PageSize = pageSize}, nameof(GetPlayersFromGame)));
    }

    [HttpPost("play", Name = nameof(PlayGame))]
    public IActionResult PlayGame(GameModel gameModel)
    {
        dataService.PlayGame(gameModel.BlueSideTeamId, gameModel.RedSideTeamId, gameModel.Date);
        return Ok();
    }
}