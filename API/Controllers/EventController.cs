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

    private EventDto MapEvent(Event @event)
    {
        return new EventDto
        {
            Url = GetUrl(nameof(GetEvent), new { @event.Id }),
            Name = @event.Name,
            SeriesUrl = "Not implemented"
        };
    }
}