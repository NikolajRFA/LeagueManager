﻿using System.Security.Claims;
using API.DataTransferObjects;
using AutoMapper;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public abstract class GenericControllerBase : ControllerBase
{
    protected int? UserId => ExtractUserIdFromClaim();
    protected IMapper Mapper { get; }
    private readonly LinkGenerator _linkGenerator;

    public GenericControllerBase(LinkGenerator linkGenerator, IMapper mapper)
    {
        Mapper = mapper;
        _linkGenerator = linkGenerator;
    }

    protected object Paging<T>(IEnumerable<T> items, int total, PagingValues pagingValues, string endpointName)
    {
        var nextPagingValues = (PagingValues)pagingValues.Clone();
        nextPagingValues.Page += 1;
        var prevPagingValues = (PagingValues)pagingValues.Clone();
        prevPagingValues.Page -= 1;

        var numPages = (int)Math.Ceiling(total / (double)pagingValues.PageSize);
        var next = pagingValues.Page < numPages - 1
            ? GetUrl(endpointName, nextPagingValues)
            : null;
        var prev = pagingValues.Page > 0
            ? GetUrl(endpointName, prevPagingValues)
            : null;

        var cur = GetUrl(endpointName, pagingValues);

        return new
        {
            Total = total,
            NumberOfPages = numPages,
            Next = next,
            Prev = prev,
            Current = cur,
            Items = items
        };
    }

    protected string GetUrl(string name, object values)
    {
        return _linkGenerator.GetUriByName(HttpContext, name, values) ?? "Not specified";
    }

    protected int? ExtractUserIdFromClaim()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null) return null;
        if (!int.TryParse(userIdClaim.Value, out var userId)) return null;

        return userId;
    }

    // TODO: Look into creating static mapper utility class
    protected SeriesDto MapSeries(Series series)
    {
        var dto = Mapper.Map<SeriesDto>(series);
        dto.Url = GetUrl(nameof(GameController.GetGame), new { series.Id });
        dto.BlueSideUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = series.BlueSideId });
        dto.RedSideUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = series.RedSideId });
        dto.WinnerUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = series.WinnerId });
        dto.BlueSide = series.BlueSide.Name;
        dto.RedSide = series.RedSide.Name;
        dto.Winner = series.Winner?.Name;
        dto.Event = series.Event?.Name;
        dto.EventUrl =
            GetUrl(nameof(EventController.GetEvent), new { Id = series.EventId });
        dto.Games = series.Games.Select(game =>
        {
            var gameDto = Mapper.Map<GameDto>(game);
            gameDto.Url = GetUrl(nameof(GameController.GetGame), new { game.Id });
            gameDto.SeriesUrl = GetUrl(nameof(SeriesController.GetSingleSeries), new { Id = game.SeriesId });
            return gameDto;
        }).ToList();
        return dto;
    }
}

public class PagingValues(int page, int pageSize) : ICloneable
{
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;

    public object Clone()
    {
        return MemberwiseClone();
    }
}

public class IdPagingValues(int page, int pageSize, int id) : PagingValues(page, pageSize)
{
    public int Id { get; set; } = id;
}

public class OrderPagingValues(int page, int pageSize, string order, string dir) : PagingValues(page, pageSize)
{
    public string Order { get; set; } = order;
    public string Dir { get; set; } = dir;
}