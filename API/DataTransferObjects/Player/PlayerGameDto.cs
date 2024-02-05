namespace API.DataTransferObjects.Player;

public class PlayerGameDto : GameDto
{
    public string PlayerUrl { get; set; }
    public string PlayerTeamUrl { get; set; }
    public string Role { get; set; }
}