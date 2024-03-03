namespace API.DataTransferObjects.Search;

public class PlayerSearchResultDto
{
    public string Url { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Alias { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public string Nationality { get; set; }
    public string? CurrentTeam { get; set; }
}