namespace API.DataTransferObjects;

public class TeamPlayerDto : PlayerDto
{
    public string Role { get; set; }
    public bool IsActive { get; set; }
}