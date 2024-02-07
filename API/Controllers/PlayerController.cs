using API.DataTransferObjects;
using API.DataTransferObjects.Player;
using AutoMapper;
using DataLayer.DataServices;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.JSInterop.Infrastructure;

namespace API.Controllers;

[Route("players")]
[ApiController]
public class PlayerController(PlayerDataService dataService, LinkGenerator linkGenerator, IMapper mapper) : GenericControllerBase(linkGenerator, mapper)
{
    [HttpGet(Name = nameof(GetPlayers))]
    public IActionResult GetPlayers(int page = 0, int pageSize = 10)
    {
        var (players, total) = dataService.GetPlayers(page, pageSize);
        var dtos = new List<PlayerDto>();
        foreach (var player in players)
        {
            dtos.Add(MapPlayer(player));
        }
        
        return Ok(Paging(dtos, total, new PagingValues { Page = page, PageSize = pageSize }, nameof(GetPlayers)));
    }
    
    [HttpGet("{id}", Name = nameof(GetPlayer))]
    public IActionResult GetPlayer(int id)
    {
        var player = dataService.GetPlayer(id);
        if (player == null) return NotFound();

        return Ok(MapPlayer(player));
    }

    [HttpGet("{id}/games", Name = nameof(GetGamesFromPlayer))]
    public IActionResult GetGamesFromPlayer(int id, int page = 0, int pageSize = 10)
    {
        var (participations, total) = dataService.GetGamesFromPlayer(id, page, pageSize);
        
        var dtos = participations.Select(participation => new PlayerGameDto
            {
                Url = GetUrl(nameof(GameController.GetGame), new { Id = participation.GameId }),
                BlueSideUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = participation.Game.BlueSideId }),
                RedSideUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = participation.Game.RedSideId }),
                WinnerUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = participation.Game.WinnerId }),
                BlueSide = participation.Game.BlueSide.Name,
                RedSide = participation.Game.RedSide.Name,
                Winner = participation.Game.Winner?.Name,
                Date = participation.Game.Date,
                PlayerUrl = GetUrl(nameof(GetPlayer), new { id }),
                PlayerTeamUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = participation.TeamId }),
                Role = participation.Role
            })
            .ToList();

        return Ok(Paging(dtos, total, new IdPagingValues { Id = id, PageSize = pageSize, Page = page },
            nameof(GetGamesFromPlayer)));
    }

    private PlayerDto MapPlayer(Player player)
    {
        var dto = Mapper.Map<PlayerDto>(player);
        dto.Url = GetUrl(nameof(GetPlayer), new { player.Id });
        return dto;
    }
}