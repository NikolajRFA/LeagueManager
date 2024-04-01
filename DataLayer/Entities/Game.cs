namespace DataLayer.Entities;

public class Game
{
    public int Id { get; set; }
    public int SeriesId { get; set; }
    public bool BlueSideWon { get; set; }
    public Series Series { get; set; }
}