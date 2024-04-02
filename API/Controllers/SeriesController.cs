using API.DataTransferObjects;
using API.Models;
using AutoMapper;
using DataLayer.DataServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("series")]
[ApiController]
public class SeriesController(SeriesDataService dataService, LinkGenerator linkGenerator, IMapper mapper) : GenericControllerBase(linkGenerator, mapper)
{
    [HttpGet(Name = nameof(GetSeries))]
    public IActionResult GetSeries(int page = 0, int pageSize = 10)
    {
        var (seriesList, total) = dataService.GetSeries(page, pageSize);
        var dtos = new List<SeriesDto>();
        
        foreach (var series in seriesList)
        {
            dtos.Add(MapSeries(series));
        }

        return Ok(Paging(dtos, total, new PagingValues { Page = page, PageSize = pageSize }, nameof(GetSeries)));
    }

    [HttpGet("{id}", Name = nameof(GetSingleSeries))]
    public IActionResult GetSingleSeries(int id)
    {
        var series = dataService.GetSingleSeries(id);
        if (series == null) return NotFound();

        return Ok(MapSeries(series));
    }

    [HttpGet("{id}/players", Name = nameof(GetPlayersFromSeries))]
    public IActionResult GetPlayersFromSeries(int id, int page = 0, int pageSize = 10)
    {
        var (participations, total) = dataService.GetPlayersFromSeries(id, page, pageSize);

        var dtos = new List<SeriesPlayerDto>();
        foreach (var participation in participations)
        {
            dtos.Add(new SeriesPlayerDto
            {
                PlayerUrl = GetUrl(nameof(PlayerController.GetPlayer), new {Id = participation.PlayerId}),
                Team = participation.Team.Name,
                TeamUrl = GetUrl(nameof(TeamController.GetTeam), new {Id = participation.TeamId}),
                Side = participation.Series.BlueSideId == participation.TeamId ? "Blue" : "Red",
                FirstName = participation.Player.FirstName,
                LastName = participation.Player.LastName,
                Alias = participation.Player.Alias,
                Role = participation.Role
            });
        }
        
        return Ok(Paging(dtos, total, new IdPagingValues{Id = id, Page = page, PageSize = pageSize}, nameof(GetPlayersFromSeries)));
    }

    [HttpPost("play", Name = nameof(PlayGame))]
    public IActionResult PlayGame(SeriesModel seriesModel)
    {
        dataService.PlaySeries(seriesModel.BlueSideTeamId, seriesModel.RedSideTeamId, seriesModel.BestOf, seriesModel.Date);
        return Ok();
    }
}