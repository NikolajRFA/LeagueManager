namespace API.DataTransferObjects.Team;

public class TeamGameDto
{
    public string GameUrl { get; set; }
    public string TeamUrl { get; set; }
    public string Team { get; set; }
    public string VersusUrl { get; set; }
    public string Versus { get; set; }
    public string? WinnerUrl { get; set; }
    public string? Winner { get; set; }
    public bool? Won { get; set; }
    public DateOnly Date { get; set; }
}