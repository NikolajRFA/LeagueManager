using API.DataTransferObjects;
using API.DataTransferObjects.Player;
using API.DataTransferObjects.Team;
using AutoMapper;
using DataLayer.DataServices;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

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
        foreach (var team in teams) dtos.Add(MapTeam(team));

        return Ok(Paging(dtos, total, new PagingValues(page, pageSize), nameof(GetTeams)));
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
        var (seriesList, total) = dataService.GetSeries(id, page, pageSize);

        var dtos = new List<TeamSeriesDto>();
        foreach (var series in seriesList)
        {
            var isBlueSide = series.BlueSideId == id;
            dtos.Add(new TeamSeriesDto
            {
                GameUrl = GetUrl(nameof(GameController.GetGame), new { series.Id }),
                TeamUrl =
                    GetUrl(nameof(GetTeam), new { Id = isBlueSide ? series.BlueSideId : series.RedSideId }),
                Team = isBlueSide ? series.BlueSide.Name : series.RedSide.Name,
                VersusUrl = GetUrl(nameof(GetTeam),
                    new
                    {
                        Id = isBlueSide ? series.RedSideId : series.BlueSideId
                    }),
                Versus = isBlueSide ? series.RedSide.Name : series.BlueSide.Name,
                WinnerUrl = GetUrl(nameof(GetTeam), new { Id = series.WinnerId }),
                Winner = series.Winner?.Name,
                Won = id == series.WinnerId,
                Event = series.Event?.Name,
                EventUrl = null, // TODO: Create EventController.
                Date = series.Date
            });
        }

        return Ok(Paging(dtos, total, new IdPagingValues(page, pageSize, id),
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

        return Ok(Paging(dtos, total, new IdPagingValues(page, pageSize, id),
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

        return Ok(Paging(dtos, total, new IdPagingValues(page, pageSize, id),
            nameof(GetMembersFromTeam)));
    }

    private TeamDto MapTeam(Team team)
    {
        return new TeamDto
        {
            Name = team.Name,
            //League = team.League.Name,
            GamesUrl = GetUrl(nameof(GetGamesFromTeam), new { team.Id }),
            Players = GetUrl(nameof(GetMembersFromTeam), new { team.Id }),
            Flag = GetTeamFlag(team.Players)
        };
    }

    private static string GetTeamFlag(List<Player> players)
    {
        var euFlags = new List<string>
        {
            "AT",
            "BE",
            "BG",
            "HR",
            "CY",
            "CZ",
            "DK",
            "EE",
            "FI",
            "FR",
            "DE",
            "GR",
            "HU",
            "IE",
            "IT",
            "LV",
            "LT",
            "LU",
            "MT",
            "NL",
            "PL",
            "PT",
            "RO",
            "SK",
            "SI",
            "ES",
            "SE"
        };
        var euFlagCount = 0;
        var flagCounts = new Dictionary<string, int>();
        foreach (var player in players)
        {
            if (euFlags.Contains(player.Nationality)) euFlagCount++;
            if (flagCounts.TryAdd(player.Nationality, 1)) continue;
            // Increment number of flags.
            var flagCount = flagCounts[player.Nationality];
            flagCounts.Remove(player.Nationality);
            flagCounts.Add(player.Nationality, flagCount + 1);
        }

        // Check if there are multiple occurrences of any of the flags.
        foreach (var pair in flagCounts)
            if (pair.Value >= 3)
                return pair.Key;

        if (euFlagCount >= 3) return "EU";

        return "UN";
    }
}