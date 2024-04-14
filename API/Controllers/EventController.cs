using API.DataTransferObjects.Event;
using AutoMapper;
using DataLayer.DataServices;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("events")]
[ApiController]
public class EventController(EventDataService dataService, LinkGenerator linkGenerator, IMapper mapper)
    : GenericControllerBase(linkGenerator, mapper)
{
    [HttpGet(Name = nameof(GetEvents))]
    public IActionResult GetEvents(int page = 0, int pageSize = 10)
    {
        var (events, total) = dataService.GetEvents(page, pageSize);
        var dtos = events.Select(MapEvent).ToList();
        return Ok(Paging(dtos, total, new PagingValues(page, pageSize), nameof(GetEvents)));
    }

    [HttpGet("{id}", Name = nameof(GetEvent))]
    public IActionResult GetEvent(int id)
    {
        var @event = dataService.GetEvent(id);
        if (@event == null) return NotFound();
        return Ok(MapEvent(@event));
    }

    [HttpGet("{id}/series", Name = nameof(GetSeriesFromEvent))]
    public IActionResult GetSeriesFromEvent(int id, int page = 0, int pageSize = 10)
    {
        var (series, total) = dataService.GetSeriesFromEvent(id, page, pageSize);
        var dtos = series.Select(MapSeries).ToList();
        return Ok(Paging(dtos, total, new IdPagingValues(page, pageSize, id), nameof(GetSeriesFromEvent)));
    }

    private EventDto MapEvent(Event @event)
    {
        return new EventDto
        {
            Url = GetUrl(nameof(GetEvent), new { @event.Id }),
            Name = @event.Name,
            SeriesUrl = GetUrl(nameof(GetSeriesFromEvent), new { @event.Id })
        };
    }
}