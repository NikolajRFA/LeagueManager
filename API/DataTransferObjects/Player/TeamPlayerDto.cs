namespace API.DataTransferObjects.Player;

public class TeamPlayerDto : PlayerDto
{
    public string Role { get; set; }
    public bool IsActive { get; set; }
}