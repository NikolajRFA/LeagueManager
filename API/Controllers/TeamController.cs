using API.DataTransferObjects;
using API.DataTransferObjects.Player;
using AutoMapper;
using DataLayer.DataServices;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// TODO: Add endpoint for getting active members
[Route("teams")]
[ApiController]
public class TeamController(TeamDataService dataService, LinkGenerator linkGenerator, IMapper mapper)
    : GenericControllerBase(linkGenerator, mapper)
{
    [HttpGet(Name = nameof(GetTeams))]
    public IActionResult GetTeams(int page = 0, int pageSize = 10)
    {
        var (teams, total) = dataService.GetTeams(page, pageSize);
        var dtos = new List<TeamDto>();
        foreach (var team in teams)
        {
            dtos.Add(MapTeam(team));
        }

        return Ok(Paging(dtos, total, new PagingValues { Page = page, PageSize = pageSize }, nameof(GetTeams)));
    }

    [HttpGet("{id}", Name = nameof(GetTeam))]
    public IActionResult GetTeam(int id)
    {
        var team = dataService.GetTeam(id);
        if (team == null) return NotFound();

        return Ok(MapTeam(team));
    }

    [HttpGet("{id}/games", Name = nameof(GetGamesFromTeam))]
    public IActionResult GetGamesFromTeam(int id, int page = 0, int pageSize = 10)
    {
        var (games, total) = dataService.GetGames(id, page, pageSize);

        var dtos = new List<GameDto>();
        foreach (var game in games)
        {
            dtos.Add(MapGame(game));
        }

        return Ok(Paging(dtos, total, new IdPagingValues { Id = id, PageSize = pageSize, Page = page },
            nameof(GetGamesFromTeam)));
    }

    [HttpGet("{id}/members", Name = nameof(GetMembersFromTeam))]
    public IActionResult GetMembersFromTeam(int id, int page = 0, int pageSize = 10)
    {
        var (members, total) = dataService.GetMembersFromTeam(id, page, pageSize);

        var dtos = new List<TeamMemberDto>();
        foreach (var member in members)
        {
            var teamMemberDto = Mapper.Map<TeamMemberDto>(member.Player);
            teamMemberDto.Url = GetUrl(nameof(PlayerController.GetPlayer), new { Id = member.PlayerId });
            teamMemberDto.Role = member.Role;
            teamMemberDto.FromDate = member.FromDate;
            teamMemberDto.ToDate = member.ToDate;
            dtos.Add(teamMemberDto);
        }

        return Ok(Paging(dtos, total, new IdPagingValues { Id = id, PageSize = pageSize, Page = page },
            nameof(GetMembersFromTeam)));
    }

    [HttpGet("{id}/members/current", Name = nameof(GetCurrentMembersFromTeam))]
    public IActionResult GetCurrentMembersFromTeam(int id, int page = 0, int pageSize = 10)
    {
        var (members, total) = dataService.GetCurrentMembersFromTeam(id, page, pageSize);

        var dtos = new List<TeamMemberDto>();
        foreach (var member in members)
        {
            var teamMemberDto = Mapper.Map<TeamMemberDto>(member.Player);
            teamMemberDto.Url = GetUrl(nameof(PlayerController.GetPlayer), new { Id = member.PlayerId });
            teamMemberDto.Role = member.Role;
            teamMemberDto.FromDate = member.FromDate;
            teamMemberDto.ToDate = member.ToDate;
            dtos.Add(teamMemberDto);
        }

        return Ok(Paging(dtos, total, new IdPagingValues { Id = id, PageSize = pageSize, Page = page },
            nameof(GetMembersFromTeam)));
    }

    private TeamDto MapTeam(Team team)
    {
        return new TeamDto
        {
            Name = team.Name,
            League = team.League.Name,
            GamesUrl = GetUrl(nameof(GetGamesFromTeam), new { team.Id }),
            Players = GetUrl(nameof(GetMembersFromTeam), new { team.Id })
        };
    }
}