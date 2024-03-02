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
        var (results, total) = dataService.GetPlayerSearch(search, page, pageSize);

        return Ok(Paging(results, total, new SearchPagingValues { Search = search, Page = page, PageSize = pageSize },
            nameof(GetPlayerSearch)));
    }

    public class SearchPagingValues : PagingValues
    {
        public string Search { get; set; }
    }
}