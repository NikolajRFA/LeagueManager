namespace API.Models;

public class SeriesModel
{
    public int BlueSideTeamId { get; set; }
    public int RedSideTeamId { get; set; }
    public int BestOf { get; set; }
    public DateOnly Date { get; set; }
}