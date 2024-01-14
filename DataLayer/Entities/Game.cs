namespace DataLayer.Entities;

public class Game
{
    public int Id { get; set; }
    public int BlueSideId { get; set; }
    public int RedSideId { get; set; }
    public int? WinnerId { get; set; }
    public Team BlueSide { get; set; }
    public Team RedSide { get; set; }
    public Team? Winner { get; set; }
    public List<Player> Players { get; set; }
}