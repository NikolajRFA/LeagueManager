using API.DataTransferObjects.Team;

namespace API.DataTransferObjects.Player;

public class PlayerSeriesDto : TeamSeriesDto
{
    public string PlayerUrl { get; set; }
    public string Role { get; set; }
}