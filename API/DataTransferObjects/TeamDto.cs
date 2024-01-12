namespace API.DataTransferObjects;

public class TeamDto
{
    public string Name { get; set; }
    public List<TeamPlayerDto> Players { get; set; }
}