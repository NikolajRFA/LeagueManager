﻿using System.Text.RegularExpressions;
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
        foreach (var player in players)
        {
            dtos.Add(MapPlayer(player));
        }

        return Ok(Paging(dtos, total,
            new OrderPagingValues { Order = order, Dir = dir, Page = page, PageSize = pageSize }, nameof(GetPlayers)));
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
                GameUrl = GetUrl(nameof(GameController.GetGame), new { Id = participation.GameId }),
                PlayerUrl = GetUrl(nameof(GetPlayer), new { id }),
                Role = participation.Role,
                TeamUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = participation.TeamId }),
                Team = participation.Team.Name,
                VersusUrl = GetUrl(nameof(TeamController.GetTeam),
                    new
                    {
                        Id = participation.TeamId == participation.Game.BlueSideId
                            ? participation.Game.RedSideId
                            : participation.Game.BlueSideId
                    }),
                Versus = participation.TeamId == participation.Game.BlueSideId
                    ? participation.Game.RedSide.Name
                    : participation.Game.BlueSide.Name,
                WinnerUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = participation.Game.WinnerId }),
                Winner = participation.Game.Winner?.Name,
                Won = participation.TeamId == participation.Game.WinnerId,
                Event = participation.Game.Event?.Name,
                EventUrl = null, // TODO: Create EventController.
                Date = participation.Game.Date,
            })
            .ToList();

        return Ok(Paging(dtos, total, new IdPagingValues { Id = id, PageSize = pageSize, Page = page },
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

        return Ok(Paging(dtos, total, new IdPagingValues { Id = id, PageSize = pageSize, Page = page },
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