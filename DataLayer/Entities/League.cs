namespace DataLayer.Entities;

public class League
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Region { get; set; }
    public int NumTeams { get; set; }
    public List<Team> Teams { get; set; }
}