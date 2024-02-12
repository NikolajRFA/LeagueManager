namespace API.DataTransferObjects.Player;

public class TeamMemberDto : PlayerDto
{
    public string Role { get; set; }
    public DateOnly FromDate { get; set; }
    public DateOnly? ToDate { get; set; }
}