namespace API.DataTransferObjects;

public class PlayerMemberDto
{
    public string PlayerUrl { get; set; }
    public string TeamUrl { get; set; }
    public string TeamName { get; set; }
    public int Stay { get; set; }
    public string Role { get; set; }
    public DateOnly FromDate { get; set; }
    public DateOnly? ToDate { get; set; }
}