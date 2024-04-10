using API.DataTransferObjects.Event;
using AutoMapper;
using DataLayer.DataServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("events")]
[ApiController]
public class EventController(EventDataService dataService, LinkGenerator linkGenerator, IMapper mapper)
    : GenericControllerBase(linkGenerator, mapper)
{
    [HttpGet("{id}", Name = nameof(GetEvent))]
    public IActionResult GetEvent(int id)
    {
        var thisEvent = dataService.GetEvent(id);
        if (thisEvent == null) return NotFound();
        return Ok(new EventDto
        {
            Url = GetUrl(nameof(GetEvent), new { thisEvent.Id }),
            Name = thisEvent.Name,
            SeriesUrl = "Not implemented"
        });
    }
}