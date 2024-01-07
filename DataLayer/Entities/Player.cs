namespace DataLayer.Entities;

public class Player
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Alias { get; set; }
    public int Age { get; set; }
    public int GameSense { get; set; }
    public int TeamFighting { get; set; }
    public int Dueling { get; set; }
    public int JglPathing { get; set; }
    public int WaveMgmt { get; set; }
    public int Farming { get; set; }
    public List<Team> Teams { get; set; }
}