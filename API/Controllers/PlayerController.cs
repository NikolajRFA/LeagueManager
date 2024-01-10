using DataLayer.DataServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("players")]
[ApiController]
public class PlayerController(PlayerDataService dataService, LinkGenerator linkGenerator) : GenericControllerBase(linkGenerator)
{
    [HttpGet("{id}", Name = nameof(GetPlayer))]
    public IActionResult GetPlayer(int id)
    {
        var person = dataService.GetPlayer(id);
        if (person == null) return NotFound();

        return Ok(person);
    }
}