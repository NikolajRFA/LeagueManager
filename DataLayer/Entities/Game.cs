namespace DataLayer.Entities;

public class Game
{
    public int Id { get; set; }
    public int BlueSide { get; set; }
    public int RedSide { get; set; }
    public int Winner { get; set; }
    public Team BlueSideTeam { get; set; }
    public Team RedSideTeam { get; set; }
    public Team WinnerTeam { get; set; }
}