namespace DataLayer.Entities;

public class Series
{
    public int Id { get; set; }
    public int BestOf { get; set; }
    public int BlueSideId { get; set; }
    public int RedSideId { get; set; }
    public int? WinnerId { get; set; }
    public int? EventId { get; set; }
    public DateOnly Date { get; set; }
    public Team BlueSide { get; set; }
    public Team RedSide { get; set; }
    public Team? Winner { get; set; }
    public Event? Event { get; set; }
    public List<Player> Players { get; set; }
    public List<Game> Games { get; set; }
}