using API.DataTransferObjects;
using AutoMapper;
using DataLayer.DataServices;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("players")]
[ApiController]
public class PlayerController(PlayerDataService dataService, LinkGenerator linkGenerator, IMapper mapper) : GenericControllerBase(linkGenerator, mapper)
{
    [HttpGet("{id}", Name = nameof(GetPlayer))]
    public IActionResult GetPlayer(int id)
    {
        var player = dataService.GetPlayer(id);
        if (player == null) return NotFound();

        return Ok(MapPlayer(player));
    }

    private PlayerDto MapPlayer(Player player)
    {
        var dto = Mapper.Map<PlayerDto>(player);
        return dto;
    }
}