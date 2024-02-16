using API.DataTransferObjects.Team;

namespace API.DataTransferObjects.Player;

public class PlayerGameDto : TeamGameDto
{
    public string PlayerUrl { get; set; }
    public string Role { get; set; }
}