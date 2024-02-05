using API.DataTransferObjects;
using API.DataTransferObjects.Player;
using AutoMapper;
using DataLayer.DataServices;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

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
        var (games, total) = dataService.GetGamesFromPlayer(id, page, pageSize);
        
        var dtos = new List<PlayerGameDto>();
        // TODO: Implement PlayerGameDto
        foreach (var game in games)
        {
            var dto = Mapper.Map<PlayerGameDto>(game);
            dto.Url = GetUrl(nameof(GameController.GetGame), new { game.Id });
            dto.BlueSideUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = game.BlueSideId });
            dto.RedSideUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = game.RedSideId });
            dto.WinnerUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = game.WinnerId });
            dto.BlueSide = game.BlueSide.Name;
            dto.RedSide = game.RedSide.Name;
            dto.Winner = game.Winner?.Name;
            dto.PlayerUrl = GetUrl(nameof(GetPlayer), new { id });
            dtos.Add(dto);
        }

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