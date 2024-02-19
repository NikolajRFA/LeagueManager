namespace DataLayer.Entities;

public class Team
{
    public int Id { get; set; }
    public string Name { get; set; }
    //public int LeagueId { get; set; }
    //public League League { get; set; }
    public List<Player> Players { get; set; }
    public List<Member> Members { get; set; }
}