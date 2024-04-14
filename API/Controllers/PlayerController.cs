using System.Text.RegularExpressions;
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
public class PlayerController(PlayerDataService dataService, LinkGenerator linkGenerator, IMapper mapper)
    : GenericControllerBase(linkGenerator, mapper)
{
    [HttpGet(Name = nameof(GetPlayers))]
    public IActionResult GetPlayers(string order = "", string dir = "asc", int page = 0, int pageSize = 10)
    {
        if (!Regex.IsMatch(order, "^$|^(overall|age)$") ||
            !Regex.IsMatch(dir, "asc|desc"))
            return BadRequest();

        var (players, total) = dataService.GetPlayers(order, dir, page, pageSize);
        var dtos = new List<PlayerDto>();
        foreach (var player in players) dtos.Add(MapPlayer(player));

        return Ok(Paging(dtos, total,
            new OrderPagingValues(page, pageSize, order, dir), nameof(GetPlayers)));
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
        var (participations, total) = dataService.GetSeriesFromPlayer(id, page, pageSize);

        var dtos = participations.Select(participation => new PlayerSeriesDto
            {
                GameUrl = GetUrl(nameof(GameController.GetGame), new { Id = participation.SeriesId }),
                PlayerUrl = GetUrl(nameof(GetPlayer), new { id }),
                Role = participation.Role,
                TeamUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = participation.TeamId }),
                Team = participation.Team.Name,
                VersusUrl = GetUrl(nameof(TeamController.GetTeam),
                    new
                    {
                        Id = participation.TeamId == participation.Series.BlueSideId
                            ? participation.Series.RedSideId
                            : participation.Series.BlueSideId
                    }),
                Versus = participation.TeamId == participation.Series.BlueSideId
                    ? participation.Series.RedSide.Name
                    : participation.Series.BlueSide.Name,
                WinnerUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = participation.Series.WinnerId }),
                Winner = participation.Series.Winner?.Name,
                Won = participation.TeamId == participation.Series.WinnerId,
                Event = participation.Series.Event?.Name,
                EventUrl = null, // TODO: Create EventController.
                Date = participation.Series.Date
            })
            .ToList();

        return Ok(Paging(dtos, total, new IdPagingValues(page, pageSize, id),
            nameof(GetGamesFromPlayer)));
    }

    [HttpGet("{id}/members", Name = nameof(GetMembers))]
    public IActionResult GetMembers(int id, int page = 0, int pageSize = 10)
    {
        var memberDataService = new MemberDataService();
        var (members, total) = memberDataService.GetMembersFromPlayer(id, page, pageSize);

        var dtos = new List<PlayerMemberDto>();

        foreach (var member in members)
        {
            var dto = mapper.Map<PlayerMemberDto>(member);
            dto.PlayerUrl = GetUrl(nameof(GetPlayer), new { Id = member.PlayerId });
            dto.TeamUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = member.TeamId });
            dto.TeamName = member.Team.Name;
            dtos.Add(dto);
        }

        return Ok(Paging(dtos, total, new IdPagingValues(page, pageSize, id),
            nameof(GetMembers)));
    }

    private PlayerDto MapPlayer(Player player)
    {
        var dto = Mapper.Map<PlayerDto>(player);
        dto.Url = GetUrl(nameof(GetPlayer), new { player.Id });
        dto.CurrentTeamUrl = GetUrl(nameof(TeamController.GetTeam),
            new { Id = player.Members.SingleOrDefault(x => x.ToDate == null)?.TeamId });
        dto.CurrentTeam = player.Members.SingleOrDefault(x => x.ToDate == null)?.Team.Name;
        return dto;
    }
}