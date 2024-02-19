namespace DataLayer.Entities;

public class Event
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Game> Games { get; set; }
}