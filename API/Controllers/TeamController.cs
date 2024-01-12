using API.DataTransferObjects;
using AutoMapper;
using DataLayer.DataServices;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("teams")]
[ApiController]
public class TeamController(TeamDataService dataService, LinkGenerator linkGenerator, IMapper mapper) : GenericControllerBase(linkGenerator, mapper)
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

    private TeamDto MapTeam(Team team)
    {
        var teamPlayerDtos = new List<TeamPlayerDto>();
        foreach (var player in team.Players)
        {
            var teamPlayerDto = Mapper.Map<TeamPlayerDto>(player);
            teamPlayerDto.Role = team.Members.First(x => x.PlayerId == player.Id).Role;
            teamPlayerDtos.Add(teamPlayerDto);
        }
        return new TeamDto
        {
            Name = team.Name,
            Players = teamPlayerDtos
        };
    }
}