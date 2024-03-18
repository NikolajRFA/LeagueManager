using System.Security.Claims;
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
        if (!int.TryParse(userIdClaim.Value, out int userId))
        {
            return null;
        }

        return userId;
    }
    
    protected GameDto MapGame(Game game)
    {
        var dto = Mapper.Map<GameDto>(game);
        dto.Url = GetUrl(nameof(GameController.GetGame), new { game.Id });
        dto.BlueSideUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = game.BlueSideId });
        dto.RedSideUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = game.RedSideId });
        dto.WinnerUrl = GetUrl(nameof(TeamController.GetTeam), new { Id = game.WinnerId });
        dto.BlueSide = game.BlueSide.Name;
        dto.RedSide = game.RedSide.Name;
        dto.Winner = game.Winner?.Name;
        dto.Event = game.Event?.Name;
        dto.EventUrl = null; // TODO: Create event controller.
        return dto;
    }
}

public class PagingValues : ICloneable
{
    public int Page { get; set; }
    public int PageSize { get; set; }

    public object Clone()
    {
        return MemberwiseClone();
    }
}

public class IdPagingValues : PagingValues
{
    public int Id { get; set; }
}

public class OrderPagingValues : PagingValues
{
    public string Order { get; set; }
    public string Dir { get; set; }
}