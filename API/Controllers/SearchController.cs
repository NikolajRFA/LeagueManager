using API.DataTransferObjects.Search;
using AutoMapper;
using DataLayer.DataServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("search")]
[ApiController]
public class SearchController(SearchDataService dataService, LinkGenerator linkGenerator, IMapper mapper)
    : GenericControllerBase(linkGenerator, mapper)
{
    [HttpGet("players", Name = nameof(GetPlayerSearch))]
    public IActionResult GetPlayerSearch(string search, int page = 0, int pageSize = 10)
    {
        var (players, total) = dataService.GetPlayerSearch(search, page, pageSize);

        var dtos = new List<PlayerSearchResultDto>();
        foreach (var player in players)
            dtos.Add(new PlayerSearchResultDto
            {
                Url = GetUrl(nameof(PlayerController.GetPlayer), new { player.Id }),
                FirstName = player.FirstName,
                LastName = player.LastName,
                Alias = player.Alias,
                Age = player.Age,
                Gender = player.Gender,
                Nationality = player.Nationality,
                CurrentTeam = player.Members.SingleOrDefault(x => x.ToDate == null)?.Team.Name
            });

        return Ok(Paging(dtos, total, new SearchPagingValues(page, pageSize, search),
            nameof(GetPlayerSearch)));
    }

    public class SearchPagingValues(int page, int pageSize, string search) : PagingValues(page, pageSize)
    {
        public string Search { get; set; } = search;
    }
}