using AutoMapper;
using DataLayer.DataServices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("teams")]
[ApiController]
public class SearchController(SearchDataService dataService, LinkGenerator linkGenerator, IMapper mapper)
    : GenericControllerBase(linkGenerator, mapper)
{
    
}